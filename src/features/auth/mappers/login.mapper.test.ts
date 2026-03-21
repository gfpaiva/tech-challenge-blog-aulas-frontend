import { describe, expect, it } from 'vitest';

import { LoginMapper } from './login.mapper';

describe('LoginMapper', () => {
  it('maps valid login response to view model format', () => {
    // Arrange
    const mockApiResponse = {
      user: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Guilherme',
        email: 'gui@test.com',
        role: 'PROFESSOR',
      },
      access_token: 'fake-jwt-token-123',
    };

    // Act
    const result = LoginMapper.toViewModel(mockApiResponse);

    // Assert
    expect(result).toEqual({
      user: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Guilherme',
        email: 'gui@test.com',
        role: 'PROFESSOR',
      },
      token: 'fake-jwt-token-123',
    });
  });

  it('throws error if response is missing token', () => {
    // Arrange
    const invalidResponse = {
      user: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Guilherme',
        email: 'gui@test.com',
        role: 'PROFESSOR',
      },
      // missing access_token
    };

    // Act & Assert
    expect(() => LoginMapper.toViewModel(invalidResponse)).toThrow();
  });
});
