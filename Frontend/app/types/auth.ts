import { LoginData } from "../types/login";
import { RegisterData } from "../types/register";


export interface AuthProps {
    authState?: { token: string | null, authenticated: boolean | null };
    onFullRegister?: (userData: RegisterData) => Promise<any>;
    onLogin?: (userData: LoginData) => Promise<any>;
    onLogout?: () => Promise<any>;
}
