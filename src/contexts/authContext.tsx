import { createContext, useContext, useState, ReactNode, FC } from 'react';
import { Collaborator } from '@/interfaces/Collaborator';

interface AuthContextType {
    user: Collaborator | null;
    login: (userData: Collaborator, token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<Collaborator | null>(null);

    const login = (userData: Collaborator, token: string) => {
        sessionStorage.setItem("accessToken", token);
        setUser(userData);
    };

    const logout = () => {
        sessionStorage.removeItem("accessToken");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
