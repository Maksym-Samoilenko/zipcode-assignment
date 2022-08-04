"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const apollo_server_express_1 = require("apollo-server-express");
const type_defs_1 = __importDefault(require("./apollo/type-defs"));
const Zips_1 = require("./apollo/data-sources/Zips");
const express_1 = __importDefault(require("express"));
const url = 'mongodb://root:example@localhost:27017/zips?authSource=admin';
const client = new mongodb_1.MongoClient(url);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        let zips = new Zips_1.Zips(client.db("zips").collection("zips"));
        yield client.close();
        let resolvers = {
            Query: {
                getZipByCode: (parent, args) => __awaiter(this, void 0, void 0, function* () {
                    yield client.connect();
                    let ZipResult = yield zips.getZipByCode(args.code);
                    yield client.close();
                    return ZipResult;
                })
            }
        };
        let apolloServer = new apollo_server_express_1.ApolloServer({
            typeDefs: type_defs_1.default,
            dataSources: () => ({
                zips
            }),
            resolvers: resolvers
        });
        yield apolloServer.start();
        const app = (0, express_1.default)();
        apolloServer.applyMiddleware({ app, path: "/graphql" });
        app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`));
    });
}
main();
