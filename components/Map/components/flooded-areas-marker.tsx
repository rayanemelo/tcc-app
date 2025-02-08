
import { Marker } from 'react-native-maps';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { View, StyleSheet } from 'react-native';

const floodedAreas = [
  { "latitude": -29.642781895977247, "longitude": -50.76904580046604 },
  { "latitude": -29.662377218010036, "longitude": -50.76924130514626 },
  { "latitude": -29.638590493759015, "longitude": -50.795634436975625 }
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