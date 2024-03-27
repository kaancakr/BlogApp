import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import MainTabScreen from "./src/navigations/MainTabScreen";
import { NavigationContainer } from "@react-navigation/native";
import * as Notifications from 'expo-notifications';
import { useState, useEffect } from "react";

StatusBar.setBarStyle("light-content");

export default function App() {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        const subscription = Notifications.addNotificationReceivedListener(notification => {
            setNotifications(prevNotifications => [...prevNotifications, notification]);
        });

        return () => subscription.remove();
    }, []);

    return (
        <NavigationContainer style={styles.container}>
            <MainTabScreen />
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222831',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

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

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }
    if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;

    return token;
}
