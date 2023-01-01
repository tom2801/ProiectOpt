const { request } = require('express');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const app = express();

const schema = require('./graphql');

app.use(express.json());

app.post('/graphql', graphqlHTTP( request=>(
    
    {
        schema: schema,
        context: request.headers.token
    }
)
)
);

app.listen(8000);

