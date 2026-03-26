import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema({
  storeId: { type: String, required: true, unique: true, index: true },
  brandName: { type: String, default: 'Pantaloons' },
  storeName: { type: String, required: true },
  
  // GeoJSON for efficient map proximity queries
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true } // [longitude, latitude]
  },
  
  address: {
    street: String,
    locality: String,
    city: String,
    state: String,
    pincode: String
  },
  contact: { phone: String, email: String },
  
  hours: [{
    day: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
    open: String,
    close: String,
    isClosed: { type: Boolean, default: false }
  }],
  
  facilities: [String],
  categoriesAvailable: [String],
  images: [String],
}, { timestamps: true });

// Crucial: Creates a map index so we can search "stores near me"
storeSchema.index({ location: '2dsphere' });

export const Store = mongoose.models.Store || mongoose.model('Store', storeSchema);