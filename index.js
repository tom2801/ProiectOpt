const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const app = express();

const schema = require('./graphql');

app.use(express.json());

app.post('/graphql', graphqlHTTP({
    schema: schema,
}));

app.listen(8000);