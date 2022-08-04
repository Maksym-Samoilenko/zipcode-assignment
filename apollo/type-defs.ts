const { gql } = require('apollo-server');
const typeDefs = gql`
  type Zip {
    zip: String 
    city: String
    county: String
  }
  type ZipResponse {
    zip: Zip
  }
  type Query {
    getZipByCode(code:String):ZipResponse
  }
`;
export default typeDefs;
