/**
 * Resolvers for Graphql queries
 */

import Doctor from './models/Doctors.js';
import { search } from './functions/search.js'
import { capitalize } from './functions/capitalize.js';

export const resolvers = {
    Query: {
        async doctors() {
            return await Doctor.find();
        },
        async doctor(root, { _id }) {
            return await Doctor.findById(_id)
        },
        async search(root, { profesion }) {
            const data = await Doctor.find();
            return await search(data, await capitalize(profesion));
        }
    },
    Mutation: {
        async createDoctor(_, { input }) {
            const newDoctor = new Doctor(input);
            await newDoctor.save();
            return newDoctor;
        },
        async updateDoctor(_, { _id, input }) {
            return await Doctor.findByIdAndUpdate(_id, input, { new: true });
        },
        async deleteDoctor(_, { _id }) {
            return await Doctor.findByIdAndDelete(_id);
        }
    }
};
