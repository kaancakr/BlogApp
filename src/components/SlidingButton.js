import React, {useState, useEffect} from "react";
import {
    View,
    TouchableOpacity,
    Text,
    Animated,
    Modal,
    StyleSheet,
    TextInput,
    ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import COLORS from "../constants/colors";
import * as Animatable from "react-native-animatable";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";

const SlidingButton = () => {
    const navigation = useNavigation();
    const [slideAnim] = useState(new Animated.Value(0));
    const [modalVisible, setModalVisible] = useState(false);
    const [removeModalVisible, setRemoveModalVisible] = useState(false);
    const [selectedColor, setSelectedColor] = useState("#FF6347");
    const [selectedClass, setSelectedClass] = useState(null);
    const [isInformationModalVisible, setInformationModalVisible] =
        useState(false);
    const [showAdditionalIcons, setShowAdditionalIcons] = useState(false);
    const [rotation] = useState(new Animated.Value(0));
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const handleToggleIcons = () => {
        setShowAdditionalIcons(!showAdditionalIcons);
        const degrees = showAdditionalIcons ? 0 : 45;
        Animated.timing(rotation, {
            toValue: degrees,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    useEffect(() => {
        Animated.spring(slideAnim, {
            toValue: 1,
            tension: 2,
            friction: 8,
            useNativeDriver: false,
        }).start();
    }, []);

    return (
        <View>
            {showAdditionalIcons && (
                <>
                    <TouchableOpacity
                        onPress={() => setRemoveModalVisible(true)}
                        style={{alignItems: "center"}}
                    >
                        <Animatable.View
                            animation="fadeInUp"
                            duration={500}
                            style={styles.icons}
                        >
                            <Icon name="battery-half" size={hp(4)} color={COLORS.green}/>
                        </Animatable.View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setModalVisible(true)}
                        style={{alignItems: "center"}}
                    >
                        <View>
                            <Animatable.View
                                animation="fadeInUp"
                                duration={700}
                                style={styles.icons}
                            >
                                <Icon name="terminal" size={hp(4)} color={COLORS.background}/>
                            </Animatable.View>
                        </View>
                    </TouchableOpacity>
                </>
            )}
            <TouchableOpacity onPress={handleToggleIcons}>
                <Animated.View
                    style={{
                        transform: [
                            {
                                rotate: rotation.interpolate({
                                    inputRange: [0, 360],
                                    outputRange: ["0deg", "-360deg"],
                                }),
                            },
                        ],
                        alignContent: "center",
                    }}
                >
                    <Icon name="add-circle" size={hp(9)} color={COLORS.blue}/>
                </Animated.View>
            </TouchableOpacity>
        </View>
    );
};

export default SlidingButton;

const styles = StyleSheet.create({
    modalHeader: {
        flexDirection: "row",
        maxWidth: wp(50),
        margin: wp(1),
    },
    icons: {
        width: wp(14),
        height: wp(14),
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 3,
        borderColor: "#222831",
        borderRadius: wp(5),
        backgroundColor: COLORS.white,
        marginBottom: hp(2),
        marginLeft: -wp(1),
    },
    input: {
        width: wp(50),
        height: hp(5),
        borderWidth: 2,
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
        borderColor: COLORS.blue,
    },
});
