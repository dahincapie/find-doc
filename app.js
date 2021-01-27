/**
 * Genome app
 */
import schema from './schema.js';
import express from 'express';
import mongoose from 'mongoose';
import config from 'config';
import bodyParser from 'body-parser';
import { graphqlHTTP } from 'express-graphql';
import Doctor from './models/Doctors.js';


var app = express();
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false })); 

const db = config.get('mongoURI');

mongoose
    .connect(db, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Landing endpoint
app.get('/', (req, res) => {
    res.status(200).send("Welcome to Genome's API");
});

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema
}));

// Get all doctors
app.get('/doctors', (req, res) => {
    Doctor.find()
        .sort({ date: -1 })
        .then(items => console.log(res.json(items)))
        .catch(err => res.status(404).json({ status: failed}));
});

// Add a new doctor profile
app.post('/doctors', (req, res) => {
    console.log(req);
    const newDoctor = new Doctor({
        name: req.body.name,
        profesion: req.body.profesion,
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
    findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(() => res.json({ status: "success" }))
    .catch(err => res.status(404).json({ status: "failed" }));
});

// Delete a doctor profile
app.delete('/doctors/:id', (req, res) => {
    findOneAndDelete({ _id: req.params.id })
    .then(() => res.json({ status: "success" }))
    .catch(err => res.status(404).json({ status: "failed" }));
});

const port = 3000;
app.listen(port, () => console.log(`App started on port: http://localhost:${port}...`));
