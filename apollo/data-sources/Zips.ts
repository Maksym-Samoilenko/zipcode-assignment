import { MongoDataSource } from 'apollo-datasource-mongodb'
import { AnyARecord } from 'dns'
import { ObjectId } from 'mongodb'
import { ApolloError } from 'apollo-server-errors';
export interface ZipDocument {
  _id: ObjectId
  zip: string
  city: string
  county: string
}
export interface ZipResponse {
  zip: (ZipDocument | null | undefined)
}
export class Zips extends MongoDataSource<ZipDocument> {

  async getZipByCode(code: string): Promise<ZipResponse> {
    try {
      let zipData: (ZipDocument | null | undefined)[] = await this.findByFields({ zip: code });
      return populateZipData(zipData)
    } catch (error) {
      throw error;
    }
  }
}
;
export function populateZipData(zipData: (ZipDocument | null | undefined)[]): ZipResponse {
  if (zipData && zipData.length) {
    return {
      zip: zipData[0],
    };
  }
  else {
    throw new ApolloError('No Zip code presented in datastore', '404');
  }
}