import {View, Text, StyleSheet} from 'react-native';
import { LangContext } from '../LangContext';

import React, { useState, useEffect } from 'react';
import Header from './Header.jsx';
import Board from './Board.jsx';
import Reset from './Reset.jsx';

const PLAYERX = "Player 1 - Xs";
const PLAYER0 = "Player 2 - 0s";

export default function TicTacToeScreen () {
  const [turn, setTurn] = useState(PLAYERX);
  const [moves, setMoves] = useState(0);
  const [values, setValues] = useState([
    ['-', '-', '-'],
    ['-', '-', '-'],
    ['-', '-', '-']
    ]);

  useEffect(() => {
    // Update the document title using the browser API
    //document.title = `Turn of ${turn}`;
  });

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://myjson.dit.upm.es/api/bins/ccr5");
      const myjson = await res.json();
      console.log(myjson);
      setTurn(myjson.turn);
      setMoves(myjson.moves);
      setValues(myjson.values);
    }

    fetchData();
  }, []);

  function appClick(rowNumber, columnNumber) {
      let valuesCopy = JSON.parse(JSON.stringify(values));
      let newMovement = turn === PLAYERX ? 'X' : '0';
      valuesCopy[rowNumber][columnNumber] = newMovement;
      setTurn(turn === PLAYERX ? PLAYER0 : PLAYERX);
      setValues(valuesCopy);
      setMoves(moves + 1); 
  }

  function resetClick(){
    setTurn(PLAYERX);
    setMoves(0);
    setValues([
      ['-', '-', '-'],
      ['-', '-', '-'],
      ['-', '-', '-']
    ]);
  }

  return (
    <LangContext.Consumer>
      {lang =>
        <View style={styles.container}>
          <Header turn={turn}/>
          <Board values={values}  appClick={appClick}/>
          <Text style={styles.subtitle}>{lang.ttt_nMoves}{moves}</Text>
          <Reset resetClick={resetClick}></Reset>
        </View>
      }
    </LangContext.Consumer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#494E6B',
    height: '100%',
    width: '100%'
  },
  subtitle: {
    fontSize: 25,
    textAlign: 'center',
    paddingVertical: 25,
    color: 'white'
  }
})