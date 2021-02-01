/**
 * Genome app
 */

import bodyParser from 'body-parser';
import { capitalize } from './functions/capitalize.js';
import config from 'config';
import cors from 'cors';
import Doctor from './models/Doctors.js';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import mongoose from 'mongoose';
import schema from './schema.js';
import { search } from './functions/search.js';


const app = express();
app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false})); 

const db = config.get('mongoURI');

mongoose
    .connect(db, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Landing endpoint
app.get('/', (req, res) => {
    res.status(200).send("Welcome to FindDoc's API");
});

// Graphql endpoint
app.use('/graphql/doctors', graphqlHTTP({
    graphiql: true,
    schema: schema
}));

// Get all doctors
app.get('/doctors', (req, res) => {
    Doctor.find()
        .sort({ date: -1 })
        .then(items => console.log(res.json(items)))
        .catch(err => res.status(404).json({ status: `failed ${err}`}));
});

// Get a specific doctor
app.get('/doctors/:id', (req, res) => {
    Doctor.findById({_id: req.params.id})
        .then(item => console.log(res.json(item)))
        .catch(err => res.status(404).json({ status: `failed ${err}`}));
});

//Simple search by profesion
app.get('/search', async (req, res) => {
    const profesion = await capitalize(req.query.profesion);
    const data = await Doctor.find();
    const filteredData = await search(data, profesion);
    try {
        res.json(filteredData);
    } catch (err) {
        res.status(404).json({ status: `failed ${err}`});
    }

});

// Add a new doctor profile
app.post('/doctors', async (req, res) => {
    const newDoctor = new Doctor({
        name: capitalize(req.body.name),
        profesion: capitalize(req.body.profesion),
        about: req.body.about,
        specialties: req.body.specialties,
        stars: req.body.stars,
        recognitions: req.body.recognitions,
        verified: req.body.verified,
        profilePic: req.body.profilePic
    });
    newDoctor
        .save()
        .then(newItem => res.json(newItem))
        .catch(err => res.status(404).json({ status: `failed ${err}`}));
});

// Update a doctor profile
app.put('/doctors/:id', (req, res) => {
    Doctor
    .findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(() => res.json({ status: "success" }))
    .catch(err => res.status(404).json({ status: `failed ${err}`}));
});

// Delete a doctor profile
app.delete('/doctors/:id', (req, res) => {
    Doctor
    .findOneAndDelete({ _id: req.params.id })
    .then(() => res.json({ status: "success" }))
    .catch(err => res.status(404).json({ status: `failed ${err}`}));
});

const port = 3000;
app.listen(port, () => console.log(`\n\t ********************\nApp started on port: http://localhost:${port}...\n`));
