import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  // Who bought it
  customerName: { type: String, default: 'Guest User' },
  customerEmail: { type: String, default: 'test@example.com' },
  
  // What they bought
  items: [
    {
      name: { type: String, required: true },
      price: { type: String, required: true },
      image: { type: String, required: true },
    }
  ],
  
  // The Money
  totalAmount: { type: Number, required: true },
  
  // The crucial part you asked for: COD vs Stripe!
  paymentMethod: { type: String, required: true, enum: ['Stripe', 'COD'] },
  paymentStatus: { type: String, required: true, enum: ['Paid', 'Pending'] },
  
  // Where the order is in the shipping process
  orderStatus: { type: String, default: 'Processing' },
  createdAt: { type: Date, default: Date.now },
});

// If the model exists, use it. Otherwise, create it.
export default mongoose.models.Order || mongoose.model('Order', OrderSchema);