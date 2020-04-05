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

const ADD_MOVIE = gql`
mutation addNewMovie(
  $title:String, 
  $overview: String, 
  $poster_path: String, 
  $popularity: Float, 
  $tags:[String]){
  addMovies( 
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

export default function AddMovie({ navigation }) {
    const [title, onChangeTitle] = useState('')
    const [overview, onChangeOverview] = useState('')
    const [poster_path, onChangePoster] = useState('')
    const [popularity, onChangePopularity] = useState(null)
    const [tags, onChangeTags] = useState([])
    const [addMovies] = useMutation(ADD_MOVIE, {
        update(cache, { data: { addMovies } }) {
            const { movies } = cache.readQuery({ query: GET_MOVIES })
            cache.writeQuery({
                query: GET_MOVIES,
                data: { movies: movies.concat([addMovies]) }
            })
        }
    })

    const submitHandler = () => {
        addMovies({
            variables: {
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
        <View>
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
            <TextInput style={styles.inputContainer}
                placeholder="popularity"
                onChangeText={input => onChangePopularity(parseFloat(input))}
                value={popularity}
            />
            <TextInput style={styles.inputContainer}
                placeholder="tag1,tag2,tag3"
                onChangeText={input => onChangeTags(input.split(','))}
                value={tags.join(',')}
            />
            <Button title="submit new movie"
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