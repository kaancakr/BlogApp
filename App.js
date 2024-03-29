import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import MainTabScreen from "./src/navigations/MainTabScreen";
import { NavigationContainer } from "@react-navigation/native";
import * as Notifications from 'expo-notifications';
import { useState, useEffect } from "react";
import { firebase } from "./firebase";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContent } from "./src/components/drawer/DrawerContent";
import * as LocalAuthentication from "expo-local-authentication";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/pages/authPages/LoginScreen";
import ProfileStackScreen from "./src/pages/tabPages/ProfileScreen";
import HomeStackScreen from "./src/pages/tabPages/HomeScreen";
import OpenScreen from "./src/pages/tabPages/OpenScreen";
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function App() {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notifications, setNotifications] = useState([]);
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const [isBiometricSupported, setIsBiometricSupported] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            // Check biometric support
            const compatible = await LocalAuthentication.hasHardwareAsync();
            setIsBiometricSupported(compatible);

            // Set up Firebase auth listener
            const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);

            // Register for push notifications and set Expo push token
            const token = await registerForPushNotificationsAsync();
            setExpoPushToken(token);

            // Add a notification received listener
            const notificationSubscription = Notifications.addNotificationReceivedListener(notification => {
                setNotifications(prevNotifications => [...prevNotifications, notification]);
            });

            // Clean up subscriptions
            return () => {
                subscriber();
                notificationSubscription.remove();
            };
        };

        fetchData();
    }, []);

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    if (initializing) return null;

    const MyStack = () => {
        return (
            <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
                <Drawer.Screen
                    name="tab"
                    component={MainTabScreen}
                    options={{
                        headerShown: false,
                        tabBarLabelStyle: {
                            fontSize: 12,
                        },
                    }}
                    listeners={({ navigation }) => ({
                        focus: () => {
                            StatusBar.setBarStyle("light-content");
                        },
                    })}
                />
            </Drawer.Navigator>
        );
    };

    return (
        <NavigationContainer style={styles.container}>
            {user ? (
                <MyStack></MyStack>
            ) : (
                <Stack.Navigator>
                    <Stack.Screen
                        name="OpenScreen"
                        component={OpenScreen}
                        options={{ headerShown: false }}
                        listeners={({ navigation }) => ({
                            focus: () => {
                                StatusBar.setBarStyle("light-content");
                            },
                        })}
                    />
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{ headerShown: false }}
                        listeners={({ navigation }) => ({
                            focus: () => {
                                StatusBar.setBarStyle("light-content");
                            },
                        })}
                    />
                    <Stack.Screen
                        name="HomeScreen"
                        component={HomeStackScreen}
                        options={{ headerShown: false }}
                        listeners={({ navigation }) => ({
                            focus: () => {
                                StatusBar.setBarStyle("light-content");
                            },
                        })}
                    />
                </Stack.Navigator>
            )}
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