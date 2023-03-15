
import { Appbar, Text } from "react-native-paper";

export const Header = (props) => {
  
  return (
    <Appbar.Header>
       {/* {props.navigation.canGoBack() && props.back?.title && (
        <> */}
          <Appbar.BackAction
            color="white"
            onPress={() => props.navigation.goBack()}
          ></Appbar.BackAction>
        {/* </>
      )}*/}
      <Appbar.Content title="Chats" /> 
        <Appbar.Action icon="magnify" onPress={() => console.log("hola")} />
        <Appbar.Action icon="dots-vertical" onPress={() => console.log("hola")} />
      </Appbar.Header>
    );
  };

  export const HeaderContact = (props) => {
      return (
        <Appbar.Header>
        <Appbar.Content title="Contactos" />
          <Appbar.Action icon="magnify" onPress={() => console.log("hola")} />
          <Appbar.Action icon="dots-vertical" onPress={() => console.log("hola")} />
        </Appbar.Header>
      );
    };
    
        
    export const HeaderHome = (props) => {
      return (
        <Appbar.Header>
          <Appbar.Content title="Home" />
            <Appbar.Action icon="magnify" onPress={() => console.log("hola")} />
            <Appbar.Action icon="send" onPress={() => props.navigation.navigate("Chats")} />
        </Appbar.Header>
        );
      };


      export const HeaderPost = (props) => {
        return (
          <Appbar.Header>
            <Appbar.Content title="Post" />
              <Appbar.Action icon="magnify" onPress={() => console.log("hola")} />
              <Appbar.Action icon="send" onPress={() => props.navigation.navigate("Chats")} />
          </Appbar.Header>
          );
        };