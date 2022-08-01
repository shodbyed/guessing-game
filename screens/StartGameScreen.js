import { StyleSheet, TextInput, View, Alert } from 'react-native';
import PrimaryButton from '../components/ui/PrimaryButton';
import { useState } from 'react';
import Colors from '../constants/colors';
import Title from '../components/ui/Title';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import ButtonContainer from '../components/ui/ButtonContainer';

const StartGameScreen = ({ onPickedNumber }) => {
    const [enteredNumber, setEnteredNumber] = useState('');

    const numberInputHandler = enteredText => {
        setEnteredNumber(enteredText);
    };
    const resetInputHandler = () => {
        setEnteredNumber('');
    };

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredNumber);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber >= 100) {
            Alert.alert('Invalid Entry', 'Must be a number between 1 and 99.', [
                {
                    text: 'OK',
                    style: 'destructive',
                    onPress: resetInputHandler,
                },
            ]);
            return;
        }
        onPickedNumber(chosenNumber);
    };
    return (
        <View style={styles.rootContainer}>
            <Title>Guess My Number!</Title>
            <Card>
                <InstructionText>Enter a Number</InstructionText>
                <View style={styles.textView}>
                    <TextInput
                        style={styles.numberInput}
                        maxLength={2}
                        keyboardType='number-pad'
                        autoCapitalize='none'
                        autoCorrect={false}
                        onChangeText={numberInputHandler}
                        value={enteredNumber}
                    />
                </View>
                <ButtonContainer>
                    <PrimaryButton onPress={resetInputHandler}>
                        Reset
                    </PrimaryButton>
                    <PrimaryButton onPress={confirmInputHandler}>
                        Confirm
                    </PrimaryButton>
                </ButtonContainer>
            </Card>
        </View>
    );
};

export default StartGameScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        marginTop: 100,
        alignItems: 'center',
    },

    numberInput: {
        height: 50,
        fontSize: 32,
        borderBottomColor: Colors.accent,
        borderBottomWidth: 2,
        color: Colors.accent,
        marginVertical: 8,
        fontWeight: 'bold',
        width: 50,
        textAlign: 'center',
    },
    textView: {
        justifyContent: 'center',
    },
});
