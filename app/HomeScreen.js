import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { LangContext } from './LangContext';

export default function HomeScreen (props) {
  return (
    <LangContext.Consumer>
      {lang =>
        <View style={styles.container}>
          <Text style={styles.title}>{lang.home_welcome}</Text>
          <Text style={styles.subtitle}>{lang.home_subtitle}</Text>
          <Text style={styles.paragraph}>{lang.home_text}</Text>
          <TouchableHighlight onPress={props.toggleLang} underlayColor={'#494E6B'} style={styles.btn}>
            <Text style={styles.button}>{lang.lang}</Text>
          </TouchableHighlight>
        </View>
      }
    </LangContext.Consumer>
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
  },
  button: {
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'white',
    color: '#192231',
    fontSize: 15,
    textAlign: 'center',
    padding: 10,
    shadowColor: '#192231',
    shadowRadius: 4,
    shadowOffset: {width: 4, height: 4},
    elevation: 4
  },
  btn: {
    paddingHorizontal: "2%",
    paddingTop: "75%",
    paddingLeft: "50%"
  }
})