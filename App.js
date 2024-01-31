import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PopularMovies from './src/screens/PopularMovies';
import SearchMovie from './src/screens/SearchMovie';
import MovieDetail from './src/screens/MovieDetail';
 
const Stack = createStackNavigator();
 
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Popular Movies" component={PopularMovies} />
        <Stack.Screen name="Search" component={SearchMovie} />
        <Stack.Screen name="MovieDetails" component={MovieDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
 
export default App;