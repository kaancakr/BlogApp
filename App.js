import {StatusBar, StyleSheet, View} from 'react-native';
import MainTabScreen from "./src/navigations/MainTabScreen";
import { NavigationContainer } from "@react-navigation/native";
StatusBar.setBarStyle("light-content");
export default function App() {
    return (
        <NavigationContainer style={styles.container}>
            <MainTabScreen/>
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