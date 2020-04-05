import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Button,
    TouchableOpacity
} from 'react-native'
import {
    useQuery
} from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const GET_MOVIES = gql`
  {
    movies {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

const GET_DETAIL = gql`
query findOne( $id: String){
    findMovieById( _id: $id)
     {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;


export default function Movies({ navigation }) {
    const { loading, error, data } = useQuery(GET_MOVIES)
    if (loading) return <Text>Processing, please wait...</Text>
    if (error) return <Text>Something went wrong</Text>

    const pressHandling = (movie) => {
        navigation.navigate('MovieDetail', {
            detail: movie
        })
    }
    const navigationHandler = () => {
        navigation.navigate('AddMovie')
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <Button
                    title="Add New Movie"
                    onPress={() => {
                        navigationHandler()
                    }} />
                {
                    data.movies.map(movie => (
                        <View key={movie._id} style={{ padding: 15, borderWidth: 0.5 }}>
                            <Text style={{
                                fontSize: 30,
                                textAlign: 'center'
                            }}>{movie.title}</Text>
                            <Text onPress={() => {
                                pressHandling(movie)
                            }}
                                style={{
                                    fontSize: 10,
                                    color: '#888',
                                    textAlign: 'center'
                                }}>
                                more details
                                </Text>
                            <TouchableOpacity onPress={() => {
                                pressHandling(movie)
                            }}>
                                <Image
                                    style={{ width: 300, height: 500 }}
                                    source={{ uri: movie.poster_path }}
                                ></Image>
                            </TouchableOpacity>
                        </View>
                    ))
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
