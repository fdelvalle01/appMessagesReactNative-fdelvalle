import React from 'react'
import { Card, Button, Title, Paragraph  } from 'react-native-paper';
import styled  from '@emotion/native';
import { View, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { useAuth } from "../../hooks/useAuth";
import { addDoc, collection, doc, onSnapshot, orderBy, query, setDoc } from "firebase/firestore";
import { firestore, storage } from "../../services/firebase";
import { ref, getDownloadURL, getStorage } from "firebase/storage";
const StyledCard = styled(Card)`
  margin: 10px;
`;

const Home = () => {
  const { auth, idUser } = useAuth();

  const [messages, setMessages] = useState([]);
  const [images, setImages] = useState([]);
  const [contents, setContents] = useState([]);
  //metodo que escucha los mensajes de la base de datos y los guarda en el estado messages

  useEffect(() => {
    async function listenToPost() {
      const messagesRef = collection(firestore,"post",idUser,"idUser"
      );
      const messagesQuery = query(
        messagesRef,
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
    listenToPost();
  }, [idUser]);

  useEffect(() => {
    async function loadImagesFromStorage() {
      const imageRefs = contents.map((content) =>
        ref(getStorage(), content)
      );
      const urls = await Promise.all(
        imageRefs.map(async (imageRef) => {
          const url = await getDownloadURL(imageRef);
          return url;
        })
      );
      setImages(urls);
    }
    loadImagesFromStorage();
  }, [contents]);

  useEffect(() => {
    const messageContents = messages.map((message) => message.content);
    setContents(messageContents);
  }, [messages]);

  return (
    <View>
      <ScrollView>
        {images.map((image, index) => (
          <StyledCard key={index}>
            <Card.Content>
              {/* <Title>{contents[index]}</Title> */}
            </Card.Content>
            <Card.Cover source={{ uri: image }} />
            <Card.Actions>
              <Button icon="heart" />
              <Button icon="comment" />
              <Button icon="share" />
            </Card.Actions>
          </StyledCard>
        ))}
      </ScrollView>
    </View>
  );

}

export default Home