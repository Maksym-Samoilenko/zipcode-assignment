# zipcode-assignment

There is task zipcode-assignment presented.

To  deploy application locally:
* `git clone https://github.com/Maksym-Samoilenko/zipcode-assignment`
* `cd zipcode-assignment`
* `docker-compose up`

To test locally:
* Correct scenario `curl -X POST http://localhost:4000/graphql/ -H "Content-Type: application/json" -d '{"query": "query getzip($arg1: String) { getZipByCode(code: $arg1){zip{ city county} }}","operationName": "getzip","variables": { "arg1": "20607" }}' `
* Error scenario `curl -X POST http://localhost:4000/graphql/ -H "Content-Type: application/json" -d '{"query": "query getzip($arg1: String) { getZipByCode(code: $arg1){zip{ city county} }}","operationName": "getzip","variables": { "arg1": "2067" }}'  `

To check store data go to Mongo Express UI http://localhost:8081/

Writeup on what you would tackle next:
* Add custom validator for zip code by using directives(according to: https://www.apollographql.com/blog/backend/validation/graphql-validation-using-directives/)
* For bigger projects working with data store objects  mongoose schema is more preferable than direct connection to mongodb via driver.
* For bigger projects correct foldering needed (schema, object type,object queries, mutation queries, datastore), not all query in one file and resolvers and dataSources is defined in app.ts.
* Data conection should be defined is separate folder/files, not in app.ts and think about better handling of requests to database (open and close connection on each request need improvement)
* Exception handling needs attention on 404 error `throw new ApolloError('No Zip code presented in datastore', '404');`   according to https://www.apollographql.com/docs/apollo-server/data/errors/ , and database work should be covered with exception handling.
* Here unsuccessfull unit test  doesn't stop deployment, need to propose better solution.
