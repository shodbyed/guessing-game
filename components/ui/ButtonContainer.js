import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const ButtonContainer = ({ children }) => {
    return (
        <View style={styles.buttonsContainer}>
            {children.map((button, index) => (
                <View style={styles.buttonView} key={index}>
                    {button}
                </View>
            ))}
        </View>
    );
};

export default ButtonContainer;

const styles = StyleSheet.create({
    buttonView: {
        flex: 1,
        marginHorizontal: 8,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
