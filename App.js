import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Provider as PaperProvider } from "react-native-paper";
import  PhoneNumbers  from "./src/screens/PhoneNumber/PhoneNumber";
import  Navigator  from "./src/Navigator";
import { AuthProvider, useAuth } from "./src/hooks/useAuth";


function AuthApp() {
  const { auth, setAuth } = useAuth();
  console.log(auth);
  return (
    <>
      {!auth && <PhoneNumbers />}
      {auth && <Navigator />}
    </>
  );
}

export default function App() {
  return (
     // Provider es un componente que permite que todos los componentes hijos tengan acceso a los estilos de Paper
     <AuthProvider>
      <PaperProvider>
        <AuthApp />
        <StatusBar style="auto" />
      </PaperProvider>
    </AuthProvider>

  );
}