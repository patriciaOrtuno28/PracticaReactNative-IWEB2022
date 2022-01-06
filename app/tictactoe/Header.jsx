import React from 'react';
import {Text, StyleSheet} from 'react-native';
import { LangContext } from '../LangContext';

export default function Header(props) {
    return (
      <LangContext.Consumer>
        {lang =>
          <Text style={styles.title}>{lang.header_turn}{props.turn}</Text>
        }
      </LangContext.Consumer>
    );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 15,
    color: 'white',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 10,
    textShadowColor: '#192231',
  }
});
