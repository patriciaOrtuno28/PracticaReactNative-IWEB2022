import { Image, View, TextInput, Text, TouchableHighlight, StyleSheet, ScrollView } from 'react-native';
import  React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Game (props) {
    /*
    * Hacemos un array del tamaño de los quizzes que haya y lo llenamos de false.
    * En el momento en que se acierte un quiz, se cambia el valor de su posición a true.
    */
    let nullArray = new Array(props.nQuizzes).fill(false);
    const [answers, setAnswers] = useState(nullArray);
    var localScore = 0;
    const textInput = React.useRef(null);

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
        textInput.current.clear();
    }

    // Botón anterior
    const next = () => {
        props.setCurrentQuiz(props.currentQuiz  + 1);
        textInput.current.clear();
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

    // Botón save
    const save = async () => {
        try {
           await AsyncStorage.setItem('@P5_2021_IWEB:quiz', JSON.stringify(props.quizzes), error =>{
            if(error) {
                alert(error);
            } else {
                alert("Current questions stored.");
            }
           });
        } catch (error) {
            alert(error); 
        }
    }

    // Botón load
    const load = async () => {
        try{
            var quizzestorage;
            await AsyncStorage.getItem('@P5_2021_IWEB:quiz', (err, value) => {
                if (err) {
                    alert(err);
                } else {
                    quizzestorage = JSON.parse(value);   
                }
            });
            if(quizzestorage === null) {
                alert("No questions stored.");
            } else {
                setAnswers(nullArray);
                props.setScore(0);
                props.setFinished(false);
                props.setCurrentQuiz(0);
                props.setQuizzes(quizzestorage);
                alert("The questions have been successfully loaded.");
            }
        } catch(error) {
            alert(error);
        }
    }

    // Botón remove
    const remove = async() => {
        try {
            await AsyncStorage.removeItem('@P5_2021_IWEB:quiz', (err) =>{
                if(err) {
                    alert(err);
                } else {
                    alert("The questions have been successfully removed.");
                }
            });
        } catch (error) {
            alert(error); 
        }
    }

    // Botón volver a jugar
    const playAgain = () => {
        setAnswers(nullArray);
        props.resetGame();
    }

    // Mostramos una pantalla distinta según si el juego ha terminado o está en marcha
    // Poner número máximo de líneas para la pregunta del quiz para evitar una mala jugabilidad
    if (!props.finished) {
        return (
            <ScrollView style={styles.container}>
                <Image resizeMode='contain'
                style={{flex:1, aspectRatio: 1.5}}
                source={{uri: props.quiz.attachment ? props.quiz.attachment.url : 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'}}/>
                <Text style={styles.subtitle}>Question {props.quiz.id}</Text>
                <Text style={styles.title} numberOfLines={10}>{props.quiz.question}</Text>
                <TextInput 
                    placeholder="Type your answer here..." 
                    onChangeText={checkValid} 
                    style={styles.input}
                    selectionColor={'#192231'}
                    ref={textInput}/>
                <View style = {styles.containerBtnsGlobal}>
                    <View style={styles.containerBtnsRow}>
                        <TouchableHighlight onPress={submit} underlayColor={'#494E6B'} style={styles.btn}>
                            <Text style={styles.button}>Submit</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={before} disabled={props.currentQuiz===0} underlayColor={'#494E6B'} style={styles.btn}>
                            <Text style={props.currentQuiz===0 ? styles.disabled : styles.button}>Previous</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={next} disabled={props.currentQuiz===props.nQuizzes-1} underlayColor={'#494E6B'} style={styles.btn}>
                            <Text style={props.currentQuiz===props.nQuizzes-1 ? styles.disabled : styles.button}>Next</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.containerBtnsRow}>
                        <TouchableHighlight onPress={save} underlayColor={'#494E6B'} style={styles.btn}>
                            <Text style={styles.button}>Save</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={load} underlayColor={'#494E6B'} style={styles.btn}>
                            <Text style={styles.button}>Load</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={remove} underlayColor={'#494E6B'} style={styles.btn}>
                            <Text style={styles.button}>Remove</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </ScrollView>
        );
    } else {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Score: {props.score}</Text>
                <Text style={styles.subtitle}>{(parseInt(props.score)/parseInt(props.nQuizzes))*100}% correct</Text>
                <TouchableHighlight onPress={playAgain}><Text style={styles.button}>Play Again</Text></TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      padding: 20
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
        paddingVertical: 25,
        color: 'white'
    },
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
    },
    input: {
        borderColor: 'white',
        backgroundColor: 'white',
        color: '#192231',
        width: "100%",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        fontSize: 15,
        marginVertical: 20
    },
    containerBtnsGlobal: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    containerBtnsRow: {
        flex: 1,
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingBottom: Platform.OS === 'android' ? 35 : 0
    },
    btn: {
        paddingHorizontal: "2%"
    },
    disabled: {
        borderWidth: 1,
        borderColor: 'rgba(223, 220, 221, 0.6)',
        backgroundColor: 'rgba(223, 220, 221, 0.6)',
        color: 'rgba(26, 26, 26, 0.6)',
        fontSize: 25,
        textAlign: 'center',
        padding: 10,
        borderRadius: 8,
        shadowColor: '#192231',
        shadowRadius: 4,
        shadowOffset: {width: 4, height: 4},
        elevation: 4
    }
})