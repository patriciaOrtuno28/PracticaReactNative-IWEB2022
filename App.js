import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeScreen from './app/HomeScreen';
import TicTacToeScreen from './app/tictactoe/TicTacToeScreen';
import QuizScreen from './app/quiz/QuizScreen';

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="TicTacToe" component={TicTacToeScreen} />
          <Tab.Screen name="Quiz" component={QuizScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
