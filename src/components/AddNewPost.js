import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {useState} from "react";
import COLORS from "../constants/colors";

export default function AddNewPost() {
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
    );
};

const styles = StyleSheet.create({
    enterText: {
        display: 'flex',
        flexDirection: 'column',
        width: wp(90),
        height: hp(30),
        backgroundColor: '#344955',
        borderWidth: 2,
        borderColor: '#50727B',
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
    },
    mainText: {
        padding: 10,
        alignItems: 'flex-start',
    },
    caption: {
        fontSize: 22,
        color: '#fff',
    },
    inputIcon: {
        margin: 10,
        color: COLORS.blue,
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
})