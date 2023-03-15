import React, {useState, useRef} from 'react'
import {Body} from '../../components/Body/Body'
import { Button, HelperText, TextInput, Text  } from 'react-native-paper';
import  styled  from '@emotion/native';
import { useAuth } from "../../hooks/useAuth";
import { Controller, useForm } from 'react-hook-form';
import { View, KeyboardAvoidingView, Platform, Image  } from 'react-native';


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

const { register, 
        setValue, 
        handleSubmit, 
        control,
        formState,
        errors } = useForm();

const counterRef = useRef(0);
counterRef.current += 1;

const onSubmit = handleSubmit((data) => {

    setAuth(data.phone);
});



  return (
    <>
        {/* <CenterBody>
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
            <StyledButton disabled={!formState.isDirty} icon="login" mode="contained" onPress={onSubmit}>
                Login 
            </StyledButton>
        </CenterBody> */}

        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
 
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
                </CenterBody>
            </View>
        </KeyboardAvoidingView>
    </>
  )
}

export default PhoneNumber