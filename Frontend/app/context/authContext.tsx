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
                    console.log(token); // Debugging: muestra el token
                    // api.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Configura el token en los headers de la API
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

            //api.defaults.headers.common['Authorization'] = `Bearer ${result.token}`;
            await SecureStore.setItemAsync(TOKEN_KEY, result.token);
            return result;
        } catch (error) {
            console.error('Login error:', error);
            return { error: true, msg: (error as any).response.data.msg };
        }
    };

    // Función de logout
    const logout = async () => {
        console.log('Logout button pressed'); // Debugging
      
        try {
          await SecureStore.deleteItemAsync(TOKEN_KEY);
          console.log('Token deleted from SecureStore');
      
          // Interceptores de Axios, esta pendiente de las peticiones, si encuentra un token en secureStore lo añade a la cabecera de la petición
          // como aqui se borra el token, se le dice a axios que no lo use
          // ya no puede acceder a rutas protegidas
          //api.defaults.headers.common['Authorization'] = '';
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
