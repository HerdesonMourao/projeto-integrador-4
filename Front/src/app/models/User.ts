import { RoleTypes } from "./constants/RoleTypes";

export interface User {
  id: number;
  name: string;
  username: string;
  password: string;
  email: string;
  whatsapp: string;
  avatar_logo: string;
  role: RoleTypes;
  is_activated: boolean;
  created_at: Date;
}
