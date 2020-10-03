// Universal styles to be used throughout the app

import { StyleSheet } from 'react-native';

export const FULL_STYLE = StyleSheet.create({
    hidden: {
        display: "none"
    },
    // Anything that uses a TextInput element
    textInput: {
        padding: 6,
        borderRadius: 5,
        backgroundColor: "#EEE",
        margin: 12
    },
    // For big important buttons like submit buttons
    bigButton: {
        padding: 14,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 12,
        backgroundColor: "#EE77AA",
        marginTop: 18,
        marginBottom: 18,
        alignSelf: "center",
    },
    bigButtonText: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
    },
    // Should be used when the text is pressable but there's no actual button outline
    textButton: {

    },
    h1: {
        fontSize: 20,
        fontWeight: "bold"
    },
    h2: {
        fontSize: 18,
        fontWeight: "normal"
    },
    h3: {
        fontSize: 14,
        fontWeight: "bold",
    }
});