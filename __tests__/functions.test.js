//import search from '../functions/search';
//import capitalize from '../functions/capitalize.js';

import { search } from "../functions/search";

const fakeData = [
    {name: "Doctor1", profesion: "A"},
    {name: "Doctor2", profesion: "A"},
    {name: "Doctor3", profesion: "A"},
    {name: "Nurse1", profesion: "B"},
    {name: "Nurse2", profesion: "B"},
    {name: "Nurse3", profesion: "B"},
];

describe('Search', () => {
    it('should return all the entries with a given profesion', async () => {
        const filteredData = search (fakeData, "A")
        expect(filteredData.length).toEqual(3);
        expect(filteredData[0].includes("Doctor1")).toBe(true);
        expect(filteredData.includes("Doctor2")).toBe(true);
        expect(filteredData.includes(Doctor3)).toBe(true);
        expect(filteredData.includes(Nurse1)).toBe(true);
    });
});