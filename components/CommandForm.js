import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

import { sendCommand } from '../utils/api'

const NumpadButton = ({ num, onPress }) => (
    <TouchableOpacity
        style={styles.numpadButton}
        onPress={() => onPress(num)}
    >
        <Text style={styles.numpadButtonText}>{num}</Text>
    </TouchableOpacity>
);

export default function CommandForm() {
    const [user, setUser] = useState('');
    const [command, setCommand] = useState(''); 
    const [response, setResponse] = useState(null);

    const handleNumberPress = (num) => {
        setCommand(num); 
    };

    const handleClearCommand = () => {
        setCommand('');
    };

    const handleSubmit = async () => {
        if (user.trim() === '' || command.trim() === '') {
            setResponse({ status: 'error', message: 'Gebruiker en commando mogen niet leeg zijn!' });
            return;
        }

        const res = await sendCommand(user, command);
        setResponse(res);
    };

    return (
        <ScrollView 
            style={styles.scrollView} 
            contentContainerStyle={styles.scrollContentContainer}
            showsVerticalScrollIndicator={false}
        >
            {/* User Input Field */}
            <TextInput
                placeholder="Gebruiker"
                value={user}
                onChangeText={setUser}
                style={styles.input}
                placeholderTextColor="#A0A0A0"
            />

            {/* Display for the Command (Numpad input) */}
            <View style={styles.commandDisplayContainer}>
                <Text style={styles.commandDisplayText}>Commando: {command || 'Geen commando'}</Text>
                <TouchableOpacity onPress={handleClearCommand} style={styles.clearButton}>
                    <Text style={styles.clearButtonText}>Clear</Text>
                </TouchableOpacity>
            </View>

            {/* Numpad Grid */}
            <View style={styles.numpadGrid}>
                {/* Row 1: 1, 2, 3 */}
                <View style={styles.numpadRow}>
                    <NumpadButton num="1" onPress={handleNumberPress} />
                    <NumpadButton num="2" onPress={handleNumberPress} />
                    <NumpadButton num="3" onPress={handleNumberPress} />
                </View>
                {/* Row 2: 4, 5, 6 */}
                <View style={styles.numpadRow}>
                    <NumpadButton num="4" onPress={handleNumberPress} />
                    <NumpadButton num="5" onPress={handleNumberPress} />
                    <NumpadButton num="6" onPress={handleNumberPress} />
                </View>
                {/* Row 3: 7, 8, 9 */}
                <View style={styles.numpadRow}>
                    <NumpadButton num="7" onPress={handleNumberPress} />
                    <NumpadButton num="8" onPress={handleNumberPress} />
                    <NumpadButton num="9" onPress={handleNumberPress} />
                </View>
                {/* Row 4: 0 (centered and wider) */}
                <View style={styles.numpadZeroRow}> {/* Specific row for 0 to center it */}
                    <TouchableOpacity
                        style={styles.numpadButtonZero} // Special style for the 0 button
                        onPress={() => handleNumberPress('0')}
                    >
                        <Text style={styles.numpadButtonText}>0</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Submit Button */}
            <View style={styles.submitButtonContainer}>
                <Button title="Verstuur commando" onPress={handleSubmit} color="#4CAF50" />
            </View>

            {/* Response Display */}
            {response && (
                <View style={styles.responseContainer}>
                    <Text style={styles.responseText}>Respons: {JSON.stringify(response, null, 2)}</Text>
                </View>
            )}
        </ScrollView>
    );
}

const BUTTON_SIZE = 80;
const BUTTON_MARGIN = 10;

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#D0E8B0',
    },
    scrollContentContainer: {
        padding: 20,
        alignItems: 'center',
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#5A7D3D',
        borderWidth: 2,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
        backgroundColor: '#F0EAC3',
        fontSize: 16,
        color: '#2E4600',
    },
    commandDisplayContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: '#B2CDA8',
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#4F772D',
    },
    commandDisplayText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#355E3B',
    },
    clearButton: {
        backgroundColor: '#E85D04',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 8,
    },
    clearButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 14,
    },
    numpadGrid: {
        width: (BUTTON_SIZE * 3) + (BUTTON_MARGIN * 2),
        marginBottom: 20,
        alignSelf: 'center',
    },
    numpadRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: BUTTON_MARGIN,
    },
    numpadZeroRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: BUTTON_MARGIN,
    },
    numpadButton: {
        width: BUTTON_SIZE,
        height: 60,
        backgroundColor: '#4F772D',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
    },
    numpadButtonZero: {
        width: (BUTTON_SIZE * 2) + BUTTON_MARGIN,
        height: 60,
        backgroundColor: '#4F772D',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
    },
    numpadButtonText: {
        color: '#DFF6D8',
        fontSize: 24,
        fontWeight: 'bold',
    },
    submitButtonContainer: {
        width: '100%',
        marginTop: 10,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#588157',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
    },
    responseContainer: {
        width: '100%',
        marginTop: 20,
        padding: 15,
        backgroundColor: '#E0F2D0',
        borderColor: '#8FB996',
        borderWidth: 1.5,
        borderRadius: 10,
    },
    responseText: {
        fontSize: 14,
        color: '#2E4600',
    },
});
