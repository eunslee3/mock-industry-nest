const mongoose = require('mongoose')

const Schema = mongoose.Schema 

const specificationSchema = new Schema({
    resolution: {
        type: String,
        required: true
    },
    supply_voltage: {
        type: String,
        required: true
    },
    current_consumption: {
        type: String,
        required: true
    },
    max_response_frequency: {
        type: String,
        required: true
    },
    rising_time: {
        type: String,
        required: true
    },
    falling_time: {
        type: String,
        required: true
    }
    
}, { timestamp: true })

module.exports = mongoose.model('Specification', specificationSchema)