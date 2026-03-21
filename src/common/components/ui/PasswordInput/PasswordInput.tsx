import { Eye, EyeOff } from 'lucide-react';
import { forwardRef, useState } from 'react';

import { Input, type InputProps } from '../Input/Input';

export type PasswordInputProps = Omit<InputProps, 'type'>;

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <div className="relative w-full">
      <Input {...props} ref={ref} type={showPassword ? 'text' : 'password'} className={className} />
      <button
        type="button"
        onClick={togglePassword}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content/80 focus:outline-none"
        aria-label={showPassword ? 'Esconder senha' : 'Mostrar senha'}
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
});

PasswordInput.displayName = 'PasswordInput';
