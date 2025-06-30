import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import CommandForm from '../components/CommandForm';
import DetailsModal from '../components/DetailsModal';

export default function HomeScreen() {
    const [showModal, setShowModal] = useState(false);

    return (
        <View style={{ flex: 1, paddingTop: 50 }}>
            <CommandForm />
            <Button title="Info (i)" onPress={() => setShowModal(true)} />
            <DetailsModal visible={showModal} onClose={() => setShowModal(false)} />
        </View>
    );
}
