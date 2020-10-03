import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import apiRequest from "../tools/Utility";
import { FULL_STYLE } from "../tools/Styles";

export default class Login extends Component {
    constructor({ navigation }) {
        super();
        this.state = { username: "", password: "", passwordConfirm: "", email: "", register: false, loading: false, disabled: false };
    }

    login = () => {
        var data = {
            username: this.state.username,
            password: this.state.password
        };

        this.setState({ loading: true, disabled: true }, () => {
            apiRequest("login", data, (response) => {
                alert(response.response);
                this.setState({ loading: false, disabled: false });
            }, (error) => {
                alert("An unexpected error occurred.");
            });
        });
    }

    register = () => {
        var data = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        };

        this.setState({ loading: true, disabled: true }, () => {
            apiRequest("register", data, (response) => {
                alert(response.response);
                this.setState({ loading: false, disabled: false });
            }, (error) => {
                alert("An unexpected error occurred.");
            });
        });
    }

    toggleRegistration = () => {
        this.setState( {register: !this.state.register} );
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar style="dark" />
                
                <View style={[styles.login, (this.state.register) ? FULL_STYLE.hidden : {} ]}>
                    <Text style={[FULL_STYLE.h1]}>Login</Text>
                    <TextInput style={FULL_STYLE.textInput} placeholder="Username" onChangeText={(text) => this.setState({ username: text})} />
                    <TextInput style={FULL_STYLE.textInput} secureTextEntry={true} placeholder="Password" onChangeText={(text) => this.setState({ password: text})} />
                    <TouchableOpacity style={FULL_STYLE.bigButton} disabled={ this.state.disabled } onPress={ this.login }>
                        <Text style={FULL_STYLE.bigButtonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={ this.state.disabled } onPress={ this.toggleRegistration }>
                        <Text>Don't have an account? Register here.</Text>
                    </TouchableOpacity>
                </View>

                <View style={[styles.login, (!this.state.register) ? FULL_STYLE.hidden : {} ]}>
                    <Text style={[FULL_STYLE.h1]}>Register</Text>
                    <TextInput style={FULL_STYLE.textInput} placeholder="Username" onChangeText={(text) => this.setState({ username: text})} />
                    <TextInput style={FULL_STYLE.textInput} secureTextEntry={true} placeholder="Password" onChangeText={(text) => this.setState({ password: text})} />
                    <TextInput style={FULL_STYLE.textInput} secureTextEntry={true} placeholder="Password (again)" onChangeText={(text) => this.setState({ passwordConfirm: text})} />
                    <TextInput style={FULL_STYLE.textInput} placeholder="Email Address" onChangeText={(text) => this.setState({ email: text})} />
                    <TouchableOpacity style={FULL_STYLE.bigButton} disabled={ this.state.disabled } onPress={ this.register }>
                        <Text style={FULL_STYLE.bigButtonText}>Register</Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={ this.state.disabled } onPress={ this.toggleRegistration }>
                        <Text>Already have an account? Login here.</Text>
                    </TouchableOpacity>
                </View>
                
                {
                (this.state.loading) ? (<ActivityIndicator size="large" />) : null
                }
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
  },
});
