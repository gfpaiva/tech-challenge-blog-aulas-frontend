import { IHttpPort, HttpRequestConfig, HttpError } from '@/common/ports/http.port';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

interface PendingRequest {
  controller: AbortController;
  timestamp: number;
}

const pendingRequests = new Map<string, PendingRequest>();

const buildUrl = (url: string, config?: HttpRequestConfig): string => {
  let finalUrl = url;

  // Replace path params e.g. /users/[:id] -> /users/123
  if (config?.pathParams) {
    Object.entries(config.pathParams).forEach(([key, value]) => {
      finalUrl = finalUrl.replace(`[:${key}]`, String(value));
    });
  }

  // Prepend baseURL if url is not absolute
  if (!finalUrl.startsWith('http')) {
    const base = config?.baseURL || baseURL;
    // ensure no double slashes except protocol
    finalUrl = `${base.replace(/\/$/, '')}/${finalUrl.replace(/^\//, '')}`;
  }

  // Append search params
  if (config?.params) {
    const urlObj = new URL(finalUrl);
    Object.entries(config.params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        urlObj.searchParams.append(key, String(value));
      }
    });
    finalUrl = urlObj.toString();
  }

  return finalUrl;
};

const handleDebounceAndThrottle = (requestKey: string, config?: HttpRequestConfig): AbortController => {
  const controller = new AbortController();
  const now = Date.now();
  const pending = pendingRequests.get(requestKey);

  if (config?.debounce) {
    if (pending) {
      pending.controller.abort(new Error('Debounced'));
    }
    pendingRequests.set(requestKey, { controller, timestamp: now });
  } else if (config?.throttle) {
    if (pending && now - pending.timestamp < config.throttle) {
      // Throttle: abort the new request
      controller.abort(new Error('Throttled'));
      return controller;
    }
    pendingRequests.set(requestKey, { controller, timestamp: now });
  }

  return controller;
};

const doFetch = async <T>(method: string, url: string, data?: unknown, config?: HttpRequestConfig): Promise<T> => {
  const finalUrl = buildUrl(url, config);
  const requestKey = `${method}:${finalUrl}`;

  const baseController = handleDebounceAndThrottle(requestKey, config);

  if (baseController.signal.aborted) {
    return Promise.reject(baseController.signal.reason);
  }

  // Setup Timeout
  let timeoutId: NodeJS.Timeout | undefined;
  if (config?.timeout) {
    timeoutId = setTimeout(() => {
      baseController.abort(new Error('Timeout'));
    }, config.timeout);
  }

  const parseJson = config?.parseJson ?? true;

  const headers = new Headers(config?.headers as HeadersInit);
  if (data && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const options: RequestInit = {
    ...config,
    method,
    headers,
    signal: baseController.signal,
  };

  if (data) {
    options.body = parseJson ? JSON.stringify(data) : (data as BodyInit);
  }

  try {
    const response = await fetch(finalUrl, options);

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = await response.text();
      }
      throw new HttpError(response.status, errorData, response.statusText);
    }

    if (!parseJson) {
      return response as any;
    }

    if (response.status === 204 || response.headers.get('content-length') === '0') {
      return {} as T;
    }

    const responseData = await response.json();
    return responseData as T;
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
    if (config?.debounce || config?.throttle) {
      const current = pendingRequests.get(requestKey);
      if (current?.controller === baseController) {
        pendingRequests.delete(requestKey);
      }
    }
  }
};

export const httpAdapter: IHttpPort = {
  get: <T>(url: string, config?: HttpRequestConfig) => doFetch<T>('GET', url, undefined, config),
  post: <T, K = unknown>(url: string, data?: K, config?: HttpRequestConfig) => doFetch<T>('POST', url, data, config),
  put: <T, K = unknown>(url: string, data?: K, config?: HttpRequestConfig) => doFetch<T>('PUT', url, data, config),
  delete: <T>(url: string, config?: HttpRequestConfig) => doFetch<T>('DELETE', url, undefined, config),
};
