import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Colors from '../../constants/colors';

const Card = ({ children }) => {
    return <View style={styles.card}>{children}</View>;
};

export default Card;

const styles = StyleSheet.create({
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        marginTop: 36,
        backgroundColor: Colors.startInputContainer,
        marginHorizontal: 24,
        borderRadius: 8,
        elevation: 10,
        shadowColor: 'black',
        shadowOffset: { width: 10, height: 10 },
        shadowRadius: 6,
        shadowOpacity: 0.25,
    },
});
