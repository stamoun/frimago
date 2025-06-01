import axios, { HttpStatusCode } from 'axios';
import { GOOGLE_TOKEN_INFO, GOOGLE_USER_INFO } from '../constants';
import type { AppUserInfo } from '../utils/appUserInfo';

export async function getUserInfo(): Promise<AppUserInfo> {
  const response = await axios.get<AppUserInfo>(GOOGLE_USER_INFO);
  if (response.status == HttpStatusCode.Ok) {
    return response.data;
  }
  throw 'Failed to get user info.';
}

export async function getScopes(): Promise<string[]> {
  const response = await axios.get(GOOGLE_TOKEN_INFO);
  if (response.status !== HttpStatusCode.Ok) {
    throw 'Cannot retrieve token info.';
  }
  return response.data['scope'].split(' ').sort();
}
