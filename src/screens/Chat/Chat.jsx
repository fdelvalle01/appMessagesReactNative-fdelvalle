import React, {useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import { Appbar, TextInput, Drawer  } from 'react-native-paper';
import { ScrollBody } from '../../components/Body/Body'
import { KeyboardAvoidingView, Text, View, ScrollView } from 'react-native';
import  styled  from '@emotion/native';
import { useRoute } from "@react-navigation/native";
import { useHeaderHeight } from '@react-navigation/elements';
import { Controller, useForm } from "react-hook-form";

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

const Chat = (props) => {

  const route = useRoute();
  const {id, name} = route.params;
  console.log(id, name);

  const [messages, setMessages] = useState([]);
  const height = useHeaderHeight();

  const { control, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log({ data });
    setMessages([...messages, data.message]);
    reset();
  });


  return (
    <>
    <StatusBar style="auto" />
    <ScrollView>
      {messages.map((text, i) => {
        return <Drawer.Item
        style={{ backgroundColor: '#64ffda', margin: 10, borderRadius: 10, width: 200, alignSelf: 'flex-end' }}
        icon="star"
        label={text}
      />;
      })}
    </ScrollView>
    <KeyboardAvoidingView    
      keyboardVerticalOffset={height}
      behavior="position"
      style={{ flex: 0 }}
      enabled>
    <StyledAppbar>
      <Appbar.Action
        icon="archive"
        onPress={() => console.log('Pressed archive')}
        />
        <Controller
          control={control}
          rules={{ required: true }}
          name="message"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            // <StyledView> </StyledView>
              <StyledTextInput
              // value={text}
              // onChangeText={text => setText(text)}
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
        <Appbar.Action icon="send" onPress={onSubmit} />
        <Appbar.Action
          icon="delete"
          onPress={() => console.log('Pressed delete')}
        />
      </StyledAppbar>
    </KeyboardAvoidingView>
    <StyledView></StyledView>
  </>
  )
}

export default Chat