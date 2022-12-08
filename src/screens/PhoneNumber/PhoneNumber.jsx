import React, {useState, useRef} from 'react'
import {Body} from '../../components/Body/Body'
import { Button, HelperText, TextInput } from 'react-native-paper';
import  styled  from '@emotion/native';
import { useAuth } from "../../hooks/useAuth";
import { Controller, useForm } from 'react-hook-form';
const CenterBody = styled(Body)`
    justify-content: center;
    align-items: center;
    padding: 0 20px;
`;

// padding: 0 0 0 0; => arriba derecha abajo izquierda
const StyledTextInput = styled(TextInput)`
    width: 100%;
    margin-bottom: 20px;
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
    console.log(data);
    setAuth(true);
});

  return (
    <>
        <CenterBody>
            {/* <Controller
                control={control}
                rules={{required: 'Ingrese su nombre'}}
                name="Nombre"
                render={({ field: { onChange, onBlur, value },
                            fieldState: { error }
                }) => (
                    <StyledView>
                        <StyledTextInput
                            label="Nombre"
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
            ></Controller> */}
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
                name="Telefono"
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

            {/* <StyledTextInput
                label="Telefono"
                value={text}
                onChangeText={text => setText(text)}
                keyboardType="phone-pad"
                left={<TextInput.Affix name="phone" text='+56 9 '/>}
                /> */}
            <StyledButton disabled={!formState.isDirty} icon="login" mode="contained" onPress={onSubmit}>
                Login 
            </StyledButton>
        </CenterBody>
    </>
  )
}

export default PhoneNumber