import React, { useState, useEffect } from "react";
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
import { useNavigation } from "@react-navigation/native";

const SlidingButton = ({ onNewPost }) => {
    const navigation = useNavigation();
    const [slideAnim] = useState(new Animated.Value(0));
    const [modalVisible, setModalVisible] = useState(false);
    const [inputText, setInputText] = useState("");
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

    const handleTerminalPress = () => {
        setModalVisible(true);
    };

    const handleTerminalClosePress = () => {
        setModalVisible(false);
    };

    const handleSubmit = () => {
        if (inputText.trim() !== "") {
            // Call the onNewPost callback with the input text
            onNewPost(inputText);
            setInputText(""); // Clear the input field
            setModalVisible(false); // Close the modal
        }
    };

    return (
        <View>
            {showAdditionalIcons && (
                <>
                    <TouchableOpacity
                        onPress={() => setRemoveModalVisible(true)}
                        style={{ alignItems: "center" }}
                    >
                        <Animatable.View
                            animation="fadeInUp"
                            duration={500}
                            style={styles.icons}
                        >
                            <Icon
                                name="battery-half"
                                size={hp(4)}
                                color={COLORS.green}
                            />
                        </Animatable.View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleTerminalPress}
                        style={{ alignItems: "center" }}
                    >
                        <View>
                            <Animatable.View
                                animation="fadeInUp"
                                duration={700}
                                style={styles.icons}
                            >
                                <Icon
                                    name="terminal"
                                    size={hp(4)}
                                    color={COLORS.background}
                                />
                            </Animatable.View>
                        </View>
                    </TouchableOpacity>
                </>
            )}
            <TouchableOpacity
                onPress={handleToggleIcons}
                style={{
                    borderRadius: 50,
                    backgroundColor: COLORS.white,
                    borderColor: COLORS.white,
                }}
            >
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
                    <Icon
                        name="add-circle"
                        size={hp(9)}
                        color={COLORS.blue}
                    />
                </Animated.View>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.terminalHeader}>
                            <Text style={styles.terminalHeaderText}>
                                Terminal
                            </Text>
                            <TouchableOpacity
                                onPress={handleTerminalClosePress}
                            >
                                <Icon
                                    name="close"
                                    size={hp(3)}
                                    color={COLORS.green}
                                    onPress={() => setModalVisible(false)}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.terminalBody}>
                            <ScrollView>
                                {/* Terminal output goes here */}
                                <Text style={styles.terminalText}>
                                    Welcome to the terminal!
                                </Text>
                            </ScrollView>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.prompt}>$</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter command..."
                                placeholderTextColor={COLORS.white}
                                autoFocus
                                value={inputText}
                                onChangeText={setInputText}
                                multiline={true}
                            />
                        </View>
                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={handleSubmit}
                        >
                            <Text style={styles.submitButtonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
        flex: 1,
        color: '#fff',
        fontFamily: 'Courier New',
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#6f6',
        paddingVertical: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        marginBottom: hp(20)
    },
    modalContent: {
        backgroundColor: COLORS.background,
        borderRadius: 10,
        padding: 20,
        width: '80%',
        shadowColor: COLORS.background,
        shadowOffset: {
            width: 8,
            height: hp(1),
        },
        shadowOpacity: 0.3,
        shadowRadius: wp(0.5),
        elevation: 5,
    },
    terminalHeader: {
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    terminalHeaderText: {
        color: '#6f6',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Courier New',
    },
    terminalBody: {
        maxHeight: 200, // Adjust the maximum height of the terminal body
        marginBottom: 10,
    },
    terminalText: {
        color: '#fff',
        fontFamily: 'Courier New',
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    prompt: {
        color: '#6f6',
        fontSize: 16,
        marginRight: 5,
    },
    submitButton: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.green,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: COLORS.green,
        marginTop: 20,
        shadowColor: COLORS.green,
        shadowOffset: {
            width: 5,
            height: hp(0.5),
        },
        shadowOpacity: 0.3,
        shadowRadius: wp(0.5),
        elevation: 5,
    },
    submitButtonText: {
        color: '#fff',
        fontFamily: 'Courier New',
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#6f6',
        paddingVertical: 5,
        fontWeight: "bold"
    },
});
