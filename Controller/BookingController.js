const Booking = require('../Model/BookingSchema'); // Correcting the model import

exports.BookingReg = async (req, res) => {
    console.log("Inside Carnival");

    const { carnival_id, ticket_count, total_amount, required_date, user_id } = req.body; // Use req.body to get data from the request

    try {
        // Check if the booking already exists for the given carnival_id and user_id
        const existingBooking = await Booking.findOne({ ticket_count:"10" });

        if (existingBooking) {
            return res.status(406).json("Booking already registered");
        }

        // Create a new booking object
        const newBooking = new Booking({
            carnival_id,
            ticket_count,
            total_amount,
            required_date,
            user_id,
            PaymentStatus:"Pending"
        });

        // Save the new booking to the database
        await newBooking.save();
        return res.status(200).json(newBooking); // Return the newly created booking

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error", error: err.message }); // Improved error handling
    }
};

exports.getBookingById = async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ message: "User ID is required" }); // Validate request params
    }

    try {
        // Find bookings for the user
        const bookings = await Booking.find({ user_id: userId });

        if (bookings.length === 0) {
            return res.status(404).json({ message: "No bookings found for this user" });
        }

        res.status(200).json(bookings);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while fetching bookings", error: error.message });
    }
};

  
//delete

exports.deleteBooking = async(req,res)=>{
    const {bookingId} = req.params

    try{
        const deleteData = await Booking.findByIdAndDelete(bookingId)
        res.status(200).json(deleteData)
    }catch(err){
        res.status(401).json(err)
    }
}

exports.getMoreCarnival = async (req, res) => {
    try {
      // Find the carnival event with the most ticket bookings (by ticket_count)
      const mostBookedCarnival = await Booking
        .find() // Find all carnival events
        .sort({ ticket_count: -1 }) // Sort by ticket_count in descending order
        .limit(1); // Limit to the top 1 most booked carnival
        console.log(mostBookedCarnival);
      if (mostBookedCarnival.length > 0) {
        res.status(200).json({ carnivalId: mostBookedCarnival[0].carnival_id }); // Return the carnival ID
        
        
      } else {
        res.status(404).json({ message: 'No carnival events found' }); // If no carnivals found
      }
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  };