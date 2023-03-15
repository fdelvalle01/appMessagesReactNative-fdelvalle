import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack"
import { Appbar, Text } from "react-native-paper";
import  Chat from "./screens/Chat/Chat";
import  Chats from "./screens/Chats";
import  Contacts from "./screens/Contacts/Contacts";
import  Home from "./screens/Home/Home";
import Share from "./screens/Share/Share";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styled from "@emotion/native";
import { Badge } from 'react-native-paper';
import { View, Image } from "react-native";

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
  
    export const HeaderHome = (props) => {
      return (
        <AppbarHeader>
          <Appbar.Content title="InstaGroup" />
            <Appbar.Action icon="magnify" onPress={() => console.log("hola")} />
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

        {/* Tab De ingreso de publicaciones.  */}
        <TabNavigator.Screen
          name="loadPost"
          options={{
            tabBarLabel: "Post",
            tabBarIcon: () => (
              <Image
                source={require('../assets/create.png')} // Cambiar la ruta por la de tu imagen
              />
            ),
          }}
        >
          {(props) => (
            <ChatStackNavigator.Navigator
              screenOptions={{
                headerStyle: { backgroundColor: "white" },
                header: HeaderPost,
              }}
            >
              <ChatStackNavigator.Screen name="Home" component={Share} />
            </ChatStackNavigator.Navigator>
          )}
        </TabNavigator.Screen>


        <TabNavigator.Screen
          name="ChatTab"
          options={{
            tabBarLabel: "Chats",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="message"
                color='black'
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
                color='black'
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
      </TabNavigator.Navigator>
    </NavigationContainer>
  );
}