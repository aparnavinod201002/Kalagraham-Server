const mongoose = require('mongoose');

const RequestRegSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  carnivalName: {
    type: String,
    required: true,
  },

  locationName:{
    type: String,
    required: true,
  },
  districtName:{
    type: String,
    required: true,
  },
  requests:{
    type: String,
    required: true,
  },

  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  categoryName: {
    type: String,
    required: true,
  },
  subCategoryName: {
    type: String,
    required: true,
  },
  aboutMe: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  reply: {
    type: String,
  },
  date: {
    type: Date,
   
  }
});

const request = mongoose.model('request', RequestRegSchema);
module.exports = request;
