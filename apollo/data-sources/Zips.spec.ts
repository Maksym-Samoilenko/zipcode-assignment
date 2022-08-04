import { populateZipData } from "./Zips";
describe("test", () => {
  it("should return first object from collection", () => {
    expect(populateZipData([{ "zip": "20608" }])).toStrictEqual({ zip: { "zip": "20608" } });
  });
});