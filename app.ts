import { MongoClient } from "mongodb";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./apollo/type-defs";
import { Zips, ZipDocument, ZipResponse } from "./apollo/data-sources/Zips";
import express from "express";
const mongo = process.env.DATABASE_URL ? process.env.DATABASE_URL : " ";
const ZIPS = "zips";
const client = new MongoClient(mongo);
async function main() {
  await client.connect();
  let zips = new Zips(client.db(ZIPS).collection(ZIPS));
  await client.close();
  let resolvers = {
    Query: {
      getZipByCode: async (parent: any, args: any) => {
        await client.connect();
        let zipResult: ZipResponse = await zips.getZipByCode(args.code);
        await client.close();
        return zipResult;
      }
    }
  }
  let apolloServer = new ApolloServer({
    typeDefs,
    dataSources: () => ({
      zips
    }),
    resolvers: resolvers
  });
  await apolloServer.start();
  const app = express();
  apolloServer.applyMiddleware({ app, path: "/graphql" })
  app.listen({ port: 4000 });
}
main();
