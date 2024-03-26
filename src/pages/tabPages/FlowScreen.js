// SettingsScreen.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FlowScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Flow Screen</Text>
            <Text style={styles.content}>This is where you can reach app flow.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#222831',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white'
    },
    content: {
        fontSize: 18,
        textAlign: 'center',
        color: '#333',
    },
});
