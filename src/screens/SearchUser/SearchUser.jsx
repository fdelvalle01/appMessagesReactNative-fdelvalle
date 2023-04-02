import React, {useState, useEffect} from 'react';
import { Button, Searchbar } from 'react-native-paper';
import { View, Alert } from 'react-native';
import { List } from 'react-native-paper';
import { Avatar } from 'react-native-paper';
import { IconButton } from 'react-native-paper';
import { addDoc, collection, doc, onSnapshot, orderBy, query, setDoc, where, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { firestore, storage } from "../../services/firebase";
import { ref, getDownloadURL, getStorage } from "firebase/storage";
import { useAuth } from "../../hooks/useAuth";



const SearchUser = (props) => {
    const [searchQuery, setSearchQuery] = useState(''); // estado para el buscador
    // const onChangeSearch = query => setSearchQuery(query);  // funcion para el buscador
    const [messages, setMessages] = useState([]);
    const [followers, setFollowers] = useState([]);

    // Falta agregar la lista de usuarios encontrados en el buscador y el boton para seguir a los usuarios encontrados 

    const { signOut, idUser } = useAuth();

    async function listenToPost() {
      const messagesRef = collection(firestore, "user");
      const userId = searchQuery.trim(); // Se utiliza el valor ingresado en el campo de búsqueda
      const messagesQuery = query(
        messagesRef,
        where("nombre", "==", userId),
        orderBy("createdAt", "desc")
      );
        const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
        const firestoreMessages = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setMessages(firestoreMessages);
      });
      return () => unsubscribe();
    }

    function handleSubmit() {
        listenToPost();
    }
    useEffect(() => {
 
        if(messages[0] != undefined){
          
            const messagesRef = collection(firestore, "followers", idUser, "siguiendo");
            const messagesQuery = query(
            messagesRef,
            where("email", "==", messages[0].email),
            );
        
          const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
          const firestoreMessages = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
          }));
          setFollowers(firestoreMessages);
        });
        return () => unsubscribe();
    }
    }, [messages]);


  // metodo de seguir a un usuario 
  // metodo que ingresa los comentarios 
    async function followUser(email) {
        const docRef =  collection(firestore, "followers", idUser, "siguiendo");
        const q = query(docRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);
        if(followers.length > 0){
            querySnapshot.forEach((docc) => {
                if(docc.data().follow === "S"){
                const docRefUpdate = doc(collection(firestore, "followers", idUser, "siguiendo"), docc.id);
                    updateDoc(docRefUpdate, {
                    follow: "N"
                });
                }else{
                    const docRefUpdate = doc(collection(firestore, "followers", idUser, "siguiendo"), docc.id);
                    updateDoc(docRefUpdate, {
                    follow: "S"
                });
                }
            });
        }else{
            addDoc(collection(firestore, "followers", idUser, "siguiendo"), {
                email: email,
                date_comment: new Date(),
                follow: "S",
            });
        }
    }
    
    //Obtener seguidores del usuario 
    return (
        <View>
            <Searchbar
                placeholder="Search"
                onChangeText={setSearchQuery}
                value={searchQuery}
                onSubmitEditing={handleSubmit}
                // Agrega el botón de búsqueda aquí
                platform="ios"
                cancelButtonTitle="Cancel"
                onCancel={() => {
                    setSearchQuery("");
                    setMessages([]);
                }}
                searchIcon={{ size: 24 }}
                clearIcon={{ size: 24 }}
                cancelButtonProps={{ color: "#333333" }}
            />
            {/* debajo del buscador debe aparecer una lista con los usuarios encontrados  */}

            {messages.map((message, key) => (
                <List.Item
                    key={key}
                    title={message.nombre}
                    description={message.email}
                    left={props =>  <Avatar.Image size={70} source={require('../../../assets/avatar.jpg')} />}
                    right={props => <Button title="Seguir" onPress={() => followUser(message.email)}>
                        {followers.length > 0 && followers[0].follow === "S" ? "Dejar de seguir" : "Seguir"}
                    </Button>}
                    />
                ))
            }
        </View>
        )
    }

export default SearchUser