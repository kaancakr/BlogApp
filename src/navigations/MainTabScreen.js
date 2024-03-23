import * as React from 'react';
import {
    StyleSheet,
    View,
    useWindowDimensions,
} from "react-native";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TransitionPresets} from "@react-navigation/stack";
import {Ionicons} from '@expo/vector-icons';
import COLORS from "../constants/colors";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/Ionicons";

import HomeScreen from "../pages/tabPages/HomeScreen";
import ProfileScreen from "../pages/tabPages/ProfileScreen";
import SettingsScreen from "../pages/tabPages/SettingsScreen";

const Tab = createBottomTabNavigator();

export default function MainTabScreen() {
    const windowDimensions = useWindowDimensions();
    return (
        <View style={styles.container}>
            <Tab.Navigator
                screenOptions={({route}) => ({
                    ...TransitionPresets.SlideFromRightIOS,
                    tabBarStyle: {
                        height: windowDimensions.height < 600 ? hp(8) : hp(10),
                        backgroundColor: "#222831",
                    },
                    tabBarLabelStyle: {
                        marginBottom: hp(1),
                        fontSize: wp(3),
                        color: COLORS.white,
                    },
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;

                        if (route.name === "Home") {
                            iconName = focused ? "home" : "home";
                        } else if (route.name === "Profile") {
                            iconName = focused
                                ? "person-circle"
                                : "person-circle";
                        } else if (route.name === "Settings") {
                            iconName = focused ? "settings" : "settings";
                        }

                        return (
                            <Icon
                                name={iconName}
                                size={size}
                                color={focused ? COLORS.blue : COLORS.grey}
                                style={{marginBottom: hp(0)}}
                            />
                        );
                    },
                })}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarLabel: "Home",
                        tabBarLabelStyle: {
                            fontSize: wp(3),
                        },
                        tabBarColor: COLORS.blue,
                        headerShown: false,

                        tabBarActiveTintColor: COLORS.blue,
                        tabBarInactiveTintColor: COLORS.grey,
                    }}
                ></Tab.Screen>
                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        tabBarLabel: "Profile",
                        tabBarLabelStyle: {
                            fontSize: wp(3),
                        },
                        tabBarColor: COLORS.blue,
                        headerShown: false,

                        tabBarActiveTintColor: COLORS.blue,
                        tabBarInactiveTintColor: COLORS.grey,
                    }}
                ></Tab.Screen>
                <Tab.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{
                        tabBarLabel: "Settings",
                        tabBarLabelStyle: {
                            fontSize: wp(3),
                        },
                        tabBarColor: COLORS.blue,
                        headerShown: false,

                        tabBarActiveTintColor: COLORS.blue,
                        tabBarInactiveTintColor: COLORS.grey,
                    }}
                ></Tab.Screen>
            </Tab.Navigator>
        </View>
    );
};

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#777",
        shadowOffset: {
            width: wp(2),
            height: hp(2),
        },
        shadowOpacity: 0.25,
        shadowRadius: wp(3.5),
        elevation: wp(5),
    },
    container: {
        flex: 1,
        backgroundColor: "#222831",
    },
});
