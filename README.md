# zipcode-assignment

There is task zipcode-assignment presented.

To  deploy application locally:
* `git clone https://github.com/Maksym-Samoilenko/zipcode-assignment`
* `cd zipcode-assignment`
* `docker-compose up`

To test locally:
* `Correct scenario: curl -X POST hhttp://localhost:4000/graphql/
   -H "Content-Type: application/json"
   -d '{
  "query": "query getzip($arg1: String) { getZipByCode(code: $arg1){zip{ city county} }}",
  "operationName": "getzip",
  "variables": { "arg1": "20607" }
}'  `
* `Error scenario: curl -X POST hhttp://localhost:4000/graphql/
   -H "Content-Type: application/json"
   -d '{
  "query": "query getzip($arg1: String) { getZipByCode(code: $arg1){zip{ city county} }}",
  "operationName": "getzip",
  "variables": { "arg1": "2067" }
}'  `
