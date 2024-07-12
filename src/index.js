require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const Vendor = require('./vendorModel');

app.use(bodyParser.json());

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas', err);
  });

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Add a new vendor
app.post('/vendor/add', async (req, res) => {
    try {
      const { mobileNumber } = req.body;
  
      // Check if the mobile number already exists in the database
      const existingVendor = await Vendor.findOne({ mobileNumber });
  
      if (existingVendor) {
        return res.status(400).send({ message: 'Vendor with this mobile number already exists' });
      }
  
      // If mobile number doesn't exist, create and save the new vendor
      const vendor = new Vendor(req.body);
      await vendor.save();
      res.status(201).send({ message: 'Vendor Add Sucessfully' });
    } catch (err) {
      res.status(400).send(err);
    }
  });
  
  
  // update Vendor by mobile id
  app.put('/vendor/update/:mobileNumber', async (req, res) => {
    try {
      const mobileNumber = req.params.mobileNumber;
      const updatedVendor = await Vendor.findOneAndUpdate({ mobileNumber }, req.body, { new: true });
      if (!updatedVendor) {
        return res.status(404).send({ message: 'Vendor not found' });
      }
      res.send({ message: 'Vendor Updated Sucessfully' });
    } catch (err) {
      if (err.code === 11000 && err.keyPattern && err.keyPattern.mobileNumber) {
        return res.status(400).send({ message: 'Mobile number must be unique' });
      }
      res.status(400).send(err);
    }
  });

// Delete a vendor by mobileNumber
app.delete('/vendor/delete/:mobileNumber', async (req, res) => {
  try {
    const mobileNumber = req.params.mobileNumber;
    const deletedVendor = await Vendor.findOneAndDelete({ mobileNumber });
    if (!deletedVendor) {
      return res.status(404).send({ message: 'Vendor not found' });
    }
    res.send({ message: 'Vendor Deleted Sucessfully found' });
  } catch (err) {
    res.status(400).send(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
