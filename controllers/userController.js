const User = require('../models/user');
const axios = require('axios');
constfast2sms = require('fast2sms');
const fast2smsApiKey =
  'kcWlPMoH6OtKehXsBGzvRdD7my8rTEFNSJ9U1VAgZj3CqLinfYVre1m5ZyB7nq89ob40WKvU2JsNAgdT'; // Replace with your actual API key

// Function to initiate phone number verification during signup
const UserController={
  signup :async (req, res) => {
    const { phoneNumber } = req.body;
    console.log('hi');
  
    try {
      console.log('Signup initiated for phone number:', phoneNumber);
  
      const existingUser = await User.findOne({ phoneNumber });
  
      if (existingUser) {
        console.log('User already exists');
        return res
          .status(400)
          .json({ success: false, message: 'User already exists' });
      }
  
      // Generate a random 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
      // Save the user with the generated OTP
      const newUser = new User({ phoneNumber, otp });
      await newUser.save();
  
      // Send the OTP via Fast2SMS
      const response = await axios.post(
        'https://www.fast2sms.com/dev/bulkV2',
        {
          route: 'q',
          message: `Your OTP for signup is: ${otp}`,
          language: 'english',
          flash: 0,
          numbers: 9454681173,
        },
        {
          headers: {
            authorization:
              kcWlPMoH6OtKehXsBGzvRdD7my8rTEFNSJ9U1VAgZj3CqLinfYVre1m5ZyB7nq89ob40WKvU2JsNAgdT,
          },
        }
      );
  
      console.log('SMS API response:', response.data);
  
      res.json({ success: true, message: 'Phone number verification initiated' });
    } catch (error) {
      console.error('Error during signup:', error);
      res
        .status(500)
        .json({ success: false, message: 'Failed to register user' });
    }
  },
  {
    
  }

} 

const login = async (req, res) => {
  const { phoneNumber, otp } = req.body;

  try {
    console.log('Login initiated for phone number:', phoneNumber);

    // Check if the provided OTP is valid
    const user = await User.findOne({ phoneNumber, otp });

    if (user) {
      // Clear the OTP after successful login
      user.otp = undefined;
      await user.save();

      res.json({ success: true, message: 'Login successful' });
    } else {
      console.log('Invalid OTP');
      res.status(401).json({ success: false, message: 'Invalid OTP' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: 'Failed to log in' });
  }
};

module.exports = { signup, login };
