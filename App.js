import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Provider as PaperProvider } from "react-native-paper";
import  PhoneNumbers  from "./src/screens/PhoneNumber/PhoneNumber";
import  Navigator  from "./src/Navigator";
import { AuthProvider, useAuth } from "./src/hooks/useAuth";
import * as SplashScreen from "expo-splash-screen";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "./src/services/firebase";
import { Alert } from "react-native";

SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function AuthApp() {
  const { auth, setAut, loading } = useAuth();
  
  useEffect(() => {
    if (auth) registerForPushNotificationsAsync(auth);
  }, []);
  if (loading) return null;

  return (
    <>
      {!auth && <PhoneNumbers />}
      {auth && <Navigator />}
    </>
  );
}

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
     // Provider es un componente que permite que todos los componentes hijos tengan acceso a los estilos de Paper
     <AuthProvider>
      <PaperProvider>
        <AuthApp />
        <StatusBar style="auto" />
      </PaperProvider>
    </AuthProvider>

  );
}
async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      Alert.alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    Alert.alert('Must use physical device for Push Notifications');
  }

  return token;
}