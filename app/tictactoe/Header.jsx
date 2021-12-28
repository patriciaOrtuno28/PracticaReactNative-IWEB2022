import React from 'react';
import {Text, StyleSheet} from 'react-native';

export default function Header(props) {
    return (
      <Text style={styles.title}>Turn: {props.text}</Text>
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
