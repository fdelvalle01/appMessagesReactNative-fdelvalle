import React, { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { useAuth } from "../../../hooks/useAuth";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../../services/firebase";
import  styled  from '@emotion/native';

const StyledTimeText = styled(Text)`
  font-size: 10px;
  text-align: right;
`;

const StyledImage = styled.Image`
  width: 200px;
  height: 300px;
  resize-mode: contain;
`;

const MessageContainer = styled.View((props) => ({
  transform: [{ scaleY: -1 }],
  margin: 16,
  padding: 8,
  borderRadius: 10,
  alignSelf: props.mine ? 'flex-end' : 'flex-start',
  margin: 10,
  maxWidth: '60%',
  backgroundColor: props.mine ? "#64ffda" : "#eaeaea",
}));


export const ChatItem = (props) => {
    const { auth } = useAuth();
    const { phone, id, content, createdAt, type = "text" } = props;
    return (
    <MessageContainer key={id} mine={phone === auth}>
    <Text style={{marginRight:40}}>{content}</Text>
    <StyledTimeText>{new Date(createdAt * 1000).toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' })}</StyledTimeText>
    </MessageContainer>
    );
};
  
    //############################################################################################################
    //Funciones Image Picker y Storage Firebase 
    //############################################################################################################
export const ChatImageItem = (props) => {
    const { auth } = useAuth();
    const [image, setImage] = useState(null);
    const { phone, id, content, createdAt } = props;
    
    useEffect(
        function () {
        async function loadImageFromStorage() {
            const imageRef = ref(storage, content);
            const url = await getDownloadURL(imageRef);
            setImage(url);
        }
        loadImageFromStorage();
        },
        [content]
    );
    
    return (
        <MessageContainer key={id} mine={phone === auth}>
        {image ? <StyledImage source={{ uri: image }} /> : <ActivityIndicator />}
        <StyledTimeText>{new Date(createdAt * 1000).toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' })}</StyledTimeText>
        </MessageContainer>
    );
    };