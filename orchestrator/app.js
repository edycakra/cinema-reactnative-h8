const movieInstance = require('./config/movieInstance')
const seriesInstance = require('./config/seriesInstance')

const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
    type Movies {
        _id: ID
        title: String
        overview: String
        poster_path: String
        popularity: Float
        tags: [String]
    }

    type Series {
        _id: ID
        title: String
        overview: String
        poster_path: String
        popularity: Float
        tags: [String]
    }

    type Query {
        movies: [Movies]
        series: [Series]
        findMovieById(_id:String): Movies
        findSeriesById(_id:String): Series
    }

    type Mutation {
        addMovies(title:String, overview: String, poster_path: String, popularity: Float, tags:[String]): Movies
        editMovies(_id:String,title:String, overview: String, poster_path: String, popularity: Float, tags:[String]): Movies
        deleteMovies(_id: String): Movies
        addSeries(title:String, overview: String, poster_path: String, popularity: Float, tags:[String]): Series
        editSeries(_id:String,title:String, overview: String, poster_path: String, popularity: Float, tags:[String]): Series
        deleteSeries(_id: String): Series
    }
`;

const resolvers = {
    Query: {
        movies: async () => {
            const { data } = await movieInstance.get('/movies')
            return data
        },
        series: async () => {
            const { data } = await seriesInstance.get('/series')
            return data
        },
        findMovieById: async (_, args) => {
            const { data } = await movieInstance.get('/movies/' + args._id)
            return data
        },
        findSeriesById: async (_, args) => {
            const { data } = await seriesInstance.get('/series/' + args._id)
            return data
        }
    },
    Mutation: {
        addMovies: async (_, args) => {
            const { title, overview, poster_path, popularity, tags } = args
            const payload = { title, overview, poster_path, popularity, tags }
            const { data } = await movieInstance.post('/movies', payload)
            return data.data
        },
        editMovies: async (_, args) => {
            const { title, overview, poster_path, popularity, tags } = args
            const payload = { title, overview, poster_path, popularity, tags }
            const { data } = await movieInstance.put('/movies/' + args._id, payload)
            return data.data
        },
        deleteMovies: async (_, args) => {
            const { data } = await movieInstance.delete('/movies/' + args._id)
            return data
        },
        addSeries: async (_, args) => {
            const { title, overview, poster_path, popularity, tags } = args
            const payload = { title, overview, poster_path, popularity, tags }
            const { data } = await seriesInstance.post('/series', payload)
            return data.data
        },
        editSeries: async (_, args) => {
            const { title, overview, poster_path, popularity, tags } = args
            const payload = { title, overview, poster_path, popularity, tags }
            const { data } = await seriesInstance.put('/series/' + args._id, payload)
            return data.data
        },
        deleteSeries: async (_, args) => {
            const { data } = await seriesInstance.delete('/series/' + args._id)
            return data
        }
    }
}

const server = new ApolloServer({ resolvers, typeDefs })
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});