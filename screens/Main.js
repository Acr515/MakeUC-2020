import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import apiRequest, { generateStars } from "../tools/Utility";
import { FULL_STYLE } from "../tools/Styles";
import { LinearGradient } from 'expo-linear-gradient';

// Image icons
import Restroom from "../assets/restroom.png";


// Contains the code to display the main view that consists of showing the restroom map
function RestroomMarker(marker) {
    return (
        <View style={styles.marker}>
            <Image source={Restroom} style={styles.markerImage}/>
        </View>
    );
}

function RestroomCallout(marker) {
    return (
        <LinearGradient colors={["#EE77AA", "#9944CC"]} style={styles.callout}>
            <Text style={[FULL_STYLE.h2, FULL_STYLE.white]}>{marker.name}</Text>
            <Text style={[FULL_STYLE.starsBar, FULL_STYLE.white]}>
                {generateStars(marker.stars)}
            </Text>
            <Text style={[FULL_STYLE.white]}>{marker.reviews} {(marker.reviews == 1) ? "rating" : "ratings"}</Text>
        </LinearGradient>
    )
}

function BottomUI() {
    return (
        <LinearGradient 
            style={styles.bottomUIcontain}
            colors={["rgba(0,0,0,0)", "#D177BB"]}
        >
            <Text style={[FULL_STYLE.h1, FULL_STYLE.white]}>Welcome!</Text>
            <TouchableOpacity style={FULL_STYLE.bigButton}>
                <Text style={FULL_STYLE.bigButtonText}>Add Location</Text>
            </TouchableOpacity>
        </LinearGradient>
    )
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
                longitude: -84.516
            },
            name: "Restroom 1",
            stars: 3,
            reviews: 1,
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

    // Runs when the marker is touched... not needed as of now
    const focusMarker = function(marker) {
        /* setRegion({
            latitude: marker.coordinate.latitude - .0019,
            longitude: marker.coordinate.longitude,
            latitudeDelta: 0.006,
            longitudeDelta: 0.0005
        }, 10); */
    }

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <MapView
                style={styles.map}
                region={region}
                showsUserLocation={true}
                moveOnMarkerPress={false}
                showsMyLocationButton={true}
                pitchEnabled={false}
            >
                {markers.map((marker, index) => (
                    <Marker coordinate={marker.coordinate} key={index} onPress={() => focusMarker(marker)}>
                        <RestroomMarker {...marker}/>
                        <Callout tooltip={true} onPress={() => navigation.navigate("Details")}>
                            <RestroomCallout {...marker}/>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
            <BottomUI/>
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
        backgroundColor: "#EE77AA"
    },
    markerImage: {
        width: 22,
        height: 22,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "auto",
        marginBottom: "auto",
        resizeMode: "contain"
    },
    markerNoRatings: {
        backgroundColor: "#999"
    },
    callout: {
        backgroundColor: "#EE77AA",
        width: 200,
        padding: 12,
        borderRadius: 10,
    },
    bottomUIcontain: {
        position: "absolute",
        left: 0,
        right: 0,
        top: "75%",
        bottom: 0,
        padding: 18,
        paddingTop: 56,
    },
});
