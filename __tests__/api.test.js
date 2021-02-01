
const axios = require ("axios");
const docObject = {
    name: "Testing POST method",
    profesion: "Tester",
    about: "Testing FinDoc API's!"
};

describe('POST@/doctors', () => {
    it('should create a new doctor and return it with 200 atatus code', async () => {
        const response = await axios.post('http://localhost:3000/doctors', docObject);

        expect(response.status).toEqual(200);
        expect(response.data).toMatchObject(docObject);
    });
});

describe('GET@/doctors', () => {
    it('should return a collection of doctors with 200 atatus code', async () => {
        const response = await axios.get('http://localhost:3000/doctors');
        expect(response.status).toEqual(200);
        //expect(typeof response.data).toBe(Array);
    });
});

describe('GET@/doctors/:id', () => {
    it('should return a doctor object given its id with 200 atatus code', async () => {
        const response = await axios.get('http://localhost:3000/doctors/60118206c3604905e7eedb62');
        expect(response.status).toEqual(200);
    });
});

describe('PUT@/doctors', () => {
    it('should return a collection of doctors with 200 atatus code', async () => {
        const response = await axios.get('http://localhost:3000/doctors');
        expect(response.status).toEqual(200);
        //expect(typeof response.data).toBe(Array);
    });
});

describe('DELETE@/doctors', () => {
    it('should return a collection of doctors with 200 atatus code', async () => {
        const response = await axios.get('http://localhost:3000/doctors');
        expect(response.status).toEqual(200);
        //expect(typeof response.data).toBe(Array);
    });
});

