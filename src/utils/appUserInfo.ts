import { jwtDecode } from 'jwt-decode';
import type { AppUserInfo } from '../store/appUserInfoStore';

export function toAppUserInfo(token: string): AppUserInfo {
  const decoded = jwtDecode(token);
  return {
    name: decoded.name,
    avatarUrl: decoded.picture,
  };
}
