import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';

export default function CommandDetailsScreen({ route }) {
  const { command, count, date, cmdNumber } = route.params;

  const [rawCommands, setRawCommands] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCommands() {
      try {
        const response = await fetch('https://to.internus.info/api/monkeyalpha');
        const data = await response.json();
        setRawCommands(data);
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchCommands();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  if (!rawCommands) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Data kon niet worden geladen.</Text>
      </View>
    );
  }

  const filteredItems = rawCommands.filter(item => {
    if (!item?.command || !item?.timestamp) return false;

    if (String(item.command) !== String(cmdNumber)) return false;

    const itemDate = item.timestamp.split('T')[0];
    return itemDate === date;
  });

  const cities = filteredItems.map(item => item.city).filter(Boolean);
  const uniqueCities = [...new Set(cities)];

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{command}</Text>
      <Text style={{ fontSize: 16, marginBottom: 10 }}>
        Aantal keer uitgevoerd: {count}
      </Text>
      <Text style={{ fontSize: 14, marginBottom: 20, color: '#666' }}>
        Datum: {date}
      </Text>

      <Text style={{ fontWeight: 'bold' }}>📍 Steden:</Text>
      {uniqueCities.length > 0 ? (
        <FlatList
          data={uniqueCities}
          keyExtractor={(item, idx) => idx.toString()}
          renderItem={({ item }) => <Text style={{ fontSize: 16 }}>- {item}</Text>}
        />
      ) : (
        <Text>Geen steden gevonden.</Text>
      )}
    </View>
  );
}