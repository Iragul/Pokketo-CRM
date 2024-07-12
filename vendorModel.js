const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  shopLocation: { type: String, required: true },
  instagramId: { type: String, required: true },
  website: { type: String, required: true },
  onBoardStatus: { type: String, required: true },
  weekend: { type: String, required: true },
});

const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;
