
import { Marker } from 'react-native-maps';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { View, StyleSheet } from 'react-native';

const floodedAreas = [
  { "latitude": -23.550627913419614, "longitude": -46.63331374526024 },
  { "latitude": -23.551870645000676, "longitude": -46.632745576464025 },
  { "latitude": -23.551328537649713, "longitude": -46.634147676847725 }
]

const FloodedAreas = () => {
  return floodedAreas?.map((area, index) => (
    <Marker coordinate={area} key={index}>
      <View style={styles.container}>
        <MaterialIcons name="waves" size={19} color="white" />
      </View>
    </Marker>
  )
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#007EA4',
    padding: 6,
    borderRadius: '100%',
  }
});


export default FloodedAreas;