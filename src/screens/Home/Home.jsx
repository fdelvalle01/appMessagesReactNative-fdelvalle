import React from 'react'
import { Card, Button, Provider, Portal, Dialog, Title, Text, Divider, TextInput, Snackbar, Paragraph   } from 'react-native-paper';
import styled  from '@emotion/native';
import { View, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { useAuth } from "../../hooks/useAuth";
import { addDoc, collection, doc, onSnapshot, orderBy, query, where, getDocs} from "firebase/firestore";
import { firestore, storage } from "../../services/firebase";
import { ref, getDownloadURL, getStorage } from "firebase/storage";
const StyledCard = styled(Card)`
  margin: 10px;
`;

const Home = () => {
  const { auth, idUser } = useAuth();
  //Variables para las publicaciones 
  const [messages, setMessages] = useState([]);
  const [images, setImages] = useState([]);
  const [contents, setContents] = useState([]);

  //Variables para los comentarios  
  const [comments, setComments] = useState([]);
  const [idImg, setIdImg] = useState("");

  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const onToggleSnackBar = () => setVisibleSnackbar(!visibleSnackbar);
  const onDismissSnackBar = () => setVisibleSnackbar(false);

  const [visible, setVisible] = useState(false);

  const showDialog = (idPost) =>{
    setVisible(true);
    setIdImg(idPost);
  } 
  const hideDialog = () => setVisible(false);
  const [comment, setComment] = useState("");

  const [lastScrollPosition, setLastScrollPosition] = useState(0);

  const handleScroll = (event) => {

    const currentPosition = event.nativeEvent.contentOffset.y;
    if (currentPosition < -200) {
          setLastScrollPosition(currentPosition);
    }
  };

  //metodo que escucha los mensajes de la base de datos y los guarda en el estado messages
  useEffect(() => {
    const listenToComments = async ()=> {
      const commentsRef = collection(firestore,"comments");
      const commentsQuery = query(commentsRef,where("post","==",idImg));
      const unsubscribe = onSnapshot(commentsQuery, (snapshot) => {
        const firestoreComments = snapshot.docs.map((doc) => ({
          comment: doc.comment,
          ...doc.data(),
        }));
        setComments(firestoreComments);

      });
      return () => unsubscribe();
    }
    listenToComments();
  }, [idImg]);

  //metodo que ingresa los comentarios 
  async function uploadComment() {
    await addDoc(collection(firestore, "comments"), {
      comment: comment,
      date_comment: new Date(),
      email: idUser,
      post: idImg
      
    });
    hideDialog();
    onToggleSnackBar();
    setComment("");
  }

  //metodo que escucha los mensajes de la base de datos y los guarda en el estado messages
  useEffect(() => {
    async function listenToPost() {
      const messagesRef = collection(firestore,"post",idUser,"idUser");
      setMessages([]);
      //Obtener los mensajes de la base de datos de los usuarios que sigo
      const docRef = collection(firestore, "followers", idUser, "siguiendo");
      const q = query(docRef, where("follow", "==", "S"));
      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs;
      const users = docs.map((doc) => doc.data());
  
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


      //Obtener los mensajes de la base de datos de los usuarios que sigo siempre y cuando tenga usuarios que sigo
      if(users.length === 0){
        return;
      }

      docs.map((doc) => {
        const messagesRe = collection(firestore,"post",doc.data().email,"idUser");
        const messagesQuery = query(
          messagesRe,
          orderBy("createdAt", "desc")
        );
        onSnapshot(messagesQuery, (snapshot) => {
          const firestoreMessages = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMessages((prevMessages) => [...prevMessages, ...firestoreMessages]);   
        });
      }
      );
      
  
      // const messagesReFollow = collection(firestore,"post",users[0].email,"idUser");

      // const messagesQueryFollow = query(
      //   messagesReFollow,
      //   orderBy("createdAt", "desc")
      // );
      // onSnapshot(messagesQueryFollow, (snapshot) => {
      //   const firestoreMessages = snapshot.docs.map((doc) => ({
      //     id: doc.id,
      //     ...doc.data(),
      //   }));
      //   setMessages((prevMessages) => [...prevMessages, ...firestoreMessages]);   
      // });
  
      return () => unsubscribe();
    }
    listenToPost();
  }, [idUser, lastScrollPosition]);
  

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
      <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
        {images.map((image, index) => (
          <StyledCard key={index}>
            <Card.Content>
              { /* <Title>{idUser}</Title> */}  
            </Card.Content>
            <Card.Cover source={{ uri: image }} />
            <Card.Actions>
              <Button icon="heart" />
              <Button icon="comment" onPress={()=>showDialog(messages[index].id)}/>
              <Button icon="share" />
            </Card.Actions>
          </StyledCard>
        ))}

      <Provider>
      <View>
        <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Dialog.Title>Comentar publicación 💬</Dialog.Title>
            <Button icon="close" onPress={hideDialog}></Button>
          </View>
          <Dialog.Content>
            <Divider />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                mode="outlined"
                multiline={true}
                label=""
                value={comment}
                onChangeText={comment => setComment(comment)}
                style={{ flex: 1, borderRadius: 10 }}
              />
              <Button icon="comment" onPress={uploadComment}></Button>
            </View>
          </Dialog.Content>
            {comments.map((comm, index) => (
                <Card>
                <Card.Content>
                  <Paragraph>{ `${comm.email}:  ${comm.comment}` }</Paragraph> 
                </Card.Content>
                <Card.Actions>
                  <Button icon="heart" />
                  <Button icon="share" />
                </Card.Actions>
              </Card>
            ))}
          </Dialog>
        </Portal>
      </View>
    </Provider>
    
      </ScrollView>
      <Snackbar
        visible={visibleSnackbar}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Aceptar',
          onPress: () => {
            // Do something
          },
        }}>
        Comentario realizado...
      </Snackbar>
    </View>
  );

}

export default Home