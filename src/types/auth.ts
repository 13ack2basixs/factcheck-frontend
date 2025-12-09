export type AuthContextType = {
  user: UserResponse | null;
  token: string | null; 
  isLoading: boolean;
  login: (data: AuthResponse) => void;
  logout: () => void;
};

export type UserResponse = {
  id: number;
  email: string;
  createdAt: string;
};

export type AuthResponse = {
  accessToken: string;
  tokenType: string;  // Bearer
  user: UserResponse;
};
