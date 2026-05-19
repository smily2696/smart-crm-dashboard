export interface User {

  _id: string;

  name: string;

  email: string;

  role?: string;
}


export interface AuthContextType {

  user: User | null;

  token: string | null;

  loading: boolean;

  login: (
    email: string,
    password: string
  ) => Promise<void>;

  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<void>;

  logout: () => void;
}