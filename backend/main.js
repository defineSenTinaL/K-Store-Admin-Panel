const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan')
//const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config();

const EmployeeRoute = require('./routes/employee')
const UserRoute = require('./routes/user')

mongoose.connect(process.env.MONGO_DB_URL, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
   if (err) {
      console.log(err.name, err.message); // display the cause of error for database conenction
      console.error('Error during mongoDB connection');
      console.log('UNHANDLED REJECTION!! 🤦‍♂️🤦‍♂️ ');
   } else {
      // console.log(mongoose.connections);
      console.log('MongoDB connected successfully');
   }
});

app.use(morgan('dev'))
app.use(express.json())

const PORT = process.env.port || 5000

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`)
})

app.use('/api/employee', EmployeeRoute)
app.use('/api/user', UserRoute)