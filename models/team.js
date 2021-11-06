import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
    name: String,
    imgUrl: String,
    region: String,
});

export const Team = mongoose.model('team', teamSchema);
