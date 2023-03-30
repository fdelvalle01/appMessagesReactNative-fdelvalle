import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack"
import { Appbar, Text } from "react-native-paper";
import  Chat from "./screens/Chat/Chat";
import  Chats from "./screens/Chats";
import  Contacts from "./screens/Contacts/Contacts";
import  Home from "./screens/Home/Home";
// import Share from "./screens/Share/Share";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styled from "@emotion/native";
import { Badge } from 'react-native-paper';
import { View, Image, Alert } from "react-native";
import { List, Colors } from 'react-native-paper';
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { useAuth } from "./hooks/useAuth";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firestore, storage } from "./services/firebase";
import { addDoc, collection, doc, onSnapshot, orderBy, query, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import Profile from "./screens/Profile/Profile";
import SearchUser from "./screens/SearchUser/SearchUser";

const ChatStackNavigator = createStackNavigator();
const TabNavigator = createBottomTabNavigator();

const AppbarHeader = styled(Appbar.Header)`
  background-color: white;
`;

export const Header = (props) => {
  
  return (
    <AppbarHeader>
       {/* {props.navigation.canGoBack() && props.back?.title && (
        <> */}
          <Appbar.BackAction
            color="black"
            onPress={() => props.navigation.goBack()}
          ></Appbar.BackAction>
        {/* </>
      )}*/}
      <Appbar.Content title={props.route?.params?.name || props.route.name}  /> 
        <Appbar.Action icon="magnify" onPress={() => console.log("hola")} />
        <Appbar.Action icon="dots-vertical" onPress={() => console.log("hola")} />
      </AppbarHeader>
    );
  };

  export const HeaderContact = (props) => {
      return (
        <AppbarHeader>
        <Appbar.Content title="Contactos" />
          <Appbar.Action icon="dots-vertical" onPress={() => console.log("hola")} />
        </AppbarHeader>
      );
    };

  export const HeaderPost = (props) => {
    return (
      <AppbarHeader>
        <Appbar.Content title="Publicar" />
        <Appbar.Action icon="dots-vertical" onPress={() => console.log("hola")} />
      </AppbarHeader>
    );
  };
  export const HeaderProfile = (props) => {

    const { signOut, idUser } = useAuth();
  
    return (
      <AppbarHeader>
        {idUser && <Appbar.Content title={idUser} />}
        <Appbar.Action icon="exit-to-app" onPress={signOut} />
      </AppbarHeader>
    );
  };
  export const HeaderSearch = (props) => {
    const { signOut, idUser } = useAuth();
    return (
      <AppbarHeader>
          {idUser && <Appbar.Content title={idUser} />}
          <Appbar.Action icon="exit-to-app" onPress={signOut} />
      </AppbarHeader>
    );
  };
  
    export const HeaderHome = (props) => {
      return (
        <AppbarHeader>
          <Appbar.Content title="InstaGroup" />
            <View>
            <Badge
                size={16}
                style={{ position: 'absolute', top: 5, right: 5 }}
              >
                5
            </Badge>
              <Appbar.Action icon="send" onPress={() => props.navigation.navigate("ChatTab", {screen:'Chats'})}></Appbar.Action>
            </View>
        </AppbarHeader>
        );
      };

    export default function Navigator() {
    //Metodo que abrira la camara para tomar una foto. 
    const [selectedImage, setSelectedImage] = useState(null);
    const { auth, idUser } = useAuth();

    async function uploadImage(uri, auth) {

      const extension = uri.split(".").slice(-1)[0];
      const path = "post/" + idUser + "/" + new Date().toISOString() + "." + extension;
      const imageRef = ref(storage, path);
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
          Alert.alert("Imagen subida con exito");
        };
        xhr.onerror = function (e) {

          reject(new TypeError("Network request failed"));
          Alert.alert("Error al subir la imagen");
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });
      await uploadBytes(imageRef, blob);

      addDoc(collection(firestore, "post", idUser, "idUser"), {
        content: path,
        createdAt: new Date(),
        phone: auth,
        type: "image",
      });
    }


const pickImage = async () => {
  try {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Necesitamos los permisos");
      return;
    }

    const media = await ImagePicker.launchImageLibraryAsync();
    if (media.canceled) {
      return;
    }

    setSelectedImage(media.assets[0]);
    await uploadImage(media.assets[0].uri, auth);
  } catch (error) {
    console.log("Error en pickImage:", error);
    Alert.alert("Ha ocurrido un error al seleccionar la imagen");
  }
};

const takePhoto = async () => {
  const permission = await ImagePicker.requestCameraPermissionsAsync();
  if (!permission.granted) {
    Alert.alert("Necesitamos los permisos");
    return;
  }

  const media = await ImagePicker.launchCameraAsync();
  if (media.canceled) {
    return;
  }
  setSelectedImage(media.assets[0]);
  await uploadImage(media.assets[0].uri, auth);
};

  return (
    <NavigationContainer>
      <TabNavigator.Navigator screenOptions={{ headerShown: false }}>
      <TabNavigator.Screen
          name="Home"
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="home"
                color={color}
                size={size}
              />
            ),
          }}
        >
          {/* lo importante de las tabNavigator Screen es que deben tener un componente de navegacion. que redireccion al componente como tal */}
          {(props) => (
            <ChatStackNavigator.Navigator
              screenOptions={{
                headerStyle: { backgroundColor: "white" },
                // Este puede ser otro header personalizado para esta pantalla en particular 
                //el header debe ser parametrico debe cambiar segun la pantalla en la que se encuentre 
                header: HeaderHome,
              }}
            >
                <ChatStackNavigator.Screen name="Home" component={Home} />
            </ChatStackNavigator.Navigator>
          )}
        </TabNavigator.Screen>
        <TabNavigator.Screen
          name="Search"
          options={{
            tabBarLabel: "Search",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="magnify"
                color={color}
                size={size}
              />
            ),
          }}
        >
          {/* lo importante de las tabNavigator Screen es que deben tener un componente de navegacion. que redireccion al componente como tal */}
          {(props) => (
            <ChatStackNavigator.Navigator
              screenOptions={{
                headerStyle: { backgroundColor: "white" },
                // Este puede ser otro header personalizado para esta pantalla en particular 
                //el header debe ser parametrico debe cambiar segun la pantalla en la que se encuentre 
                header: HeaderSearch,
              }}
            >
                <ChatStackNavigator.Screen name="SearchUser" component={SearchUser} />
            </ChatStackNavigator.Navigator>
          )}
        </TabNavigator.Screen>

        <TabNavigator.Screen
          name="loadPost"
          options={{
            tabBarLabel: "Post",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="camera"
                color={color}
                size={size}
              />
            ),
          }}
        >
          {(props) => (
            <View>
              <List.Section style={{marginTop:50, height:100 }}>
                <List.Accordion title="Publicar"
                  left={props => <List.Icon {...props} icon="camera" /> }
                  >
                  <List.Item 
                    title="Toma una foto"
                    left={props => <List.Icon {...props} icon="camera" />} 
                    onPress={() => {
                      takePhoto();
                    }}/>
                  <List.Item 
                  title="Selecciona una existente" 
                  left={props => <List.Icon {...props} icon="attachment" />}
                  onPress={() => {
                      pickImage();
                  }}/>
                </List.Accordion>
              </List.Section>
              <ChatStackNavigator.Navigator
                screenOptions={{
                  headerStyle: { backgroundColor: "white" },
                  header: HeaderPost,
                }}
              >
                <ChatStackNavigator.Screen name="Home" component={Home} />
              </ChatStackNavigator.Navigator>
            </View>
          )}
        </TabNavigator.Screen>

        <TabNavigator.Screen
          name="ChatTab"
          options={{
            tabBarLabel: "Chats",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="message"
                color={color}
                size={size}
              />
            ),
          }}
        >
          {(props) => (
            <ChatStackNavigator.Navigator
              screenOptions={{
                headerStyle: { backgroundColor: "white" },
                header: Header,
              }}
            >
              <ChatStackNavigator.Screen name="Chats" component={Chats} />
              <ChatStackNavigator.Screen name="Chat" component={Chat} />
            </ChatStackNavigator.Navigator>
          )}
        </TabNavigator.Screen>
        <TabNavigator.Screen
          name="ContactsTab"
          options={{
            tabBarLabel: "Contactos",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="contacts"
                color={color}
                size={size}
              />
            ),
          }}
        >
          {(props) => (
            <ChatStackNavigator.Navigator
              screenOptions={{
                headerStyle: { backgroundColor: "white" },
                // Este puede ser otro header personalizado para esta pantalla en particular 
                header: HeaderContact,
              }}
            >
                <ChatStackNavigator.Screen name="Contacts" component={Contacts} />
            </ChatStackNavigator.Navigator>
          )}
        </TabNavigator.Screen>
        {/* Tab que a futuro debe ir a perfil y muro del usuario. por ahora se dejara como exit   */}
        <TabNavigator.Screen
          name="AccountTab"
          options={{
            tabBarLabel: "Perfil",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account-circle-outline"
                color={color}
                size={size}
              />
            ),
            onPress: () => {
              // aquí puedes llamar al método que deseas ejecutar
              // por ejemplo, cerrar sesión
              signOut();
             
            },
          }}
        > 
          {(props) => (

            <ChatStackNavigator.Navigator
            
              screenOptions={{
                headerStyle: { backgroundColor: "white" },
                // Este puede ser otro header personalizado para esta pantalla en particular 
                header: HeaderProfile,
              }}
            >
              <ChatStackNavigator.Screen name="Profile" component={Profile} />
            </ChatStackNavigator.Navigator>
          )}
        </TabNavigator.Screen>
      </TabNavigator.Navigator>
    </NavigationContainer>
  );
}