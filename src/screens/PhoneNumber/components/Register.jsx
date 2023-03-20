import React from 'react'
import styled from '@emotion/native';
import {Body} from '../../../components/Body/Body'
import { Button, HelperText, TextInput, Text  } from 'react-native-paper';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { addDoc, collection, doc, onSnapshot, orderBy, query, setDoc } from "firebase/firestore";
import { firestore, storage } from "../../../services/firebase";
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

const Register = ({setIsLogin}) => {
    const { register,   setValue,  handleSubmit,   control,  formState,    errors } = useForm();

    const onSubmitRegister = handleSubmit(async (data) => {
   
        const response = await registerUser(data.Email, data.Contrasena, data.Nombre, data.Apellido);   
        if (response.success) {
            console.log(response.message); // "Usuario creado con éxito"
            Alert.alert('Usuario creado con éxito');
            setIsLogin(true);
        } else {
            console.error(response.message); // "Error al crear usuario"
            Alert.alert('Usuario no ha podido ser creado');
            console.error(response.error); // "Error generado por Firestore"
        }
    });

    const registerUser = async (email, password, nombre, apellido) => {
        try {
          const userRef = doc(collection(firestore, "user"));
          await setDoc(userRef, {
            id: userRef.id,
            email: email,
            password: password,
            nombre: nombre,
            apellido: apellido,
            createdAt: new Date(),
          });
      
          return {
            success: true,
            message: 'Usuario creado con éxito',
            data: {
              id: userRef.id,
              email: email,
              nombre: nombre,
              apellido: apellido,
              createdAt: new Date(),
            }
          };
        } catch (error) {
          return {
            success: false,
            message: 'Error al crear usuario',
            error: error.message
          };
        }
      };
    
    return (
        <CenterBody>
            <Controller
                control={control}
                name="Nombre"
                rules={{required: 'Ingrese su Nombre'}}
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <StyledView>
                        <StyledTextInput
                            label="Nombre"
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
                name="Apellido"
                rules={{required: 'Ingrese su Apellido'}}
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <StyledView>
                        <StyledTextInput
                            label="Apellido"
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
      
            <StyledButton icon="login" mode="contained" onPress={onSubmitRegister} style={{backgroundColor:'#33e3ff'}}>
                Registrate
            </StyledButton>

            <StyledButton icon="arrow-left" mode="contained" onPress={() => setIsLogin(true)} >
                Tienes una Cuenta ? Inicia Sesion
            </StyledButton>
        </CenterBody>
    )
}

export default Register