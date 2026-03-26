// src/scripts/seed.ts
import mongoose from 'mongoose';
import { Store } from '../models/Store';

const MONGODB_URI = "mongodb+srv://velvetuidesign_db_user:VELVETUI123@cluster0.dbdt1wy.mongodb.net/pantaloons_db?retryWrites=true&w=majority";

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("📡 Connected to Cloud to plant data...");

    const vapiStore = {
      storeId: "4m1kk1",
      storeName: "Center Bazzar, Dabhel, Vapi",
      location: {
        type: "Point",
        coordinates: [72.9048, 20.3700] // [Longitude, Latitude]
      },
      address: {
        street: "Plot No 36, Survey No 306/1 & 2",
        locality: "Dabhel",
        city: "Vapi",
        state: "Gujarat",
        pincode: "396210"
      },
      contact: { phone: "+91 9876543210", email: "vapi@pantaloons.com" },
      facilities: ["Free Parking", "Trial Rooms", "Alteration Desk"],
      categoriesAvailable: ["Men", "Women", "Kids"]
    };

    await Store.findOneAndUpdate({ storeId: vapiStore.storeId }, vapiStore, { upsert: true });
    console.log("✅ Store 'Center Bazzar, Vapi' has been planted in the cloud!");
    
    process.exit(0);
  } catch (err) {
    console.error("❌ Error planting data:", err);
    process.exit(1);
  }
}

seed();