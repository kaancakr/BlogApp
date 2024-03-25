import {useState} from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    FlatList,
    Image, Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import COLORS from "../../constants/colors";
import PostCard from "../../components/PostCard";
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {

    const navigation = useNavigation();

    const verticalData = [
        {id: "1", title: "+", color: COLORS.green},
        {id: "2", title: "add", color: COLORS.blue},
        {id: "3", title: "technology", color: COLORS.blue},
        {id: "4", title: "trends", color: COLORS.blue},
        {id: "5", title: "topics", color: COLORS.blue},
    ];

    const handleOpenProfilePage = () => {
        navigation.navigate('Profile');
    };

    const renderItem = ({item}) => (
        <TouchableOpacity style={styles.bottomIcon}>
            <Text style={{fontWeight: "bold", color: item.color, fontSize: 14}}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar style="light-content"/>
            <View style={styles.area}>
                <View style={styles.welcomeArea}>
                    <Text style={styles.welcomeText}>
                        Home
                    </Text>
                    <TouchableOpacity onPress={handleOpenProfilePage}>
                        <Image
                            source={require("../../assets/monkey.jpg")}
                            style={styles.image}
                        />
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={verticalData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    horizontal
                    contentContainerStyle={styles.flatListContainer}
                />
                <ScrollView>
                    <View style={styles.postContainer}>
                        <PostCard
                            id={1}
                            username="kaancakir"
                            imageUrl="https://via.placeholder.com/250"
                            likes={123}
                            comments={7}
                            caption="This is a sample caption for the Instagram post."
                        />
                        <PostCard
                            id={2}
                            username="berkaykaraca"
                            imageUrl="https://via.placeholder.com/250"
                            likes={123}
                            comments={7}
                            caption="This is a sample caption for the Instagram post."
                        />
                        <PostCard
                            id={3}
                            username="berkebeyaz"
                            imageUrl="https://via.placeholder.com/250"
                            likes={123}
                            comments={7}
                            caption="This is a sample caption for the Instagram post."
                        />
                        <PostCard
                            id={4}
                            username="kivi"
                            imageUrl="https://via.placeholder.com/250"
                            likes={123}
                            comments={7}
                            caption="This is a sample caption for the Instagram post."
                        />
                    </View>
                </ScrollView>
            </View>
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
        marginTop: hp(8),
        alignItems: 'center',
        justifyContent: 'center',
    },
    welcomeArea: {
        display: 'flex',
        flexDirection: 'row',
        width: wp(90),
        justifyContent: "space-between"
    },
    welcomeText: {
        fontSize: 42,
        color: COLORS.blue,
        fontWeight: "bold",
        marginTop: 5,
        fontFamily: Platform.OS === "ios" ? "Avenir Next" : "normal"
    },
    image: {
        width: 50,
        height: 50,
        justifyContent: "flex-end",
        alignItems: "center",
        borderRadius: 50
    },
    bottomIcon: {
        borderWidth: 2,
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        borderColor: '#fff',
        justifyContent: "space-between",
        marginHorizontal: 5,
        backgroundColor: COLORS.white
    },
    flatListContainer: {
        marginTop: 10,
        height: hp(6),
        marginBottom: 20
    },
});