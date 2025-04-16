// tu endpoint
import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// Interface
import { LoginAndRegisterData } from "../types/auth";
// Services
import {registerUser, loginUser, validateToken} from "../services/auth";
import api from '../services/api';
// Env
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

    const [loading, setLoading] = useState<boolean>(true); // Estado de carga

    // Cargar y validar el token cuando la app se monte
    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            console.log("Loaded token:", token);

            if (token) {
                try {
                    await validateToken(token); // Validar el token
                    setAuthState({ token, authenticated: true });
                    console.log(token); // Debugging: muestra el token
                    api.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Configura el token en los headers de axios

                } catch (err) {
                    await SecureStore.deleteItemAsync(TOKEN_KEY);
                    setAuthState({ token: null, authenticated: false });
                }
            } else {
                setAuthState({ token: null, authenticated: false });
            }
            setLoading(false); // Termina la carga
        };

        loadToken();
    }, []);

    // Función de registro
    const register = async (userData: LoginAndRegisterData) => {
        try {
            const result = await registerUser(userData);
            return result;
        } catch (error) {
            console.error('Registration error:', error);
            return { error: true, msg: (error as any).response.data.msg };
        }
    };

    // Función de login
    const login = async (userData: LoginAndRegisterData) => {
        try {
            const result = await loginUser(userData);
            console.log('Login result:', result);

            setAuthState({
                token: result.token,
                authenticated: true
            });

            api.defaults.headers.common['Authorization'] = `Bearer ${result.token}`;
            await SecureStore.setItemAsync(TOKEN_KEY, result.token);

            return result;
        } catch (error) {
            console.error('Login error:', error);
            return { error: true, msg: (error as any).response.data.msg };
        }
    };

    // Función de logout
    const logout = async () => {
        console.log('Logout button pressed'); // Verifica que se presiona el botón
      
        try {
          await SecureStore.deleteItemAsync(TOKEN_KEY);
          console.log('Token deleted from SecureStore');
      
          api.defaults.headers.common['Authorization'] = '';
          console.log('Authorization header cleared');
      
          setAuthState({
            token: null,
            authenticated: false
          });
          
          console.log('Auth state updated: logged out');
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
