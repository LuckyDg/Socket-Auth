import {jwtDecode } from 'jwt-decode';

export function decodeJWT(token: string): any {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error('Error decoding token', error);
    return null;
  }
}