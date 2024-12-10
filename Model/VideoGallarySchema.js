const mongoose = require('mongoose');

const VideoGallarySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    userId: {
      type: String,
      required: true
     
    },
    coverimage: {
      type: String,
      required: [true, 'Image is required'],
    },
    url: {
        type: String,
        required: [true, 'Image is required'],
      },
  }
  
);

const videogallary = mongoose.model('videogallary', VideoGallarySchema);
module.exports = videogallary;
