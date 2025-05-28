import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';

import { loginUser } from "../services/auth";
import { register } from "../services/users";


import { LoginData } from "../types/login";
import { RegisterData } from "../types/register";

import { AuthProps } from "../types/auth";
import { TOKEN_KEY } from "../services/env";


const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
    const [authState, setAuthState] = useState<{
        token: string | null,
        authenticated: boolean | null
    }>({
        token: null,
        authenticated: null,
    });

    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            // Debugging line
            //console.log("Loaded token:", token);
            if (token) {
                try {

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


    // Registro de usuario
    const registerUser = async (userData: RegisterData) => {
        try {
            const result = await register(userData);

            if (result.error) {
                return result;
            }

            setAuthState({
                token: result.token,
                authenticated: true
            });

            await SecureStore.setItemAsync(TOKEN_KEY, result.token);
            return result;
        } catch (error) {
            console.error('Register error:', error);
            return { error: true, msg: (error as any).response.data.msg };
        }
    }


    // Login de usuario
    const login = async (userData: LoginData) => {
        try {
            const result = await loginUser(userData);

            if (result.error) {
                return result;
            }

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
            return { error: true, msg: (error as any).response.data.msg };
        }
    };



    const value = {
        onFullRegister: registerUser,
        onLogin: login,
        onLogout: logout,
        authState,
    };

    return (
        <AuthContext.Provider value={value}>
            {/* Renderiza hijos solo cuando no está cargando */}
            {!loading ? children : null}
        </AuthContext.Provider>
    );
};
