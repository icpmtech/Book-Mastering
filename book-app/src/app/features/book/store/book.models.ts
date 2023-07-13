export enum TokenStatus {
  PENDING = 'PENDING',
  VALIDATING = 'VALIDATING',
  VALID = 'VALID',
  INVALID = 'INVALID',
}

export interface bookState {
  isLoggedIn: boolean;
  user?: bookUser;
  accessTokenStatus: TokenStatus;
  refreshTokenStatus: TokenStatus;
  isLoadingBook: boolean;
  hasBookError: boolean;
}

export interface bookUser {
  id: number;
  firstName: string;
  lastName: string;
}
