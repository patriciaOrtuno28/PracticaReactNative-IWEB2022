import Game from "./Game";
import axios from "axios";
import { Image, View } from 'react-native';
import  {useState} from 'react';
import  {useEffect} from 'react';
import React from "react";

export default function Quiz() {  
  // Inicialización de parámetros como Hooks
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [quizzesArray, setQuizzes] = useState([]);

  // Usamos axios por su bajo peso, rapidez en las peticiones y soporte de plataformas  
  const consultaAPI = async () => {
    await axios({
      method: 'GET',
      url: 'https://core.dit.upm.es/api/quizzes/random10wa?token=0a72635966eb3864d6fe'
    }).then(res => {    // Es una promesa -> .then
      setQuizzes(res.data);
    }).catch(err => console.log(err))
  }

  useEffect(() => {
    consultaAPI();
  }, []);

  const resetGame = () => {
    setScore(0);
    setFinished(false);
    setCurrentQuiz(0);
    consultaAPI();
  }

  // Visualización
  return(
    <View>
      {
      quizzesArray.length >= 1 ? 
      <View>
        <Game quizzes={quizzesArray} quiz={quizzesArray[currentQuiz]} currentQuiz={currentQuiz} setCurrentQuiz={setCurrentQuiz} nQuizzes={quizzesArray.length} setScore={setScore} score={score} setFinished={setFinished} finished={finished} resetGame={resetGame}/>
      </View>
      : <View style={{flex:1}}>
        <Image resizeMode='contain'
        style={{flex:1}}
        source={{uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif"}}/>
      </View>
    }
    </View>
  );
}