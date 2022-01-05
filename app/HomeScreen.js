import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen () {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.subtitle}>In this webpage you will be able to play various minigames.</Text>
      <Text style={styles.paragraph}>Click on the tab of the game you want to play!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 35,
    backgroundColor: '#494E6B',
    height: '100%'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 25,
    color: 'white',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 10,
    textShadowColor: '#192231',
  },
  subtitle: {
    fontSize: 25,
    textAlign: 'center',
    paddingBottom: 25,
    color: 'white'
  },
  paragraph: {
    fontSize: 12,
    textAlign: 'center',
    color: 'white'
  }
})