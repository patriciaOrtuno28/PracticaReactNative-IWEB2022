import React from 'react';
import {TouchableHighlight, Text, StyleSheet} from 'react-native';

export default function Reset(props) {
  function click() {
    props.resetClick();
  }

  return(
    <TouchableHighlight onPress={click} underlayColor={'#494E6B'}>
      <Text style={styles.button}>RESET</Text>
    </TouchableHighlight>
  );
    
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'white',
    color: '#192231',
    fontSize: 25,
    textAlign: 'center',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#192231',
    shadowRadius: 4,
    shadowOffset: {width: 4, height: 4},
    elevation: 4
  }

});