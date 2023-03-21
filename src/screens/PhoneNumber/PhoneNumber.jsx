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

/*
Este código primero verifica si el email ingresado por el usuario existe en la base de datos
de Firebase. Si existe, obtiene la contraseña almacenada en Firebase y 
la compara con la contraseña ingresada por el usuario. Si las contraseñas coinciden,
el usuario es autenticado, de lo contrario se muestra un mensaje de error. 
Si el email no existe en Firebase, se muestra otro mensaje de error.
*/
const onSubmit = handleSubmit(async (data) => {
    const { Email, Contrasena } = data;
  
    // Verificar si el email existe en la base de datos de firebase
    const userRef = collection(firestore, "user");
    const q = query(userRef, where("email", "==", Email));
    const querySnapshot = await getDocs(q);
  
    if (!querySnapshot.empty) {
      // Obtener la contraseña almacenada en Firebase
      const user = querySnapshot.docs[0].data();
      const { password } = user;
      // Validar si la contraseña ingresada coincide con la contraseña almacenada en Firebase
      if (password === Contrasena) {
        setAuth(data.phone);
      } else {
        Alert.alert("Contraseña incorrecta");
      }
    } else {
      Alert.alert("Usuario inexistente");
    }
  });

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