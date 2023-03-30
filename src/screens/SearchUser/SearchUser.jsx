import React, {useState} from 'react';
import { Button, Searchbar } from 'react-native-paper';
import { View } from 'react-native';
import { List } from 'react-native-paper';
import { Avatar } from 'react-native-paper';
import { IconButton } from 'react-native-paper';


const SearchUser = (props) => {
    const [searchQuery, setSearchQuery] = useState(''); // estado para el buscador
    const onChangeSearch = query => setSearchQuery(query);  // funcion para el buscador

    // Falta agregar la lista de usuarios encontrados en el buscador y el boton para seguir a los usuarios encontrados 
    

    return (
        <View>
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
            />
            {/* debajo del buscador debe aparecer una lista con los usuarios encontrados  */}
            <List.Item
                title="Francisco Javier"
                description="Item description"
                left={props =>  <Avatar.Image size={70} source={require('../../../assets/avatar.jpg')} />}
                right={props => <Button title="Seguir" onPress={() => console.log('Pressed')}>Seguir</Button>}
            />
            <List.Item
                title="Francisco Javier"
                description="Item description"
                left={props =>  <Avatar.Image size={70} source={require('../../../assets/avatar.jpg')} />}
                right={props => <Button title="Seguir" onPress={() => console.log('Pressed')}>Seguir</Button>}
            />
        </View>
        )
    }

export default SearchUser