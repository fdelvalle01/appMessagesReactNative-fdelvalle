import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from "expo-splash-screen";

const AuthContext = createContext();

export function useAuth() {
  const data = useContext(AuthContext);
  return data;
}
// llave de autenticación para el AsyncStorage 
const AUTH_KEY = "email";

export function AuthProvider(props){
    //Cuando ingresemos a la app, el usuario no estará autenticado por lo que el valor se inicia con su valor por defecto ""
    const [auth, setAuth] = useState("");
    const [idUser, setIdUser] = useState("");
    const [loading, setLoading] = useState(true);

    /**
     * Este código se utiliza para obtener un valor de almacenamiento asincrónico 
     * en una aplicación React. Utiliza la función useEffect de React para ejecutar
     *  una función de carga cuando se monta el componente. 
     * La función de carga llama a AsyncStorage.getItem() 
     * para obtener el valor almacenado con la clave AUTH_KEY. 
     * Si se encuentra un valor, se establece en el estado del 
     * componente mediante la llamada a setAuth(). Finalmente, 
     * se establece el estado de carga en false mediante la llamada a setLoading().
     */
    useEffect(function loadFromAsyncStorage() {
        AsyncStorage.getItem(AUTH_KEY).then(async (value) => {
            if (value) {
                setIdUser(value);
                setAuth(true);
            }
            setLoading(false);
            SplashScreen.hideAsync();
        });
    }, []);

    const persistedSetAuth = (text) => {
        setAuth(text);
        setIdUser(text);
        //Esto es una promesa, por lo que se puede usar el await. aun que no es necesario el await, ya que el setAuth es una función asincrónica
        //el void es para que no se retorne nada y no se tenga que usar el await en el setAuth de arriba 
        void AsyncStorage.setItem("email", text);
    }

    const signOut = () => {
        setAuth(false);
        setIdUser("");
        AsyncStorage.removeItem(AUTH_KEY);
    }


    return (
        <AuthContext.Provider
            {...props}
            value={{auth, setAuth: persistedSetAuth, idUser,  loading, signOut}}>
        </AuthContext.Provider>
    )
}