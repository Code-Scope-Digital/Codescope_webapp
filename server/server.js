const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect(
  'mongodb+srv://codescopedigital:Jl7GAbw7RFWdpACD@cluster0.6fcl3.mongodb.net/',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define the schema for newsletter and contact submissions
const Subscriber = mongoose.model(
  'Subscriber',
  new mongoose.Schema({
    email: String,
  })
);

const Contact = mongoose.model(
  'Contact',
  new mongoose.Schema({
    name: String,
    email: String,
    message: String,
  })
);

// Route to handle newsletter subscription
app.post('/subscribe', async (req, res) => {
  const { email } = req.body;

  const exist = Subscriber.find({ email });
  console.log(exist);
  if (!exist) {
    const subscriber = new Subscriber({ email });
    await subscriber.save();
  }

  // Send confirmation email
  //   const transporter = nodemailer.createTransport({
  //     service: 'Gmail',
  //     auth: {
  //       user: 'your_email@gmail.com',
  //       pass: 'your_email_password',
  //     },
  //   });

  //   const mailOptions = {
  //     from: 'your_email@gmail.com',
  //     to: email,
  //     subject: 'Newsletter Subscription',
  //     text: 'Thank you for subscribing to our newsletter!',
  //   };

  //   transporter.sendMail(mailOptions, (error, info) => {
  //     if (error) {
  //       return console.log(error);
  //     }
  //     console.log('Message sent: %s', info.messageId);
  //   });

  res.send('Subscription successful');
});

// Route to handle contact form submission
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  const contact = new Contact({ name, email, message });
  await contact.save();

  // Send confirmation email
  //   const transporter = nodemailer.createTransport({
  //     service: 'Gmail',
  //     auth: {
  //       user: 'your_email@gmail.com',
  //       pass: 'your_email_password',
  //     },
  //   });

  //   const mailOptions = {
  //     from: 'your_email@gmail.com',
  //     to: email,
  //     subject: 'Contact Form Submission',
  //     text: 'Thank you for contacting us! We will get back to you soon.',
  //   };

  //   transporter.sendMail(mailOptions, (error, info) => {
  //     if (error) {
  //       return console.log(error);
  //     }
  //     console.log('Message sent: %s', info.messageId);
  //   });

  res.send('Contact form submitted successfully');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

/**
 *
 * mongodb+srv://codescopedigital:<password>@cluster0.6fcl3.mongodb.net/
 * username:codescopedigital
 * pasword:Jl7GAbw7RFWdpACD
 */
