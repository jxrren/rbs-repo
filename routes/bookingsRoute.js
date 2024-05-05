const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const Room = require("../models/room");
const moment = require("moment");

router.post("/bookroom", async (req, res) => {
  const { room, userid, fromdate, todate, totalAmount, totalDays } = req.body;

  try {
    const newBooking = new Booking({
      room: room.name,
      roomid: room._id,
      userid,
      fromdate: moment(fromdate).format("DD-MM-YYYY"),
      todate: moment(todate).format("DD-MM-YYYY"),
      totalAmount,
      totalDays,
      transactionId: "1234",
    });

    const booking = await newBooking.save();
    const roomtemp = await Room.findOne({ _id: room._id });
    roomtemp.currentbookings.push({
      bookingid: booking._id,
      fromdate: moment(fromdate).format("DD/MM/YYYY"),
      todate: moment(todate).format("DD/MM/YYYY"),
      userid: userid,
      status: booking.status,
    });

    await roomtemp.save();
    // Send success response
    res.status(200).json({ message: "Booking created successfully", booking });
  } catch (error) {
    // Send error response
    console.error("Error creating booking:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the booking" });
  }
});

module.exports = router;
