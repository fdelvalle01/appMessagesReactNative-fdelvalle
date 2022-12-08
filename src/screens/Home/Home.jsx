import React from 'react'
import { Card, Button, Title, Paragraph  } from 'react-native-paper';
import styled  from '@emotion/native';
import { View, ScrollView } from 'react-native';

const StyledCard = styled(Card)`
  margin: 10px;
`;



const Home = () => {
  return (
    // Debemos incorporar una imagen de fondo
    <View>
         <ScrollView>
          <StyledCard>
            <Card.Content>
              <Title>Francisco Del Valle</Title>
            </Card.Content>
            <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
              <Card.Actions>
                <Button icon="heart"></Button>
                <Button icon="comment"></Button>
                <Button icon="share"></Button>
              </Card.Actions>
          </StyledCard>
          <StyledCard>
            <Card.Content>
              <Title>Francisco Del Valle</Title>
            </Card.Content>
            <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
              <Card.Actions>
                <Button icon="heart"></Button>
                <Button icon="comment"></Button>
                <Button icon="share"></Button>
              </Card.Actions>
          </StyledCard>
          <StyledCard>
            <Card.Content>
              <Title>Francisco Del Valle</Title>
            </Card.Content>
            <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
              <Card.Actions>
                <Button icon="heart"></Button>
                <Button icon="comment"></Button>
                <Button icon="share"></Button>
              </Card.Actions>
          </StyledCard>
         </ScrollView>
    </View>
  )
}

export default Home