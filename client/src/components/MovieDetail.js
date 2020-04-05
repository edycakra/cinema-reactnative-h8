import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    Button
} from 'react-native'
import { useMutation } from '@apollo/react-hooks'
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

const DELETE_MOVIE = gql`
mutation deleteAMovie(
  $_id:String){
  deleteMovies( 
    _id: $_id
  )
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

export default function MovieDetail({ route, navigation }) {
    const { detail } = route.params
    const [deleteMovies] = useMutation(DELETE_MOVIE, {
        update(cache, { data: { deleteMovies } }) {
            const { movies } = cache.readQuery({ query: GET_MOVIES })
            cache.writeQuery({
                query: GET_MOVIES,
                data: { movies: movies.filter(movie => movie._id !== detail._id) }
            })
        }
    })
    const deleteHandler = (_id) => {
        deleteMovies({
            variables: {
                _id
            }
        })
        navigation.navigate('Movies')
    }


    const navigationHandler = () => {
        navigation.navigate('EditMovie', {
            oldDetail: detail
        })
    }

    return (
        <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 30 }}>{detail.title}</Text>
            <Image
                style={{ width: 200, height: 300 }}
                source={{ uri: detail.poster_path }}
            ></Image>
            <Text style={{ fontSize: 20, textAlign: 'center' }}>Overview:</Text>
            <Text style={{ fontSize: 10, textAlign: 'center' }}>{detail.overview}</Text>

            <Text style={{ fontSize: 20 }}>Rating:</Text>
            <Text style={{ fontSize: 10 }}>{detail.popularity}</Text>
            <Text style={{ fontSize: 20 }}>Category:</Text>
            <View>
                {
                    detail.tags.map((el, i) => {
                        return (<View key={i}><Text style={{ fontSize: 10 }}>{el}</Text></View>)
                    })
                }
            </View>
            <View>
                <Button
                    title="Edit Movie"
                    onPress={() => {
                        navigationHandler()
                    }}
                />
                <Button
                    title="Delete Movie"
                    color="#666768"
                    onPress={() => {
                        deleteHandler(detail._id)
                    }}
                />
            </View>

        </View >
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