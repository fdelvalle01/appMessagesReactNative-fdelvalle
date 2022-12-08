import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { Appbar, List, Avatar   } from 'react-native-paper';
import { ScrollBody } from '../../components/Body/Body'
import { View } from 'react-native';
import  styled  from '@emotion/native';

//Esto es para que el componente se pueda exportar y se pueda usar en otros archivos de la app 
const StyledListItem = styled(List.Item)`
    border-bottom-width: 1px;
    border-bottom-color: ${(props) => props.color ?? "#ccc"};
`;

const chats = Array.from({length: 5}).map((e,i) => ({
    id: i+1, name: 'Francisco Del Valle', message: 'Es el ultimo mensaje',
}));


// export function Chats() ()
const Chats = (props) => {
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