"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Zips_1 = require("./Zips");
describe("test", () => {
    it("should return first object from collection", () => {
        expect((0, Zips_1.populateZipData)([{ "zip": "20608" }])).toStrictEqual({ zip: { "zip": "20608" } });
    });
});
