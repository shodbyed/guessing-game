import { useState } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import EndGameScreen from './screens/EndGameScreen';
import Colors from './constants/colors';

export default function App() {
    const [userNumber, setUserNumber] = useState();
    const [roundsNumber, setRoundNumber] = useState(0);
    const [gameIsOver, setGameIsOver] = useState(true);

    const [fontsLoaded] = useFonts({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    const pickedNumberHandler = pickedNumber => {
        setUserNumber(pickedNumber);
        setGameIsOver(false);
    };

    const startNewGameHandler = () => {
        setUserNumber(null);
        setRoundNumber(0);
    };

    let screen = <StartGameScreen onPickedNumber={pickedNumberHandler} />;
    const gameOverHandler = numberOfRounds => {
        setGameIsOver(true);
        setRoundNumber(numberOfRounds);
    };

    if (userNumber) {
        screen = (
            <GameScreen gameOver={gameOverHandler} userNumber={userNumber} />
        );
    }

    if (gameIsOver && userNumber) {
        screen = (
            <EndGameScreen
                userNumber={userNumber}
                roundsNumber={roundsNumber}
                onStartNewGame={startNewGameHandler}
            />
        );
    }

    return (
        <LinearGradient
            colors={[Colors.accentDark, Colors.accent]}
            style={styles.rootScreen}
        >
            <ImageBackground
                source={require('./assets/images/background.png')}
                resizeMode='cover'
                style={styles.rootScreen}
                imageStyle={styles.backgroundImage}
            >
                <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
            </ImageBackground>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    rootScreen: {
        flex: 1,
    },
    backgroundImage: {
        opacity: 0.15,
    },
});
