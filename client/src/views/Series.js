import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Button
} from 'react-native'
import {
    useQuery
} from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { TouchableOpacity } from 'react-native-gesture-handler';

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

const GET_DETAIL = gql`
query findOne( $id: String){
    findSeriesById( _id: $id)
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


export default function Series({ navigation }) {
    const { loading, error, data } = useQuery(GET_SERIES)
    if (loading) return <Text>Processing, please wait...</Text>
    if (error) return <Text>Something went wrong</Text>

    const pressHandling = (serie) => {
        navigation.navigate('SeriesDetail', {
            detail: serie
        })
    }
    const navigationHandler = () => {
        navigation.navigate('AddSeries')
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <Button
                    title="Add New Series"
                    color="#32CD32"
                    onPress={() => {
                        navigationHandler()
                    }} />
                {
                    data.series.map(serie => (
                        <View key={serie._id} style={{ padding: 15, borderWidth: 0.5 }}>
                            <Text style={{
                                fontSize: 30,
                                textAlign: 'center'
                            }}>{serie.title}</Text>
                            <Text onPress={() => {
                                pressHandling(serie)
                            }}
                                style={{
                                    fontSize: 10,
                                    color: '#888',
                                    textAlign: 'center'
                                }}>
                                more details
                                </Text>
                            <TouchableOpacity onPress={() => {
                                pressHandling(serie)
                            }}>
                                <Image
                                    style={{ width: 300, height: 500 }}
                                    source={{ uri: serie.poster_path }}
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
