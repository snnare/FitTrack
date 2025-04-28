// tu endpoint
import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';

import { LoginData } from "../types/auth";
import { RegisterData } from "../types/register";
import { loginUser, validateToken, postRegister} from "../services/auth";
import { TOKEN_KEY } from "../services/env";

interface AuthProps {
    authState?: { token: string | null, authenticated: boolean | null };
    onFullRegister?: (userData: RegisterData) => Promise<any>;
    onRegister?: (userData: LoginData) => Promise<any>;
    onLogin?: (userData: LoginData) => Promise<any>;
    onLogout?: () => Promise<any>;
}

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
    const [authState, setAuthState] = useState<{ token: string | null, authenticated: boolean | null }>({
        token: null,
        authenticated: null,
    });

    const [loading, setLoading] = useState<boolean>(true); 

    
    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            console.log("Loaded token:", token);

            if (token) {
                try {
                    await validateToken(token); 
                    setAuthState({ token, authenticated: true });
                } catch (err) {
                    await SecureStore.deleteItemAsync(TOKEN_KEY);
                    setAuthState({ token: null, authenticated: false });
                }
            } else {
                setAuthState({ token: null, authenticated: false });
            }
            setLoading(false); 
        };

        loadToken();
    }, []);




    // Funcion completa de registro
    const registerUser = async (userData: RegisterData) => {
        try{
            const result = await postRegister(userData);

            setAuthState({
                token: result.token,
                authenticated: true
            });
            await SecureStore.setItemAsync(TOKEN_KEY, result.token);
            return result;

        }catch (error) {
            console.error('Register error:', error);
            return { error: true, msg: (error as any).response.data.msg };
        }
    }


    // Función de login
    const login = async (userData: LoginData) => {
        try {
            const result = await loginUser(userData);
            
            setAuthState({
                token: result.token,
                authenticated: true
            });

            await SecureStore.setItemAsync(TOKEN_KEY, result.token);
            return result;
        } catch (error) {
            console.error('Login error:', error);
            return { error: true, msg: (error as any).response.data.msg };
        }
    };

    // Función de logout
    const logout = async () => {
        try {
          await SecureStore.deleteItemAsync(TOKEN_KEY);;
            
          setAuthState({
            token: null,
            authenticated: false
          });
          
        } catch (error) {
          console.error('Logout error:', error);
        }
      };
      


    const value = {
        onFullRegister: registerUser,
        onLogin: login,
        onLogout: logout,
        authState
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
