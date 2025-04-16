// tu endpoint
import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// Interface
import { LoginAndRegisterData } from "../types/auth";
// Services
import {registerUser, loginUser} from "../services/auth";


interface AuthProps {
    authState?: { token: string | null, authenticated: boolean | null };
    onRegister?: (userData: LoginAndRegisterData) => Promise<any>;
    onLogin?: (userData: LoginAndRegisterData) => Promise<any>;
    onLogout?: () => Promise<any>;
}

const TOKEN_KEY = '12';
export const API_URL = 'https://api.developbetterapps.com';
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
                    // Intentar validar el token en la API
                    await axios.get(`${API_URL}/auth/validate`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });

                    // Si el token es válido, lo setea como autenticado
                    setAuthState({
                        token,
                        authenticated: true,
                    });
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                } catch (err) {
                    // Si la validación falla, eliminamos el token
                    await SecureStore.deleteItemAsync(TOKEN_KEY);
                    setAuthState({ token: null, authenticated: false });
                }
            } else {
                // Si no hay token, considera como no autenticado
                setAuthState({ token: null, authenticated: false });
            }
            setLoading(false); // Termina la carga
        };

        loadToken();
    }, []);

    // Función de registro
    const register = async (email: string, password: string) => {
        try {
            return await axios.post(`${API_URL}/users`, { email, password });
        } catch (error) {
            console.error('Registration error:', error);
            return { error: true, msg: (error as any).response.data.msg };
        }
    };

    // Función de login
    const login = async (email: string, password: string) => {
        try {
            const result = await axios.post(`${API_URL}/auth`, { email, password });
            console.log('Login result:', result);

            setAuthState({
                token: result.data.token,
                authenticated: true
            });

            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;
            await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);

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
      
          axios.defaults.headers.common['Authorization'] = '';
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
