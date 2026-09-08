import { test, expect, request } from '@playwright/test';

const BASE_URL = 'https://qa-sample-marty-sharma.up.railway.app';

test.describe('POST /api/devices/command', () => {

  let token: string;

  test.beforeAll(async () => {
    const context = await request.newContext();
    const response = await context.post(`${BASE_URL}/api/auth/signin`, {
      data: {
        email: 'qa.tester@example.com',
        password: 'Password123'
      }
    });
    const body = await response.json();
    token = body.token;
  });

  // ONLINE DEVICE
  test('Valid request with online device returns success', async () => {
    const context = await request.newContext();

    // Get numeric id for our online device
    const devicesResponse = await context.get(`${BASE_URL}/api/devices`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const devicesBody = await devicesResponse.json();
    const device = devicesBody.items.find((d: any) => d.device_id === '79101X02X002023000B3J2000');

    // Send command
    const response = await context.post(`${BASE_URL}/api/devices/command`, {
      headers: { 'Authorization': `Bearer ${token}` },
      data: {
        devices: ['79101X02X002023000B3J2000'],
        command_name: 'update_core_services',
        params: { command_version: '6.4.10' }
      }
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.updated).toContain('79101X02X002023000B3J2000');

    // Verify device shows updated core_services_status
    const deviceResponse = await context.get(`${BASE_URL}/api/devices/${device.id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const deviceBody = await deviceResponse.json();
    expect(deviceBody.core_services_status).toBe('up-to-date');
  });

  // OFFLINE DEVICE
  test('Invalid request with offline device returns failure', async () => {
    const context = await request.newContext();
    const response = await context.post(`${BASE_URL}/api/devices/command`, {
      headers: { 'Authorization': `Bearer ${token}` },
      data: {
        devices: ['79101X02J002940000D6J2001'],
        command_name: 'update_core_services',
        params: { command_version: '6.4.10' }
      }
    });
    // Returns 500 — should ideally be 4xx (see bug report)
    expect(response.status()).toBe(500);
    const body = await response.json();
    expect(body.error).toBeTruthy();
    expect(body.message).toContain('offline');
  });

  // INVALID COMMAND
  test('Invalid command name is rejected with validation error', async () => {
    const context = await request.newContext();
    const response = await context.post(`${BASE_URL}/api/devices/command`, {
      headers: { 'Authorization': `Bearer ${token}` },
      data: {
        devices: ['79101X02X002023000B3J2000'],
        command_name: 'update_orientation',
        params: { command_version: '6.4.10' }
      }
    });
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error).toContain('Unsupported command_name');
  });

  // MISSING AUTHORIZATION HEADER
  test('Request with missing Authorization header is rejected', async () => {
    const context = await request.newContext();
    const response = await context.post(`${BASE_URL}/api/devices/command`, {
      data: {
        devices: ['79101X02X002023000B3J2000'],
        command_name: 'update_core_services',
        params: { command_version: '6.4.10' }
      }
    });
    expect(response.status()).toBe(401);
    const body = await response.json();
    expect(body.error).toContain('Unauthorized');
  });

  // INVALID AUTHORIZATION TOKEN
  test('Request with invalid Authorization token is rejected', async () => {
    const context = await request.newContext();
    const response = await context.post(`${BASE_URL}/api/devices/command`, {
      headers: { 'Authorization': 'Bearer invalidtoken123' },
      data: {
        devices: ['79101X02X002023000B3J2000'],
        command_name: 'update_core_services',
        params: { command_version: '6.4.10' }
      }
    });
    expect(response.status()).toBe(401);
    const body = await response.json();
    expect(body.error).toContain('Unauthorized');
  });

});