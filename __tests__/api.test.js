
const axios = require ("axios");
const testerId = Math.floor((Math.random() * 1000) + 1);
let docObjectId = 0;
const docObject = {
    name: "Tester Object",
    profesion: `Tester${testerId}`,
    about: "Testing FinDoc API's!"
};

const docUpdates = {
    name: "Tester Object Updated",
    profesion: `Tester${testerId}`,
    about: "Testing FinDoc API's!"
};

describe('POST@/doctors', () => {
    it('should create a new doctor and return it with 200 status code', async () => {
        const response = await axios.post('http://localhost:3000/doctors', docObject);

        expect(response.status).toEqual(200);
        expect(response.data).toMatchObject(docObject);
        docObjectId = (response.data._id);
    });
});

describe('GET@/doctors', () => {
    it('should return a collection of doctors with 200 atatus code', async () => {
        const response = await axios.get('http://localhost:3000/doctors');
        expect(response.status).toEqual(200);
        expect(response.data[response.data.length -1]).toMatchObject(docObject);
        expect(response.data.length >= 0).toBe(true);
        expect(typeof response.data).toBe('object');
    });
});

describe('GET@/doctors/:id', () => {
    it('should return a doctor object given its id with 200 status code', async () => {
        const response = await axios.get(`http://localhost:3000/doctors/${docObjectId}`);
        expect(response.status).toEqual(200);
        expect(response.data).toMatchObject(docObject);
    });
});

describe('GET@/search', () => {
    it('should return a collection of doctor with a given position with 200 status code', async () => {
        const response = await axios.get(`http://localhost:3000/search/?profesion=${docObject.profesion}`);
        expect(response.status).toEqual(200);
        expect(response.data[0]).toMatchObject(docObject);
    });
});

describe('PUT@/doctors', () => {
    it('should return a json informing status success with 200 status code', async () => {
        let response = await axios.put(`http://localhost:3000/doctors/${docObjectId}`, {name: 'Tester Object Updated'});
        expect(response.status).toEqual(200);
        expect(response.data.status).toEqual("success");
        response = await axios.get(`http://localhost:3000/doctors/${docObjectId}`);
        expect(response.data).toMatchObject(docUpdates);
    });
});

describe('DELETE@/doctors', () => {
    it('should return a collection of doctors with 200 status code', async () => {
        let response = await axios.delete(`http://localhost:3000/doctors/${docObjectId}`);
        expect(response.status).toEqual(200);
        expect(response.data.status).toEqual("success");
        response = await axios.get(`http://localhost:3000/doctors/${docObjectId}`);
        expect(response.data).toEqual(null);
    });
});

