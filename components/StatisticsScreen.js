import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, View, Text } from 'react-native';
import { fetchStatistics } from '../utils/api'; 

export default function StatisticsScreen() {
    const [stats, setStats] = useState(null); 
    const navigation = useNavigation();

    useEffect(() => {
        const loadStats = async () => {
            const data = await fetchStatistics();
            setStats(data);
        };
        loadStats();
    }, []);

    return (
        <ScrollView style={{ padding: 20 }}>
            {Array.isArray(stats) ? (
                stats.map((item, index) => {
                    const commands = item.commands || {};
                    const cities = item.cities || [];

                    return (
                        <View key={index} style={{ marginBottom: 20 }}>
                            <Text style={{ fontWeight: 'bold' }}>📅 {item.date}</Text>

                            {Object.entries(commands).map(([cmd, count]) => (
                                <View
                                    key={cmd}
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        paddingVertical: 5,
                                    }}
                                >
                                    <Text>{commandoNaam(cmd)}: {count} keer</Text>
                                    <Ionicons
                                        name="information-circle-outline"
                                        size={24}
                                        color="#007AFF"
                                        onPress={() =>
                                            navigation.navigate('CommandoDetails', {
                                                command: commandoNaam(cmd),
                                                count,
                                                date: item.date,
                                                cmdNumber: cmd
                                            })
                                        }


                                    />
                                </View>
                            ))}
                        </View>
                    );
                })
            ) : (
                <Text>Statistieken worden geladen...</Text>
            )}
        </ScrollView>
    );
}

function commandoNaam(nr) {
    const map = {
        "0": "Uitgezet",
        "1": "Ogen knipperen",
        "2": "Knight Rider",
        "3": "Hoofd draaien",
        "4": "Armpjes op en neer",
        "5": "Vooruit",
        "6": "Achteruit",
        "7": "Linksom",
        "8": "Rechtsom",
        "9": "Rickroll"
    };
    return map[nr] || `Commando ${nr}`;
}