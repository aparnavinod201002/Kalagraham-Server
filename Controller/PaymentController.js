const Payment = require('../Model/paymentModel'); // Corrected import to use the capitalized model name
const Booking = require('../Model/BookingSchema'); // Importing the Booking model

exports.handlePayment = async (req, res) => {
  console.log('Incoming Payment Data:', req.body); // Log incoming data

  const { fromAccount, toAccount, expMonth, expYear, cvc, totalAmount, userId, id } = req.body;

  // Check if all required fields are provided
  if (!fromAccount || !toAccount || !expMonth || !expYear || !cvc || !totalAmount || !userId || !id) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Check if a payment already exists with the same details (if you want unique payments per user)
    const existingPayment = await Payment.findOne({ fromAccount, toAccount, expMonth, expYear, cvc, totalAmount, userId, id });
    if (existingPayment) {
      return res.status(400).json({ error: 'Payment already exists for this user.' });
    }

    // Create a new payment record
    const payment = new Payment({ fromAccount, toAccount, expMonth, expYear, cvc, totalAmount, userId, id });
    await payment.save();

    // Update the corresponding booking with 'Paid' status

   
    const booking = await Booking.findOneAndUpdate(
      {  user_id:userId,_id: id },  // Find booking by userId and booking id
      { $set: { PaymentStatus: 'Paid' } },  // Update PaymentStatus to 'Paid'
      { new: true }  // Return the updated booking document
    );

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found.' });
    }

    // Return a success response
    res.status(200).json({ message: 'Payment successful and booking status updated!', payment, booking });
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ error: 'Payment processing failed. Please try again later.' });
  }
};

exports.getPaymentById = async (req, res) => {
  const { userId } = req.params;

  try {
      const payment = await Payment.find({ userId: userId }); // Sort alphabetically
      if (payment.length === 0) {
          return res.status(404).json({ message: "No locations found for this district" });
      }
      res.status(200).json(payment);
  } catch (error) {
      res.status(500).json({ error: "An error occurred while fetching locations" });
  }
};


exports.getPaymentByByookingId = async (req, res) => {
  const { id } = req.params;

  try {
      const payment = await Payment.find({ id: id }); // Sort alphabetically
      if (payment.length === 0) {
          return res.status(404).json({ message: "No locations found for this district" });
      }
      res.status(200).json(payment);
  } catch (error) {
      res.status(500).json({ error: "An error occurred while fetching locations" });
  }
};

