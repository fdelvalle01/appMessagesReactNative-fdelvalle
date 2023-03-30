import React, {useState} from 'react'
import { View, ScrollView, Text } from 'react-native';

import { Image } from 'react-native';
import { Banner } from 'react-native-paper';

import { useAuth } from "../../hooks/useAuth";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';


const Profile = () => {

  const [visible, setVisible] = useState(true);
  const { auth, idUser } = useAuth();
  
  return (
    <View>
      <View style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
        <Avatar.Image size={100} source={require('../../../assets/avatar.jpg')} />
        <View style={{flexDirection: 'column', alignItems: 'center', flex:1}}>
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>{idUser}</Text>
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>Descripcion Descripcion Descripcion Descripcion </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
        <Text style={{fontSize: 15, fontWeight: 'bold'}}>Publicaciones: 0</Text>
        <Text style={{fontSize: 15, fontWeight: 'bold', marginLeft: 10}}>Seguidores: 0</Text>
        <Text style={{fontSize: 15, fontWeight: 'bold', marginLeft: 10}}>Siguiendo: 0</Text>
      </View>
      {/* Los botones deben ir uno al lado del otro */}
      <View style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
        <Button style={{flex:1}} mode="outlined" onPress={() => console.log('Pressed')}> 
          {!!idUser ? 'Editar Perfil' : 'Seguir'}
        </Button>
        <Button style={{flex:1}}  mode="outlined" onPress={() => console.log('Pressed')}>
         {!!idUser ? 'Compartir' : 'Seguir'}
        </Button>
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
        <Text style={{fontSize: 15, fontWeight: 'bold'}}>Publicaciones</Text>
      </View>
      {/* Aqui se deben mostrar las publicaciones */}

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', borderWidth: 1, borderColor: 'black' }}>
        <Card style={{ width: '33.33%' }}>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} style={{height: 150}}/>
        </Card>
        <Card style={{ width: '33.33%' }}>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} style={{height: 150}}/>
        </Card>
        <Card style={{ width: '33.33%' }}>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} style={{height: 150}}/>
        </Card>

        <Card style={{ width: '33.33%' }}>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} style={{height: 150}}/>
        </Card>
        <Card style={{ width: '33.33%' }}>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} style={{height: 150}}/>
        </Card>
        <Card style={{ width: '33.33%' }}>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} style={{height: 150}}/>
        </Card>
      </View>

    </View>
  )
}

export default Profile