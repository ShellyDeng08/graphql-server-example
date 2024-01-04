import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

const typeDefs = `#graphql
    type Query {
        users: [User]
    }
    type User {
        id: ID!
        name: String!
        email: String
        address: String
    }
`

const resolvers = {
    Query: {
        async users() {
            try {
                const res = await fetch('https://jsonplaceholder.typicode.com/users')
                if(!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json()
                
            } catch (error) {
                console.log(error)
                return []
            }
        }
    }
}

// ApolloServer实例化
const server = new ApolloServer({
    typeDefs,
    resolvers
})

// 启动Apollo Server
const { url } = await startStandaloneServer(server, {
    listen: {port: 4000},
    cors: {
        origin: 'http://localhost:3000',
    }
})

console.log(`🚀  Server ready at: ${url}`)