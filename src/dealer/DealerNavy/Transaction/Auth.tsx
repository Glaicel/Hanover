import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create a context for the authentication
interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<any>(null);

// Create an AuthProvider component to wrap your app and provide the authentication context
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if the user is already authenticated on page load
    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await axios.get('http://carfinity.test/api/user', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUser(response.data.user);
                }
            } catch (error) {
                console.error('Authentication check failed', error);
            } finally {
                setLoading(false);
            }
        };

        checkAuthentication();
    }, []);

    // Function to log in a user
    const login = async (email: any, password: any, role: any) => {
        try {
            setLoading(true);
            const response = await axios.post('http://carfinity.test/api/login', {
                email,
                password,
                role,
            });

            const token = response.data.token;
            localStorage.setItem('token', token);

            const userResponse = await axios.get('http://carfinity.test/api/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUser(userResponse.data.user);
        } catch (error) {
            console.error('Login failed', error);
        } finally {
            setLoading(false);
        }
    };

    // Function to log out a user
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    // Provide the authentication context to the app
    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Create a custom hook to access the authentication context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
