const mongoose = require('mongoose');

const ImageGallarySchema = new mongoose.Schema(
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
    image: {
      type: String,
      required: [true, 'Image is required'],
    },
  }
  
);

const imagegallary = mongoose.model('imagegallary', ImageGallarySchema);
module.exports = imagegallary;
