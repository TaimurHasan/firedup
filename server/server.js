const { authMiddleware } = require('./utils/auth');
const express = require('express');
const path = require('path');

const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');

const db = require('./config/connection');

const PORT = process.env.PORT || 3001;

// create new Apollo server and pass in typedefs and resolvers
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
})

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// create a new instance of Apollo server with gql schena
const startApolloServer = async (typeDefs, resolvers) => {
    await server.start();
    // integrate Apollo server with Express app as middleware
    server.applyMiddleware({ app });

    // serve static assets
    if(process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/build')));
    };

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    })

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
            console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
        })
    })
};

startApolloServer(typeDefs, resolvers)