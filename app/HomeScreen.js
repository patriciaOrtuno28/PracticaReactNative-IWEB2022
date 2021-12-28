import { StyleSheet, Text, View } from 'react-native';

export default function Home () {
  return (
    <View style={{alignItems: 'center', padding: 35}}>
      <Text style={styles.title}>¡Bienvenido!</Text>
      <Text style={styles.subtitle}>En esta página podrás jugar a diferentes minijuegos.</Text>
      <Text style={styles.paragraph}>Haz click en la pestaña del juego al que quieras jugar.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    textAlign: 'center',
    paddingBottom: 20
  },
  subtitle: {
    fontSize: 25,
    textAlign: 'center',
    paddingBottom: 20
  },
  paragraph: {
    fontSize: 15,
    textAlign: 'center'
  }
})