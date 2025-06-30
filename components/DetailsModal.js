import React from 'react';
import { Modal, View, Text, Button } from 'react-native';

export default function DetailsModal({ visible, onClose }) {
    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={{ flex: 1, backgroundColor: '#000000aa', justifyContent: 'center' }}>
                <View style={{ backgroundColor: '#fff', margin: 20, padding: 20, borderRadius: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Details:</Text>
                    <Text>- Dit is extra informatie over het commando.</Text>
                    <Button title="Sluiten" onPress={onClose} />
                </View>
            </View>
        </Modal>
    );
}
