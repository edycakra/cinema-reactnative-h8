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

const DELETE_SERIES = gql`
mutation deleteASeries(
  $_id:String){
  deleteSeries( 
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

export default function SeriesDetail({ route, navigation }) {
    const { detail } = route.params
    const [deleteSeries] = useMutation(DELETE_SERIES, {
        update(cache, { data: { deleteSeries } }) {
            const { series } = cache.readQuery({ query: GET_SERIES })
            cache.writeQuery({
                query: GET_SERIES,
                data: { series: series.filter(serie => serie._id !== detail._id) }
            })
        }
    })
    const deleteHandler = (_id) => {
        deleteSeries({
            variables: {
                _id
            }
        })
        navigation.navigate('Series')
    }


    const navigationHandler = () => {
        navigation.navigate('EditSeries', {
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
                    title="Edit Serie"
                    color="#32CD32"
                    onPress={() => {
                        navigationHandler()
                    }}
                />
                <Button
                    title="Delete Serie"
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