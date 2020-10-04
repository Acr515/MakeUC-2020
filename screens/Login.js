import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import apiRequest from "../tools/Utility";
import { FULL_STYLE } from "../tools/Styles";
import { LinearGradient } from 'expo-linear-gradient';

export default function Login({ navigation }) {
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [register, setRegister] = useState(false);
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const login = function() {
        var data = {
            username: loginUsername,
            password: loginPassword
        };

        setLoading(true);
        setDisabled(true);

        apiRequest("login", data, (response) => {
            if (response.code != 200) alert(response.response);
            setLoading(false);
            setDisabled(false);
            navigation.navigate("Main");
        }, (error) => {
            alert("An unexpected error occurred.");
        });
    }

    const registration = function() {
        var data = {
            username: registerUsername,
            password: registerPassword,
            email: email
        };

        setLoading(true);
        setDisabled(true);

        apiRequest("register", data, (response) => {
            alert(response.response);
            setLoading(false);
            setDisabled(false);
        }, (error) => {
            console.error(error);
            alert("An unexpected error occurred.");
        });
    }

    const toggleRegistration = function() {
        setRegister(!register)
    }

    return (
        <LinearGradient 
            style={styles.container}
            colors={["#EE77AA", "#9944CC"]}
        >
            <StatusBar style="dark" />
            <View style={[styles.login, (register) ? FULL_STYLE.hidden : {} ]}>
                <Text style={[FULL_STYLE.h1, FULL_STYLE.white]}>Login</Text>
                <TextInput style={FULL_STYLE.textInput} placeholder="Username" onChangeText={(text) => setLoginUsername(text)} />
                <TextInput style={FULL_STYLE.textInput} secureTextEntry={true} placeholder="Password" onChangeText={(text) => setLoginPassword(text)} />
                <TouchableOpacity style={FULL_STYLE.bigButton} disabled={ disabled } onPress={ login }>
                    <Text style={FULL_STYLE.bigButtonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity disabled={ disabled } onPress={ toggleRegistration }>
                    <Text style={[FULL_STYLE.white]}>Don't have an account? Register here.</Text>
                </TouchableOpacity>
            </View>

            <View style={[styles.login, (!register) ? FULL_STYLE.hidden : {} ]}>
                <Text style={[FULL_STYLE.h1, FULL_STYLE.white]}>Register</Text>
                <TextInput style={FULL_STYLE.textInput} placeholder="Username" onChangeText={(text) => setRegisterUsername(text)} />
                <TextInput style={FULL_STYLE.textInput} secureTextEntry={true} placeholder="Password" onChangeText={(text) => setRegisterPassword(text)} />
                <TextInput style={FULL_STYLE.textInput} secureTextEntry={true} placeholder="Password (again)" onChangeText={(text) => setConfirmPassword(text)} />
                <TextInput style={FULL_STYLE.textInput} placeholder="Email Address" onChangeText={(text) => setEmail(text)} />
                <TouchableOpacity style={FULL_STYLE.bigButton} disabled={ disabled } onPress={ registration }>
                    <Text style={FULL_STYLE.bigButtonText}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity disabled={ disabled } onPress={ toggleRegistration }>
                    <Text style={[FULL_STYLE.white]}>Already have an account? Login here.</Text>
                </TouchableOpacity>
            </View>
            
            {
            (loading) ? (<ActivityIndicator size="large" />) : null
            }
        </LinearGradient>
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
