import { Metadata } from 'next';

import { appRoutes } from '@/common/config/routes';
import { LoginForm } from '@/features/auth';

export const metadata: Metadata = {
  title: appRoutes.login.title,
  description: appRoutes.login.description,
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body items-center p-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
