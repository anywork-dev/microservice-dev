import { describe, it, expect, beforeEach, vi } from 'vitest';
import AuthService from 'auth-service';
import crypton from 'cryptonite';
import UserResource from 'auth-model';
import EmailClient from 'email-client';

vi.mock('cryptonite');
vi.mock('auth-model');
vi.mock('email-client');

describe('Authentication Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should login successfully', async () => {
    const mockUser = { id: '1', username: 'fathnakbar', password: 'hashedPassword' };
    UserResource.find.mockResolvedValueOnce([mockUser]);
    crypton.compare.mockResolvedValueOnce(true);
    crypton.token.mockReturnValueOnce('mockToken');

    const result = await AuthService.login({ username: 'fathnakbar', password: 'fathnakbar2003' });
    console.log(result)
    expect(result.ok).toBe(true);
    expect(result.data.token).toBe('mockToken');
  });

  it('should fail login with incorrect password', async () => {
    const mockUser = { id: '1', username: 'fathnakbar', password: 'hashedPassword' };
    UserResource.find.mockResolvedValueOnce([mockUser]);
    crypton.compare.mockResolvedValueOnce(false);

    const result = await AuthService.login({ username: 'fathnakbar', password: 'wrongpassword' });
    expect(result.ok).toBe(false);
    expect(result.status).toBe(401);
    expect(result.error.reason).toBe('Invalid credentials');
  });

  it('should register a new user successfully', async () => {
    const mockUser = { id: '1', email: 'user@example.com', password: 'hashedPassword' };
    UserResource.upsert.mockResolvedValueOnce(mockUser);
    crypton.hashPassword.mockResolvedValueOnce('hashedPassword');

    const req = {
      body: { email: 'user@example.com', password: 'plainPassword' },
    };

    const result = await AuthService.basicRegistration(req);
    expect(result.ok).toBe(true);
    expect(result.data.user).toEqual(mockUser);
  });

  it('should send recovery email successfully', async () => {
    const mockUser = { id: '1', email: 'user@example.com' };
    UserResource.find.mockResolvedValueOnce(mockUser);
    crypton.token.mockReturnValueOnce('mockToken');
    EmailClient.sendRecovery.mockResolvedValueOnce(true);

    const req = {
      body: { email: 'user@example.com' },
    };

    const result = await AuthService.basicRecovery(req);
    expect(result.ok).toBe(true);
    expect(result.data.message).toBe('Recovery email sent');
  });

  it('should return 404 for recovery when user is not found', async () => {
    UserResource.find.mockResolvedValueOnce(null);

    const req = {
      body: { email: 'nonexistent@example.com' },
    };

    const result = await AuthService.basicRecovery(req);
    expect(result.ok).toBe(false);
    expect(result.status).toBe(404);
    expect(result.error).toBe('User not found');
  });
});
