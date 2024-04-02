import { StyleSheet, View, Text, ScrollView, ImageBackground } from 'react-native';
import Meteor from './components/meteor';
import { useEffect, useState } from 'react';

export default function App() {
  const image = { uri: 
    "https://m.espacepourlavie.ca/sites/espacepourlavie.ca/files/styles/gal-photo-large/public/meteor_bolide_0.jpg?itok=A9EMkAM7" 
  };
  const [meteors, setMeteors] = useState(null)
  const fetchMeteors = async () => {
    const today = new Date()
    const start_date = `${today.getFullYear()}-0${today.getMonth()}-0${today.getDate()}`
    const end_date = `${today.getFullYear()}-0${today.getMonth()}-0${today.getDate()}`
    const response = 
      await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${start_date}&end_date=${end_date}&api_key=DEMO_KEY`)
    const meteorsResponse = await response.json()
    setMeteors(meteorsResponse.near_earth_objects[end_date])
  }
  useEffect(() => { fetchMeteors() }, [])
  if(!meteors) {
    return (
      <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Meteor App</Text>
          </View>
        <ImageBackground source={image} style={styles.image}>
            <View>
              <Text style={styles.header}>Cargando...</Text>
            </View>
          </ImageBackground>
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Meteor App</Text>
          </View>
          <ScrollView style={styles.meteor}>
            {meteors.map(item => {
              return <Meteor key={item.id} data={item}></Meteor>
            })}
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7465EB',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    backgroundColor: '#7465EB',
    padding: 20,
  },
  header: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
    alignItems: 'center',
    marginTop: 20
  }
});
