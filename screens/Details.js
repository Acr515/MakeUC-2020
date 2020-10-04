import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import apiRequest, { generateStars } from "../tools/Utility";
import { FULL_STYLE } from "../tools/Styles";
import { LinearGradient } from 'expo-linear-gradient';

// Image icons
import Restroom from "../assets/restroom.png";

export default function Main({ navigation }) {
    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <Text>Reviews would be listed here</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
