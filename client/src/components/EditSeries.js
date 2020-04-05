import React, { useState } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const EDIT_SERIES = gql`
mutation editASeries(
  $_id: String
  $title: String, 
  $overview: String, 
  $poster_path: String, 
  $popularity: Float, 
  $tags:[String]){
  editSeries( 
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

export default function EditSeries({ route, navigation }) {
    const { oldDetail } = route.params
    const _id = oldDetail._id
    const [title, onChangeTitle] = useState(oldDetail.title)
    const [overview, onChangeOverview] = useState(oldDetail.overview)
    const [poster_path, onChangePoster] = useState(oldDetail.poster_path)
    const [popularity, onChangePopularity] = useState(oldDetail.popularity)
    const [tags, onChangeTags] = useState(oldDetail.tags)
    const [editSeries] = useMutation(EDIT_SERIES)

    const submitHandler = () => {
        editSeries({
            variables: {
                _id,
                title,
                overview,
                poster_path,
                popularity,
                tags
            }
        })
        navigation.navigate('Series')
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
            <Button title="continue"
                color="#32CD32"
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