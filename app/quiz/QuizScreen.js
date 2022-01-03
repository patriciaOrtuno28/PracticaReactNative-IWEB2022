import Game from "./Game";
import axios from "axios";
import { View, StyleSheet, Platform } from 'react-native';
import  {useState} from 'react';
import  {useEffect} from 'react';
import React, {useRef} from "react";
import * as Progress from 'react-native-progress';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Quiz() {  
  // Inicialización de parámetros como Hooks
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [quizzesArray, setQuizzes] = useState([]);
  const componentMounted = useRef(true);

  // Usamos axios por su bajo peso, rapidez en las peticiones y soporte de plataformas  
  const consultaAPI = async () => {
    await axios({
      method: 'GET',
      url: 'https://core.dit.upm.es/api/quizzes/random10wa?token=0a72635966eb3864d6fe'
    }).then(res => {    // Es una promesa -> .then
      if(componentMounted.current) {
        setQuizzes(res.data);
      }
    }).catch(err => console.log(err))
  }

  useEffect(() => {
    consultaAPI();
    return () => {
      componentMounted.current = false;
    }
  }, []);

  const resetGame = () => {
    setScore(0);
    setFinished(false);
    setCurrentQuiz(0);
    consultaAPI();
  }

  // Visualización
  return(
    <View style={styles.container}>
      {
      quizzesArray.length >= 1 ? 
      <Game 
        quizzes={quizzesArray}
        setQuizzes={setQuizzes} 
        quiz={quizzesArray[currentQuiz]} 
        currentQuiz={currentQuiz} 
        setCurrentQuiz={setCurrentQuiz} 
        nQuizzes={quizzesArray.length} 
        setScore={setScore} score={score} 
        setFinished={setFinished} 
        finished={finished} 
        resetGame={resetGame}/>
      : <Progress.Bar indeterminate={true} width={200}/>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#494E6B'
  }
})