import React, { useState } from 'react';
import { StyleSheet, View, Button, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {
  const API_URL = "https://www.mapquestapi.com/geocoding/v1/address?key=5JlmPjFwYeTjG7y3Wr4y9grpq9J9XHbY"
  const [address, setAddress] = useState('');
  const [region, setRegion] = useState({
    latitude: 60.2,
    longitude: 24.934,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  });

  const showAddress = () => {
    if (address) {
      fetch(`${API_URL}&location=${address}`)
      .then(response => response.json())
      .then(responseData => {
        setRegion({
          ...region,
          latitude: responseData.results[0].locations[0].latLng.lat,
          longitude: responseData.results[0].locations[0].latLng.lng
        });
      });
    }
  }

  return (
    <View style={styles.container}>
      <MapView 
        style={{ flex: 5 }}
        region={region}>
        <Marker 
        coordinate={{
          latitude: region.latitude, longitude: region.longitude
          }}
        />
      </MapView>
      <TextInput 
        placeholder='Type address'
        style={{ height: 40, fontSize: 18 }}
        onChangeText={address => setAddress(address)}
      />
      <Button title="Show" onPress={showAddress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
