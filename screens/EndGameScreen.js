import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import Title from '../components/ui/Title';
import Colors from '../constants/colors';
import PrimaryButton from '../components/ui/PrimaryButton';

const EndGameScreen = ({ roundsNumber, userNumber, onStartNewGame }) => {
    return (
        <View style={styles.rootContainer}>
            <Title>GAME OVER</Title>
            <View style={styles.imageView}>
                <Image
                    style={styles.image}
                    source={require('../assets/images/success.png')}
                />
            </View>

            <Text style={styles.summaryText}>
                It took your phone{' '}
                <Text style={styles.highlight}>{roundsNumber}</Text> rounds to
                guess the number{' '}
                <Text style={styles.highlight}>{userNumber}</Text>
            </Text>
            <PrimaryButton onPress={onStartNewGame}>
                Start New Game
            </PrimaryButton>
        </View>
    );
};

export default EndGameScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageView: {
        borderRadius: 150,
        overflow: 'hidden',
        width: 300,
        height: 300,
        borderWidth: 3,
        borderColor: Colors.accentDark,
        margin: 36,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    summaryText: {
        fontFamily: 'open-sans',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 24,
    },
    highlight: {
        fontFamily: 'open-sans-bold',
        color: Colors.accentDark,
    },
});
