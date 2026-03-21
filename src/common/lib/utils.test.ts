import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn utility', () => {
  it('should merge tailwind classes properly', () => {
    expect(cn('bg-red-500', 'text-white')).toBe('bg-red-500 text-white');
  });

  it('should handle conditional classes using twMerge properly', () => {
    // twMerge will resolve conflicts, keeping the last one
    expect(cn('px-2 py-1', 'p-4')).toBe('p-4');
  });

  it('should handle objects properly (clsx functionality)', () => {
    expect(cn('btn', { 'btn-primary': true, 'btn-disabled': false })).toBe('btn btn-primary');
  });

  it('should handle arrays properly', () => {
    expect(cn(['flex', 'items-center'], 'justify-center')).toBe('flex items-center justify-center');
  });

  it('should ignore falsy values', () => {
    expect(cn('w-full', null, undefined, false, '', 'text-sm')).toBe('w-full text-sm');
  });
});
