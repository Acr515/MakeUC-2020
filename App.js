import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
//import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Platform, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Importing all screens into app
import Login from "./screens/Login";
import Main from "./screens/Main";
import Details from "./screens/Details";

const Stack = createStackNavigator();

export default function App() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen 
                        name="Login"
                        component={Login}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen 
                        name="Main"
                        component={Main}
                        options={{
                            headerShown: false,
                            gestureEnabled: false
                        }}
                    />
                    <Stack.Screen 
                        name="Details"
                        component={Details}
                        options={{
                            headerTintColor: "white",
                            headerStyle: {
                                backgroundColor: "#EE77AA"
                            }
                            
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
