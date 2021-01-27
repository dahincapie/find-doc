import Doctor from './models/Doctors.js';

export const resolvers = {
    Query: {
        async doctors() {
            return await Doctor.find();
        },
        async doctor(root, { _id }) {
            return await Doctor.findById(_id)
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