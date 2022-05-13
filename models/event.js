const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    eventDate: {
      type: Date,
      required: true,
      min: '2022-01-01',
    },
    poster: {
      type: String,
    },
    images: [
      {
        type: String,
      },
    ],
    winners: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Student',
      },
    ],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Event', eventSchema)
