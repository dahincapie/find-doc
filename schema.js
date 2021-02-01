/**
 * Schema for Graphql queries
 */

import { resolvers } from "./resolvers.js";
import { makeExecutableSchema } from "graphql-tools";

const typesDefs = `
    type Query {
        doctors: [Doctor],
        doctor(_id: ID): Doctor,
        search(profesion: String): [Doctor]
    }

    type Mutation {
        createDoctor(input: DoctorInput): Doctor
        deleteDoctor(_id: ID): Doctor
        updateDoctor(_id: ID, input: DoctorInput): Doctor
    }

    input DoctorInput {
        name: String,
        profesion: String,
        specialties: [String],
        stars: Int,
        verified: Boolean,
        profilePic: String,
        _id: ID,
        about: String,
        recognitions: [String]
    }

    type Doctor {
        name: String!,
        profesion: String!
        specialties: [String],
        stars: Int,
        verified: Boolean,
        profilePic: String,
        _id: ID,
        about: String!,
        recognitions: [String]
    }
`;

export default makeExecutableSchema({
    typeDefs: typesDefs,
    resolvers: resolvers
});
