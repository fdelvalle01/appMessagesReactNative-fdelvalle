import React, {useEffect, useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import { Appbar, TextInput, Drawer, ActivityIndicator } from 'react-native-paper';
import { ScrollBody } from '../../components/Body/Body'
import { KeyboardAvoidingView, Text, View, Alert, Image } from 'react-native';
import  styled  from '@emotion/native';
import { useRoute } from "@react-navigation/native";
import { useHeaderHeight } from '@react-navigation/elements';
import { Controller, useForm } from "react-hook-form";
import { addDoc, collection, doc, onSnapshot, orderBy, query, setDoc } from "firebase/firestore";
import { useAuth } from "../../hooks/useAuth";
import { firestore, storage } from "../../services/firebase";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ChatItem, ChatImageItem } from "./components/UtilsChat";

const StyledTextInput = styled(TextInput)`
  flex: 1;
  height: 40px;
  margin: 0 10px;
`;

const StyledAppbar = styled(Appbar)`
  background-color: white;
  position: 'absolute';
  left: 0;
  right: 0;
  bottom: 0;
`;

const StyledView = styled(View)`
  background-color: white;
  height:10px;
`;

const FlatList = styled.FlatList({
  transform: [{ scaleY: -1 }],
  backgroundColor: "#fff",
});

  const renderChatItem = (row) => {
    const { index, item } = row;
    if (item.type === "image"){
      return <ChatImageItem {...item} />;
    }else{
      return <ChatItem {...item} />;
    }
  };
  
  async function uploadImage(uri, chatId, auth) {
    const extension = uri.split(".").slice(-1)[0];
    const path = "chats/" + chatId + "/" + new Date().toISOString() + "." + extension;
    const imageRef = ref(storage, path);
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {

        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    await uploadBytes(imageRef, blob);
  
    addDoc(collection(firestore, "chats", chatId, "messages"), {
      content: path,
      createdAt: new Date(),
      phone: auth,
      type: "image",
    });
  }
  
const Chat = (props) => {

  const route = useRoute();
  const chatId = route.params.id; // Antes se tenia como route.params y no como route.params.id, por eso no funcionaba el chat ya que venia como objeto y no como string

  const [selectedImage, setSelectedImage] = useState(null);
  const [messages, setMessages] = useState([]);
  const height = useHeaderHeight();
  const { auth } = useAuth();

  const { control, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      message: "",
    },
  });
  useEffect(
    function listenToChats() {
      const unsuscribe = onSnapshot(
        query(
          collection(firestore, "chats", chatId, "messages"),
          orderBy("createdAt", "desc")
        ),
        (snapshot) => {
          const firestoreMessages = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setMessages(firestoreMessages);
        }
      );
      return () => {
        unsuscribe();
      };
    },
    [chatId]
  );

  const onSubmit = handleSubmit((data) => {

    addDoc(collection(firestore, "chats", chatId, "messages"), {
      content: data.message,
      createdAt: new Date(),
      phone: auth,
    });
    setDoc(
      doc(firestore, "chats", chatId),
      {
        lastMessage: data.message,
      },
      { merge: true }
    );
    reset();
  });

  const pickImage = async () => {
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
    await uploadImage(media.assets[0].uri, chatId, auth);
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
    await uploadImage(media.assets[0].uri, chatId, auth);
  };

  return (
    <>
    <StatusBar style="auto" />
    <KeyboardAvoidingView    
      keyboardVerticalOffset={height}
      behavior="padding"
      style={{ flex: 1, float: "bottom" }}
      enabled>
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderChatItem}
          >
        </FlatList>  
    <StyledAppbar>
      <Appbar.Action
        icon="attachment"
        onPress={pickImage}
        />
        <Controller
          control={control}
          rules={{ required: true }}
          name="message"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
              <StyledTextInput
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={error}
              onEndEditing={onSubmit}
              />
          )
        }
        ></Controller>
        <Appbar.Action icon="send" onPress={() => onSubmit()} />
        <Appbar.Action
          icon="camera"
          onPress={takePhoto}
        />
      </StyledAppbar>
    </KeyboardAvoidingView>
    <StyledView></StyledView>
  </>
  )
}

export default Chat