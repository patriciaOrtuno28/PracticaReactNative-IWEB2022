import { Image, View, TextInput, Text, TouchableHighlight } from 'react-native';
import  {useState} from 'react';

export default function Game (props) {
    /*
    * Hacemos un array del tamaño de los quizzes que haya y lo llenamos de false.
    * En el momento en que se acierte un quiz, se cambia el valor de su posición a true.
    */
    let nullArray = new Array(props.nQuizzes).fill(false);
    const [answers, setAnswers] = useState(nullArray);
    var localScore = 0;

    // Comprobar respuesta a la pregunta del Quiz válida
    const checkValid = (text) => {
        if (text.toLowerCase() === props.quiz.answer.toLowerCase()){
            answers[props.currentQuiz] = true;
            setAnswers(answers);
        } else {
            answers[props.currentQuiz] = false;
            setAnswers(answers);
        }
    }

    // Botón siguiente
    const before = () => {
        props.setCurrentQuiz(props.currentQuiz  - 1);
    }

    // Botón anterior
    const next = () => {
        props.setCurrentQuiz(props.currentQuiz  + 1);
    }

    // Botón enviar
    const submit = () => {
        answers.forEach(function(element) {
            if (element) {
                localScore += 1;
            }
        });
        props.setScore(localScore);
        props.setFinished(true);
    }

    // Botón volver a jugar
    const playAgain = () => {
        setAnswers(nullArray);
        props.resetGame();
    }

    // Mostramos una pantalla distinta según si el juego ha terminado o está en marcha
    if (!props.finished) {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <Image resizeMode='contain'
                style={{flex:1}}
                source={{uri: props.quiz.attachment ? props.quiz.attachment.url : 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'}}/>
                <Text>Question {props.quiz.id}</Text>
                <Text>{props.quiz.question}</Text>
                <TextInput placeholder="Type your answer here" onChangeText={checkValid}/>
                <View style={{
                    flex: 2,
                    flexDirection: 'row', 
                    alignItems: 'center'
                }}>
                    <TouchableHighlight onPress={submit}><Text>Submit</Text></TouchableHighlight>
                    <TouchableHighlight onPress={before} disabled={props.currentQuiz===0}><Text>Previous</Text></TouchableHighlight>
                    <TouchableHighlight onPress={next} disabled={props.currentQuiz===props.nQuizzes-1}><Text>Next</Text></TouchableHighlight>
                </View>
            </View>)
    } else {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <Text>Score: {props.score}</Text>
                <Text>{(parseInt(props.score)/parseInt(props.nQuizzes))*100}% {lang.game_correct}</Text>
                <TouchableHighlight onPress={playAgain}>Play Again</TouchableHighlight>
            </View>)
    }
}