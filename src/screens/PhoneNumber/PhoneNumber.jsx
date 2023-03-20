import React, {useState, useRef} from 'react'
import {Body} from '../../components/Body/Body'
import { Button, HelperText, TextInput, Text  } from 'react-native-paper';
import  styled  from '@emotion/native';
import { useAuth } from "../../hooks/useAuth";
import { Controller, useForm } from 'react-hook-form';
import { View, KeyboardAvoidingView, Platform, Image  } from 'react-native';
import Register from './components/Register';
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore, storage } from "../../services/firebase";
import { Alert } from 'react-native';

const CenterBody = styled(Body)`
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    width: 100%;
`;
// padding: 0 0 0 0; => arriba derecha abajo izquierda
const StyledTextInput = styled(TextInput)`
    width: 100%;
    margin-bottom: 10px;
    background-color: #fafafa;
    height: 50px;
`;

const StyledButton = styled(Button)`
    width: 100%;
    margin-top: 20px;
`;

const StyledView = styled.View`
    width: 100%;
`;

const PhoneNumber = () => {
const [text, setText] = useState("");
const { setAuth } = useAuth();

const [isLogin, setIsLogin] = useState(true);

const { register,   setValue,  handleSubmit,   control,  formState,    errors } = useForm();

const counterRef = useRef(0);
counterRef.current += 1;


// metodo para verificar si el email existe en la base de datos de firebase, si existe se loguea y si no existe muestra un mensaje de error 
const onSubmit = handleSubmit((data) => {
  
    emailExists(data.Email).then((exists) => {
        if (exists) {
            setAuth(data.phone);
        } else {
            Alert.alert("Usuario inexistente");
        }
    }
    );
});

//metodo para verificar si el email existe en la base de datos de firebase 
const emailExists = async (email) => {
    const userRef = collection(firestore, "user");
    const q = query(userRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    return !querySnapshot.empty;
};

const ComponentLogin = () => {
    return (
            <CenterBody>
                <View style={{justifyContent: 'center', alignItems: 'center', marginBottom:50}}>
                    <Image source={require('../../../assets/logo.png')} />
                </View>
                <Controller
                    control={control}
                    name="Email"
                    rules={{required: 'Ingrese su Email'}}
                    render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                        <StyledView>
                            <StyledTextInput
                                label="Email"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                error={error}
                                id="outlined-basic"
                                variant="outlined"
                                
                    />
                    <HelperText type="error" visible={Boolean(error)}>
                        {error?.message}
                    </HelperText>
                </StyledView> 
                )}
                ></Controller>
                  <Controller
                    control={control}
                    name="Contrasena"
                    rules={{required: 'Ingrese su Contraseña'}}
                    render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                        <StyledView>
                            <StyledTextInput
                                label="Contraseña"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                error={error}
                                id="outlined-basic"
                                variant="outlined"
                                secureTextEntry={true}
                                
                    />
                    <HelperText type="error" visible={Boolean(error)}>
                        {error?.message}
                    </HelperText>
                </StyledView> 
                )}
                ></Controller>
                <Controller
                    control={control}
                    name="phone"
                    rules={{required: 'Ingrese su Telefono', pattern: {value: /^\d+$/, message: 'Ingrese solo numeros'}}}
                    render={({ field: { onChange, onBlur, value },  fieldState: { error } }) => (
                    <StyledView>
                        <StyledTextInput
                        label="Telefono"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        keyboardType="phone-pad"
                        error={error}
                        left={<TextInput.Affix name="phone" text='+56 9 '/>}
                    />
                    <HelperText type="error" visible={Boolean(error)}>
                        {error?.message}
                    </HelperText>
                    </StyledView> 
                )}
                ></Controller>
                <StyledButton disabled={!formState.isDirty} icon="login" mode="contained" onPress={onSubmit} style={{backgroundColor:'#33e3ff'}}>
                    Login 
                </StyledButton>
                <StyledButton  icon="arrow-right" mode="contained" onPress={() => setIsLogin(false)} >
                    Necesitas una cuenta? Registrate 
                </StyledButton>
                </CenterBody>
                )
            }
  return (
    <>
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {
                    isLogin ? <ComponentLogin></ComponentLogin> : <Register setIsLogin={setIsLogin}></Register>
                }
            </View>
        </KeyboardAvoidingView>
    </>
  )
}

export default PhoneNumber