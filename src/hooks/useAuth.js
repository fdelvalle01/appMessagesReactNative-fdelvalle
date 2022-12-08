import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export function useAuth() {
  const data = useContext(AuthContext);
  return data;
}

export function AuthProvider(props){
    const [auth, setAuth] = useState(false);
    return (
        <AuthContext.Provider
            {...props}
            value={{auth, setAuth}}>
        </AuthContext.Provider>
    )
}