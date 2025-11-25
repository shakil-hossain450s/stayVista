const express = require('express');
const stripe = require('../config/stripe');
const router = express.Router();

router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body;
    // console.log(amountInCents);
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    console.log(paymentIntent.client_secret);

    res.json({
      clientSecret: paymentIntent.client_secret
    });

  } catch (err) {
    console.log("Error creating payment intent:", err);
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

module.exports = router;