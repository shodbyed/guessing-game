import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NumberContainer from '../components/game/NumberContainer';
import Card from '../components/ui/Card';
import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';
import InstructionText from '../components/ui/InstructionText';
import ButtonContainer from '../components/ui/ButtonContainer';
import GuessLogItem from '../components/game/GuessLogItem';

const generateRandomBetween = (min, max, exclude) => {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userNumber, gameOver }) => {
    const initialGuess = generateRandomBetween(1, 100, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessRounds, setGuessRounds] = useState([initialGuess]);

    useEffect(() => {
        if (currentGuess === userNumber) {
            gameOver(guessRounds.length);
        }
    }, [currentGuess, userNumber, gameOver]);

    useEffect(() => {
        minBoundary = 1;
        maxBoundary = 100;
    }, []);

    const nextGuess = direction => {
        if (
            (direction === 'lower' && currentGuess < userNumber) ||
            (direction === 'higher' && currentGuess > userNumber)
        ) {
            Alert.alert('LIAR!', `You know its not ${direction}`, [
                { text: 'Sorry', style: 'cancel' },
            ]);
            return;
        }
        if (direction === 'lower') {
            maxBoundary = currentGuess;
        } else {
            minBoundary = currentGuess + 1;
        }
        const newRandomNumber = generateRandomBetween(
            minBoundary,
            maxBoundary,
            currentGuess,
        );
        setCurrentGuess(newRandomNumber);
        setGuessRounds(prevGuessRounds => [
            newRandomNumber,
            ...prevGuessRounds,
        ]);
    };
    const guessRoundsListLength = guessRounds.length;
    return (
        <View style={styles.screen}>
            <Title>Opponent Guess</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <InstructionText style={styles.instructionText}>
                    Higher or Lower?
                </InstructionText>
                <ButtonContainer>
                    <PrimaryButton onPress={nextGuess.bind(this, 'higher')}>
                        <Ionicons name='md-add' size={24} color='white' />
                    </PrimaryButton>
                    <PrimaryButton onPress={nextGuess.bind(this, 'lower')}>
                        <Ionicons name='md-remove' size={24} color='white' />
                    </PrimaryButton>
                </ButtonContainer>
            </Card>
            <View style={styles.listContainer}>
                {/*guessRounds.map(guessRound => (
                    <Text key={guessRound}>{guessRound}</Text>
                ))*/}
                <FlatList
                    data={guessRounds}
                    renderItem={itemData => (
                        <GuessLogItem
                            roundNumber={guessRoundsListLength - itemData.index}
                            guess={itemData.item}
                        />
                    )}
                    keyExtractor={item => item}
                />
            </View>
        </View>
    );
};

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
    },
    instructionText: {
        marginBottom: 12,
    },
    buttonView: {
        flex: 1,
        marginHorizontal: 8,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    listContainer: {
        flex: 1,
        padding: 16,
    },
});
