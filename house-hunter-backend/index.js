const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB (replace 'your-mongodb-uri' with your actual MongoDB URI)
// rafikk1998rk - ExO06r5E55dgKiqA
mongoose
    .connect('mongodb+srv://rafikk1998rk:ExO06r5E55dgKiqA@my-cluster.qrwmyur.mongodb.net/?retryWrites=true&w=majority', { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    })
    .then(() => console.log("DB Connected successfully!"))
    .catch(e => console.log(e.message))

app.use(cors());
app.use(bodyParser.json());

// Routes
const authRoutes = require('./src/routes/auth');
const houseOwnerRoutes = require('./src/routes/houseOwner');
const houseRenterRoutes = require('./src/routes/houseRenter');
const houseRoutes = require('./src/routes/house');

app.use('/api/auth', authRoutes);
app.use('/api/houseowners', houseOwnerRoutes);
app.use('/api/houserenters', houseRenterRoutes);
app.use('/api/houses', houseRoutes);

app.get('/', (req, res) => {
    console.log('Server up and running!');
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
