const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const borrowingHistoryRoutes = require('./routes/borrowingHistoryRoutes');

const dbConnect = require('./config/dbConfig'); // Import the database connection function
const app = express();
app.use(bodyParser.json());
dbConnect(); // Call the dbConnect function to establish the database connection
app.use('/api', userRoutes);
app.use('/api', bookRoutes);

app.use('/api', borrowingHistoryRoutes);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
