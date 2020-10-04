import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Platform, TextInput, Dimensions } from 'react-native';
import apiRequest from "../tools/Utility";
import { FULL_STYLE } from "../tools/Styles";

// Contains the code to display the main view that consists of showing the restroom map
function RestroomMarker() {
    console.log("I have been rendered");
    return (
        <View style={styles.marker}>
            <Text>Bathroom</Text>
        </View>
    );
}

export default function Main({ navigation }) {
    const [location, setLocation] = useState(null);         // the current user location
    const [fatalError, setFatalError] = useState(null);     // if there's something here, then rip map
    const [hasLocation, setHasLocation] = useState(null);   // whether or not the user's location has been determined yet
    const [region, setRegion] = useState(null);             // region shown on the map
    const [markers, setMarkers] = useState([
        {
            coordinate: {
                latitude: 39.1288833729,
                longitude: -84.51742846
            },
            name: "Restroom 1"
        }
    ]);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setFatalError('Permission to access location was denied');
            }
            let location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced
            });
            setLocation(location);
        })();
        }, []);

    var displayText = 'Loading, please wait...';
    if (fatalError) {
        displayText = fatalError;
    } else if (location) {
        if (!hasLocation) {
            setHasLocation(true);
            setRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.006,
                longitudeDelta: 0.0005
            });
        }
    }

    // This section WOULD work... but there's an open issue on GitHub about why it doesn't (timeInterval is ignored)
    // https://github.com/expo/expo/issues/10196
    /*Location.watchPositionAsync({
        distanceInterval: 25,
        timeInterval: 10000
    }, (incomingLocation) => {
        console.log(incomingLocation)
        setLocation(incomingLocation);
        if (!hasLocation) {
            setHasLocation(true);
            setRegion({
                latitude: incomingLocation.coords.latitude,
                longitude: incomingLocation.coords.longitude,
                latitudeDelta: 0.09,
                longitudeDelta: 0.04
            });
        }
    });*/

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <MapView
                style={styles.map}
                region={region}
                showsUserLocation={true}
                moveOnMarkerPress={true}
            >
                {markers.map((marker, index) => (
                    <Marker coordinate={marker.coordinate} key={index}>
                        <RestroomMarker />
                    </Marker>
                ))}
            </MapView>
        </View>
    );
}

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => ++value); // update the state to force render
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height,
    },
    marker: {
        width: 38,
        height: 38,
        padding: 3,
        borderRadius: 60,
        backgroundColor: "#FF5599"
    }
});
