import React from 'react'
import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native";
import { Button } from "react-native-paper";
import  {Body}  from "../../components/Body/Body";


const Contacts = () => {
  const navigation = useNavigation();
  return (
    <Body>

      <Button
        onPress={() =>
          navigation.navigate("ChatTab", {
            screen: "Chat",
            params: { id: 100 },
          })
        }
      >
        Navegar
      </Button>
    </Body>

  )
}

export default Contacts