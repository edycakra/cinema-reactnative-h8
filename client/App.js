import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
const Stack = createStackNavigator()

import Home from './src/views/Home'
import Movies from './src/views/Movies'
import MovieDetail from './src/components/MovieDetail'
import AddMovie from './src/components/AddMovie'
import EditMovie from './src/components/EditMovie'
import Series from './src/views/Series'
import SeriesDetail from './src/components/SeriesDetail'
import AddSeries from './src/components/AddSeries'
import EditSeries from './src/components/EditSeries'

const client = new ApolloClient({
  uri: 'http://localhost:4000'
})

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Movies" component={Movies} />
          <Stack.Screen name="MovieDetail" component={MovieDetail} />
          <Stack.Screen name="AddMovie" component={AddMovie} />
          <Stack.Screen name="EditMovie" component={EditMovie} />
          <Stack.Screen name="Series" component={Series} />
          <Stack.Screen name="SeriesDetail" component={SeriesDetail} />
          <Stack.Screen name="AddSeries" component={AddSeries} />
          <Stack.Screen name="EditSeries" component={EditSeries} />

        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
