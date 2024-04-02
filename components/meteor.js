import { StyleSheet, Text, View } from 'react-native';

export default function Meteor({data}) {
  return (
    <View style={[styles.container, data.is_potentially_hazardous_asteroid ? styles.harmless : styles.dangerous]}>
      <Text style={styles.header}>{data.name}</Text>
      <Text style={styles.text}>Diameter: {data.estimated_diameter.meters.estimated_diameter_max} m</Text>
      <Text style={styles.text}>
        Speed: {parseFloat(data.close_approach_data[0].relative_velocity.kilometers_per_hour).toFixed(2)} km/h
      </Text>
      <Text style={styles.text}>
        Distance to Earth: {parseFloat(data.close_approach_data[0].miss_distance.astronomical).toFixed(2)} ua
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderRadius: 5,
    backgroundColor: '#EB9B65',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dangerous: {
    backgroundColor: '#60EB52'
  },
  harmless: {
    backgroundColor: 'red'
  },
  header: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  text: {
    color: 'white',
    marginTop: 2,
    fontSize: 15
  }
});