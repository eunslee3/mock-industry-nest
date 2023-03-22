const express = require('express')
const axios = require('axios')
const router = express.Router()
const Specification = require('../models/specificationModel')
const requireAuth = require('../middleware/requireAuth')

// GET all products & categories
router.get('/', (req, res) => {
    axios.get('https://dummyjson.com/products')
    .then(response => res.status(200).send(response.data))
    .catch(error => {
        console.error(error);
        res.status(500).send('Error fetching data from Fake Store API');
    });
})

router.get('/categories', (req, res) => {
    axios.get('https://dummyjson.com/products/categories')
    .then(response => res.status(200).send(response.data))
    .catch(error => {
        console.error(error)
        res.status(500).send('Error fetching data from Fake Store API')
    })
})

router.get('/specifications/', async (req, res) => {
    try {
        const specifications = await Specification.find();
        res.status(200).json(specifications);
  } catch (error) {
        res.status(500).json({ error: error.message });
  }
})

router.post('/specifications/', async (req, res) => {
    const {resolution, supply_voltage, current_consumption, max_response_frequency, rising_time, falling_time} = req.body
    try {
        const specification = await Specification.create({resolution, supply_voltage, current_consumption, max_response_frequency, rising_time, falling_time})
        res.status(201).json(specification)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
})

router.patch('/specifications/:id', async (req, res) => {
   const { id } = req.params;
   const { resolution, supply_voltage, current_consumption, max_response_frequency, rising_time, falling_time } = req.body;
   try {
     const result = await Specification.updateOne({ _id: id }, { $set: { resolution, supply_voltage, current_consumption, max_response_frequency, rising_time, falling_time } });
     if (result.nModified === 0) {
       res.status(404).json({ error: `Specification with ID ${id} not found` });
     } else {
       res.status(200).json({ message: `Specification with ID ${id} updated successfully` });
     }
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
})

module.exports = router