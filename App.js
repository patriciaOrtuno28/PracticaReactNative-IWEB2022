import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeScreen from './app/HomeScreen';
import TicTacToeScreen from './app/tictactoe/TicTacToeScreen';
import QuizScreen from './app/quiz/QuizScreen';
import React, { Component } from 'react';
import { LangContext } from './app/LangContext';
import eng from "./app/en.json";
import esp from "./app/esp.json";

const Tab = createMaterialTopTabNavigator();

class App extends Component {
  state = {
    lang: esp,
  };

  toggleLang = () => {
    this.setState(state => ({
      lang: state.lang === eng ? esp : eng
    }))
  }

  render () {
    return (
      <LangContext.Provider value={this.state.lang}>
        <SafeAreaView style={{flex: 1}}>
          <NavigationContainer>
            <Tab.Navigator screenOptions={{
              tabBarIndicatorStyle: {
                borderColor: '#985E6D',
                borderBottomWidth: 4
              },
              tabBarLabelStyle: {
                fontSize: 10
              }
            }}>
              <Tab.Screen name={this.state.lang.menu_home}
                children={()=><HomeScreen toggleLang={this.toggleLang}/>} />
              <Tab.Screen name={this.state.lang.menu_ttt} component={TicTacToeScreen} />
              <Tab.Screen name={this.state.lang.menu_quiz} component={QuizScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </LangContext.Provider>
    );
  }
}

export default App;
