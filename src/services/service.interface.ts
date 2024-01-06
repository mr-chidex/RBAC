export interface JWTTOKEN {
  userId: string;
  name: string;
  email: string;
  role: string;
  iss: string;
  iat: number;
}
