"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { gql } = require('apollo-server');
const typeDefs = gql `
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
exports.default = typeDefs;
