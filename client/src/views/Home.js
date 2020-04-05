import React from 'react'
import {
    StyleSheet,
    View,
    Button,
    ImageBackground,
    Text,
    Image
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
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

const GET_SERIES = gql`
  {
    series {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export default function Home({ navigation }) {
    const moviesPreview = useQuery(GET_MOVIES)
    const seriesPreview = useQuery(GET_SERIES)

    const navigationHandler = () => {
        navigation.navigate('Movies')
    }
    const navigationHandler2 = () => {
        navigation.navigate('Series')
    }

    return (
        <View style={styles.container}>
            <View>
                <ImageBackground
                    source={{ uri: "https://i.pinimg.com/originals/e0/cc/29/e0cc29b575ea0eb8b805ddff2f148829.jpg" }}
                    style={{ width: '100%', height: '100%' }}>
                    <ScrollView horizontal>
                        {
                            moviesPreview.loading ?
                                <Text>Processing</Text>
                                :
                                (
                                    moviesPreview.error ?
                                    <Text>Error</Text>
                                    :
                                    moviesPreview.data.movies.map(movie => (
                                        <View key={movie._id} style={{ padding: 10 }}>
                                            <Image
                                                style={{ width: 280, height: 280 }}
                                                source={{ uri: movie.poster_path }}
                                            ></Image>
                                        </View>
                                    ))
                                )
                        }
                    </ScrollView>
                    <Button
                        title="View Movies"
                        color="#0000FF50"
                        onPress={() => {
                            navigationHandler()
                        }} />
                    <ScrollView horizontal>
                    {
                            seriesPreview.loading ?
                                <Text>Processing</Text>
                                :
                                (
                                    seriesPreview.error ?
                                    <Text>Error</Text>
                                    :
                                    seriesPreview.data.series.map(serie => (
                                        <View key={serie._id} style={{ padding: 10 }}>
                                            <Image
                                                style={{ width: 280, height: 280 }}
                                                source={{ uri: serie.poster_path }}
                                            ></Image>
                                        </View>
                                    ))
                                )
                        }
                    </ScrollView>
                    <Button
                        title="View Series"
                        color="#32CD3280"
                        onPress={() => {
                            navigationHandler2()
                        }} />
                </ImageBackground>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    }
});
