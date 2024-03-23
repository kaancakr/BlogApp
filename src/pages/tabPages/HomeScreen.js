import {useState} from "react";
import {StyleSheet, Text, TextInput, View, StatusBar, ScrollView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function HomeScreen() {

    const [inputHeight, setInputHeight] = useState(hp(10));
    const [hideIcons, setHideIcons] = useState(false);

    const handleContentSizeChange = (contentWidth, contentHeight) => {
        const threshold = hp(3);
        if (contentHeight > threshold) {
            setHideIcons(true);
            setInputHeight(hp(15));
        } else {
            setHideIcons(false);
            setInputHeight(hp(6));
        }
    };
    return (
        <View style={styles.container}>
            <StatusBar style="light-content"/>
            <ScrollView style={styles.area}>
                <View style={styles.welcomeArea}>
                    <Text style={styles.welcomeText}>
                        Welcome... Developer 👨‍💻
                    </Text>
                    <Text style={styles.welcomeSubText}>
                        Let's share your ideas with others
                    </Text>
                </View>
                <View style={styles.enterText}>
                    <View style={styles.mainText}>
                        <Text style={styles.caption}>What did you produce today?</Text>
                    </View>
                    <View style={[styles.inputArea, {height: inputHeight}]}>
                        <TextInput
                            style={styles.input}
                            placeholder="Share some ideas..."
                            placeholderTextColor={'#fff'}
                            keyboardType="numeric"
                            multiline={true}
                            onContentSizeChange={(e) =>
                                handleContentSizeChange(e.nativeEvent.contentSize.width, e.nativeEvent.contentSize.height)
                            }
                        />
                        <TouchableOpacity>
                            <Icon name={'send'} size={30} style={styles.inputIcon}/>
                        </TouchableOpacity>
                    </View>
                    {!hideIcons && (
                        <View style={styles.subText}>
                            <Text style={styles.subCaption}>Or share your projects directly</Text>
                        </View>
                    )}
                    {!hideIcons && (
                        <View style={styles.iconActionArea}>
                            <TouchableOpacity>
                                <Icon name={'logo-github'} color={'#fff'} size={25} style={styles.bottomIcon}/>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Icon name={'logo-medium'} color={'#fff'} size={25} style={styles.bottomIcon}/>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Icon name={'logo-linkedin'} color={'#fff'} size={25} style={styles.bottomIcon}/>
                            </TouchableOpacity>
                        </View>
                    )}

                </View>
            </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222831',
        alignItems: 'center',
        justifyContent: 'center',
    },
    area: {
        marginTop: hp(8)
    },
    welcomeArea: {
        display: 'flex',
        flexDirection: 'column',
        width: wp(90),
        height: hp(12),
        backgroundColor: '#344955',
        borderWidth: 2,
        borderColor: '#50727B',
        padding: 10,
        borderRadius: 10,
        marginBottom: 20
    },
    welcomeText: {
        fontSize: 28,
        color: '#9EC8B9',
        fontWeight: "bold",
        marginBottom: 20,
        marginTop: 5
    },
    welcomeSubText: {
        fontSize: 18,
        color: '#9EC8B9',
        fontWeight: "500"
    },
    mainText: {
        padding: 10,
        alignItems: 'flex-start',
    },
    caption: {
        fontSize: 22,
        color: '#fff',
    },
    enterText: {
        display: 'flex',
        flexDirection: 'column',
        width: wp(90),
        height: hp(25),
        backgroundColor: '#344955',
        borderWidth: 2,
        borderColor: '#50727B',
        padding: 10,
        borderRadius: 10,
    },
    inputArea: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    input: {
        padding: 10,
        fontSize: 18,
        borderWidth: 2,
        borderRadius: 8,
        borderColor: '#fff',
        margin: 5,
        width: wp(65),
        color: '#fff',
        marginRight: 15
    },
    inputIcon: {
        margin: 10,
        color: '#fff',
    },
    subText: {
        marginTop: 5,
        padding: 10,
        alignItems: 'flex-start',
    },
    subCaption: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '500',
    },
    iconActionArea: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: 10,
    },
    bottomIcon: {
        borderWidth: 2,
        padding: 10,
        borderRadius: 8,
        borderColor: '#fff',
    },
});