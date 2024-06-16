import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema(
    {
        country: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true
        },
        location :{
            type: { type: String, default: 'Point' }, //geoSpatial point
            coordinates: [Number] //[longitude, latitude] in this order
        },
        houseNumber: {
            type: String
        }
    }
);

addressSchema.set('timestamps', true);
export default mongoose.model('address', addressSchema);