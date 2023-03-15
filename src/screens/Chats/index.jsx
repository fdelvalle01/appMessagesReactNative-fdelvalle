import React, {useState, useEffect} from 'react'
import { StatusBar } from 'expo-status-bar';
import { Appbar, List, Avatar   } from 'react-native-paper';
import { ScrollBody } from '../../components/Body/Body'
import { View } from 'react-native';
import  styled  from '@emotion/native';
import { useAuth } from "../../hooks/useAuth";
import { addDoc, collection, getDocs, query, where, onSnapshot} from "firebase/firestore";
import { firestore } from "../../services/firebase";
import { useContacts } from "../../hooks/useContacts";
  

//Esto es para que el componente se pueda exportar y se pueda usar en otros archivos de la app 
const StyledListItem = styled(List.Item)`
    border-bottom-width: 1px;
    border-bottom-color: ${(props) => props.color ?? "#ccc"};
`;

// const chats = Array.from({length: 10}).map((e,i) => ({
//     id: i+1, name: 'Francisco Del Valle', message: 'Es el ultimo mensaje',
// }));


const Chats = (props) => {

    //Obtenermos variable AuthContext para poder usar el metodo de signOut
    const { auth } = useAuth();

    //Creamos un estado para guardar los chats
    const [chats, setChats] = useState([]);
    // obtenemos los contactos con el hook useContacts
    const contacts = useContacts();
    
    //creamos un useEffect para que se ejecute una sola vez y se ejecute la funcion getChats
    /**
     * El código utiliza la función useEffect de React para realizar una operación cada vez que cambia el valor de la variable auth.
     * La operación consiste en obtener los chats que contengan el número de teléfono del usuario logueado en la aplicación o
     * en la base de datos de Firebase. Luego, obtiene los datos de la base de datos de Firebase y los guarda en el estado chats. 
     * Cuando auth cambia, se vuelve a realizar esta operación
     */
    useEffect(() => {
        const unsubscribe = onSnapshot(
            //Obtenemos los chats que contengan el numero de telefono del usuario logueado en la app o en la BD de firebase 
            query(
                collection(firestore, "chats"),
                where("phones","array-contains", auth)
        ), 
        //Obtenemos los datos de la BD de firebase y los guardamos en el estado chats
        (querySnapshot) => {
            const firestoreChats = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            const otherPhone = data.phones.find((e) => e !== auth);
            const contact = contacts.find(
                //e.phoneNumbers?.[0] es para que si el usuario no tiene numero de telefono no de error
                (e) => e.phoneNumbers?.[0].number == otherPhone
            );
            // retornamos un objeto con los datos que necesitamos para mostrar en la lista
            return {
                id: doc.id,
                name: contact ? `${contact.firstName} ${contact.lastName || ""}` : otherPhone,      
                message: data.lastMessage,
                };
            });
            setChats(firestoreChats);
        }
        );
        /**
         *  Es una función de retorno dentro de la función useEffect. Esta función se ejecuta cuando React limpia o desmonta el efecto. En este caso, 
         *  se utiliza para cancelar la suscripción a la consulta a la base de datos de Firebase. Esto se hace para evitar tener múltiples suscripciones
         *  activas, lo que podría causar problemas de rendimiento y errores.
         */
        return () => unsubscribe();
    }, [auth]);

  return (
    <>
    <ScrollBody>
        {
            chats.map((chat) => (
                <StyledListItem
                key={chat.id}
                title={chat.name}
                description={chat.message}
                // Los estilos se pueden pasar como objeto o como string (como en el caso de color) al componente ListItem  
                // color={chat.id === 1 ? "red" : undefined}
                left={(props) => (
                <View style={{flex:0, alignItems: "center", justifyContent:"center"}}>
                    {/* denteo del label lo que hacemos es tomar el nombre del item recorrido y
                    obtener las 2 primeras letras del nombre del usuario */}
                    <Avatar.Text size={40} label={chat.name.split(" ").slice(0,2).map((e) => e[0]).join("")}/>
                </View>
                )}
                onPress={() => props.navigation.push("Chat", { id: chat.id, name: chat.name })}
              />
            ))
        }
    </ScrollBody>
    </>
  )
}

export default Chats