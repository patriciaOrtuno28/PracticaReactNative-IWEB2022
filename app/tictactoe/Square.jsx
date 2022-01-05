import React from 'react';
import {TouchableHighlight, Text, StyleSheet} from 'react-native';

export default function Square(props) {
  
  function squareClick() {
    if(props.value === "-") {
      props.boardClick(props.rowIndex, props.columnIndex);
    }
  }

  return(
    <TouchableHighlight 
      style={styles.square} 
      onPress={squareClick} 
      disabled={props.value != '-'}
      underlayColor={'#f5f5f5'}>
      <Text style={styles.squareText}>
        {props.value}
      </Text> 
    </TouchableHighlight>
  );
  
}

const styles = StyleSheet.create({
  square: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'white',
    margin: 2,
    borderRadius: 8,
    shadowColor: '#192231',
    shadowRadius: 4,
    shadowOffset: {width: 4, height: 4},
    elevation: 4
  },
  squareText: {
    fontSize: 60,
    color: '#192231'
  }

});