// tu endpoint
import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';


import api from '../services/api';
import { LoginAndRegisterData } from "../types/auth";
import {registerUser, loginUser, validateToken} from "../services/auth";
import { TOKEN_KEY } from "../services/env";

interface AuthProps {
    authState?: { token: string | null, authenticated: boolean | null };
    onRegister?: (userData: LoginAndRegisterData) => Promise<any>;
    onLogin?: (userData: LoginAndRegisterData) => Promise<any>;
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

    // Función de registro
    const register = async (userData: LoginAndRegisterData) => {
        try {
            const result = await registerUser(userData);
                     
            setAuthState({
                token: result.token,
                authenticated: true
            });
            await SecureStore.setItemAsync(TOKEN_KEY, result.token);
            return result;
        } catch (error) {
            return { error: true, msg: (error as any).response.data.msg };
        }
    };

    // Función de login
    const login = async (userData: LoginAndRegisterData) => {
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
        onRegister: register,
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
