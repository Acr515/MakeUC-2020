import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
//import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Platform, TextInput } from 'react-native';
import apiRequest from "../tools/Utility";
import { FULL_STYLE } from "../tools/Styles";

// Contains the code to display the main view that consists of showing the restroom map
export default class Main extends Component {
    constructor({ navigation }) {

    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar style="dark" />
                <Text style={FULL_STYLE.h1}>welcome to the app</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
