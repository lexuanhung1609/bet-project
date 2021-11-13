import mongoose from 'mongoose';

const betSchema = new mongoose.Schema({
  team1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'team',
    required: true,
  },
  team2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'team',
    required: true,
  },
  time: Date,
  status: String,
  rate: Number,
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'team',
    required: false,
  },
});

export const Bet = mongoose.model('bet', betSchema);
