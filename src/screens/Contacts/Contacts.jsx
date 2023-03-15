import React, {useState} from 'react'
import { useNavigation } from "@react-navigation/native";
import { Text, View, FlatList } from "react-native";
import { Button, TextInput, List, Avatar, Searchbar  } from "react-native-paper";
import  {Body}  from "../../components/Body/Body";
import { ScrollBody } from '../../components/Body/Body'
import styled from '@emotion/native';
import { useContacts } from "../../hooks/useContacts";
import { useAuth } from "../../hooks/useAuth";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { firestore } from "../../services/firebase";


const contacts = Array.from({length: 10}).map((e,i) => ({
    id: i+1, name: 'Francisco Del Valle', message: '+569 45470920',
}));

const StyledSearchBar = styled(Searchbar)`
  border-radius: 5px;
  margin: 10px;
  padding: 10px;
  height: 50px;
  background-color: #fff;
`;

const StyledView = styled.View`
  width: 100%;
  flex: 1;
  background-color: #fff;
`;

const StyledListItem = styled(List.Item)`
    border-bottom-width: 1px;
    border-bottom-color: ${(props) => props.color ?? "#ccc"};
    padding: 10px;
    margin: 0;
    background-color: #fff;
    
`;
const Contacts = () => {

  //hook de estado para el texto de búsqueda
  const [text, setText] = useState("");
  const [searchQuery, setSearchQuery] = useState('');

  //hook de navegación
  const navigation = useNavigation();
  //hook de contactos
  const contacts = useContacts();
  //hook de autenticación
  const { auth } = useAuth();

  const onChangeSearch = query => setSearchQuery(query);

/**
 * La función createChat es una función asyncrona en React que se ejecuta cuando se llama. Realiza las siguientes operaciones:
 * Crea un nuevo chat en la base de datos de Firebase, agregando una lista de números de teléfono que incluyen el número de teléfono del usuario logueado
 * y un número aleatorio generado por la función Math.random().
 * Navega a una vista de la aplicación llamada "ChatTab" con un parámetro de identificación igual a 100.
 * Esta función se utiliza para crear un nuevo chat en la aplicación y luego mostrarlo al usuario
 */
  const createChat = async (id) => {

    const response = await addDoc(collection(firestore, "chats"), {
      phones: [auth, String(Math.trunc(Math.random() * 1000))],
    });
    
    //Cuando se crea un nuevo chat, se navega a la vista de chat con el id del chat recién creado como parámetro de navegación 
    navigation.navigate("ChatTab", {
      screen: "Chat",
      params: { id: response.id},
    });
  };


  const navigateToChat = async (phoneNumber, name) => {

    // Se obtienen todos los chats de la base de datos de Firebase
    const documents = await getDocs(
      query(
        collection(firestore, "chats"),
        where("phones", "array-contains", auth)
      )
    );
    // Se busca un chat previo que incluya el número de teléfono del usuario logueado y el número de teléfono del contacto seleccionado
    const previousChat = documents.docs
      .map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      })
      .find((doc) => doc.phones.includes(phoneNumber));
    // Si no existe un chat previo, se crea uno nuevo con los números de teléfono del usuario logueado y el número de teléfono del contacto seleccionado
    if (!previousChat) {
      const newChat = await addDoc(collection(firestore, "chats"), {
        phones: [phoneNumber, auth],
      });
      navigation.navigate("ChatTab", {
        screen: "Chat",
        params: { id: newChat.id, name },
      });
      return;
    }
    navigation.navigate("ChatTab", {
      screen: "Chat",
      params: { id: previousChat.id, name },
    });
  };

  return (
    <StyledView>
      <View>
        <StyledSearchBar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
        </View>
        <FlatList
          data={contacts}
          renderItem={({ item }) => (
            <StyledListItem
              key={item.id}
              title={item.lastName ? `${item.firstName} ${item.lastName}` : item.firstName}
              description={item.message}
              // Los estilos se pueden pasar como objeto o como string (como en el caso de color) al componente ListItem
              // color={chat.id === 1 ? "red" : undefined}
              right={props => <List.Icon {...props} icon="dots-vertical"  />}
              // Averiguar como se puede poner un event listener en el icono de la derecha para que al hacer click se muestre un menu con opciones (como en whatsapp)
              left={props => <Avatar.Icon size={50} style={{justifyContent:'center', }} {...props} icon="account" />}
              onPress={(e) =>
                navigateToChat(
                  item.phoneNumbers[0].number,
                  item.lastName ? `${item.firstName} ${item.lastName}` : item.firstName
                )
              }

            />
          )}
          keyExtractor={item => item.id}
        />
    </StyledView>
  )
}

export default Contacts