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
Object.defineProperty(exports, "__esModule", { value: true });
exports.populateZipData = exports.Zips = void 0;
const apollo_datasource_mongodb_1 = require("apollo-datasource-mongodb");
const apollo_server_errors_1 = require("apollo-server-errors");
class Zips extends apollo_datasource_mongodb_1.MongoDataSource {
    getZipByCode(code) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let zipData = yield this.findByFields({ zip: code });
                return populateZipData(zipData);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.Zips = Zips;
;
function populateZipData(zipData) {
    if (zipData && zipData.length) {
        return {
            zip: zipData[0],
        };
    }
    else {
        throw new apollo_server_errors_1.ApolloError('No Zip code presented in datastore', '404');
    }
}
exports.populateZipData = populateZipData;
