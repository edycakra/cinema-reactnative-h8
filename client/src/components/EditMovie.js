import React, { useState } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
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

const EDIT_MOVIE = gql`
mutation editAMovie(
  $_id: String
  $title: String, 
  $overview: String, 
  $poster_path: String, 
  $popularity: Float, 
  $tags:[String]){
  editMovies( 
    _id: $_id
    title: $title,
    overview: $overview,
    poster_path: $poster_path,
    popularity: $popularity,
    tags: $tags
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

export default function EditMovie({ route, navigation }) {
    const { oldDetail } = route.params
    const _id = oldDetail._id
    const [title, onChangeTitle] = useState(oldDetail.title)
    const [overview, onChangeOverview] = useState(oldDetail.overview)
    const [poster_path, onChangePoster] = useState(oldDetail.poster_path)
    const [popularity, onChangePopularity] = useState(parseFloat(oldDetail.popularity))
    const [tags, onChangeTags] = useState(oldDetail.tags)
    const [editMovies] = useMutation(EDIT_MOVIE, {
        update(cache, { data: { editMovies } }) {
            const { movies } = cache.readQuery({ query: GET_MOVIES })
            cache.writeQuery({
                query: GET_MOVIES,
                data: { movies: movies.map(movie => (movie._id === _id) ? editMovies : movie) }
            })
        }
    })

    const submitHandler = () => {
        editMovies({
            variables: {
                _id,
                title,
                overview,
                poster_path,
                popularity,
                tags
            }
        })
        navigation.navigate('Movies')
    }

    return (
        <View stle={{}}>
            <TextInput style={styles.inputContainer}
                placeholder="title"
                onChangeText={input => onChangeTitle(input)}
                value={title}
            />
            <TextInput style={styles.inputContainer}
                placeholder="overview"
                onChangeText={input => onChangeOverview(input)}
                value={overview}
            />
            <TextInput style={styles.inputContainer}
                placeholder="poster"
                onChangeText={input => onChangePoster(input)}
                value={poster_path}
            />
            <TextInput
                style={styles.inputContainer}
                keyboardType="number-pad"
                placeholder="popularity"
                onChangeText={input => onChangePopularity(parseFloat(input))}
                value={(popularity)}
            />
            <TextInput style={styles.inputContainer}
                placeholder="tag1,tag2,tag3"
                onChangeText={input => onChangeTags(input.split(','))}
                value={tags.join(',')}
            />
            <Button title="continue"
                onPress={() => submitHandler()} />
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        height: 30,
        backgroundColor: '#fff',
        borderColor: '#999',
        borderWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
});