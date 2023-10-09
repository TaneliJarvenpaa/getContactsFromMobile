import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {
  const [allContacts, setAllContacts] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers]
      });

      if (data.length > 0) {
        setAllContacts(data);
        console.log(data);
      }
    }
  };

  const renderContact = ({ item }) => (
    <View style={styles.listItem}>
      <Text>{item.name}</Text>
      {item.phoneNumbers && item.phoneNumbers.length > 0 && (
        <Text>{item.phoneNumbers[0].number}</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Button title="Get contacts" onPress={getContacts} />
      <FlatList
        data={allContacts}
        renderItem={renderContact}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 5,
    width: '100%',
  },
});
