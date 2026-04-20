import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthenticationService from '../services/AuthenticationService';
import type { loginType } from '../types/Types';

type UserType = {
    username: string;
    token: string;
}

type AuthContextType = {
    user: UserType | null;
    login: (credentials: loginType) => Promise<{ success: boolean; message?: string }>;
    logout: () => Promise<void>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            verifyToken(token);
        } else {
            setLoading(false);
        }
    }, []);

    const verifyToken = (token: string) => {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const isExpired = payload.exp * 1000 < Date.now();

            if (isExpired) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
            } else {
                setUser({ username: payload.sub, token });
            }
        } catch (error) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        } finally {
            setLoading(false);
        }
    };

    const login = async (currentUser: loginType) => {
        try {
            const data = await AuthenticationService.login(currentUser);
            localStorage.setItem('accessToken', data.payload.accessToken);
            localStorage.setItem('refreshToken', data.payload.refreshToken);

            const payload = JSON.parse(atob(data.payload.accessToken.split('.')[1]));
            setUser({ username: payload.sub, token: data.payload.accessToken });

            return { success: true };
        } catch (error: any) {
            console.log("hata:", error.response?.data);
            console.log("status:", error.response?.status);
            console.log("gönderilen data:", currentUser);
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            };
        }
    };

    const logout = async () => {
        const refreshToken = localStorage.getItem('refreshToken');
        try {
            if (refreshToken) {
                await AuthenticationService.logout({ refreshToken });
            }
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            setUser(null);
        }
    };

    const value = {
        user,
        login,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};