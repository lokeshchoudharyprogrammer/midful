const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors')
const session = require('express-session');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3100;
app.use(cors())
// Connect to MongoDB
mongoose.connect('mongodb+srv://lokesh:lokeshcz@cluster0.dsoakmx.mongodb.net/middatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Middleware
app.use(bodyParser.json());

const taskSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    mobile: { type: Number, required: true },
    email: { type: String, required: true },
    userId: { type: String, required: true }

});


const Task = mongoose.model('Task', taskSchema);
const userSchema = new mongoose.Schema({
    name: String,
    password: String,

    email: String,
    phone: String,
    gender: String,
    hearAbout: [String],
    city: String,
    state: String,
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.json());

// Set up RESTful routes
app.post('/register', async (req, res) => {
    console.log(req.body)
    try {
        const { name, password, email, phone, gender, hearAbout, city, state } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            name,
            password: hashedPassword,

            email,
            phone,
            gender,
            hearAbout,
            city,
            state
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        console.error('Registration failed:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.use(session({
    secret: 'yourSecretKey', // Change this to a strong, random secret
    resave: true,
    saveUninitialized: false,
}));

app.use((req, res, next) => {
    console.log('Current userId in session:', req.session.userId);
    next();
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user in the database
        const user = await User.findOne({ email });
        req.session.userId = user._id;
        // Check if the user exists and the password is correct
        if (user && (await bcrypt.compare(password, user.password))) {
            // Generate a JWT token

            const token = jwt.sign({ userId: user._id }, 'yourSecretKey', { expiresIn: '10h' });

            // Send the token in the response
            res.status(200).json({ message: 'Login successful', token, user });
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Login failed:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get("/", (req, res) => {
    res.send("<h1>Welcome to 2024</h1>")
})


app.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new task
app.post('/tasks', async (req, res) => {
    const task = new Task({
        userName: req.body.userName,
        mobile: req.body.mobile,
        email: req.body.email,
        userId: req.body.userId
    });

    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a task
app.patch('/tasks/:id', async (req, res) => {
    console.log(req.params.id)
    try {
        const task = await Task.findById({ _id: req.params.id });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.userName = req.body.userName || task.userName;
        task.mobile = req.body.mobile || task.mobile;
        task.email = req.body.email || task.email;
        task.userId = req.body.userId || task.userId;

        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
    console.log(req.params.id)
    try {
        const task = await Task.deleteOne({ _id: req.params.id })
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }


        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/tasks', async (req, res) => {
    try {
        // Fetch filter options from query parameters
        const { sort, searchBy, searchTerm, userId } = req.query;

        let query = { userId };

        if (searchTerm) {
            // If search term is provided, filter by name, mobile, or email
            query[searchBy] = { $regex: searchTerm, $options: 'i' };
        }

        const tasks = await Task.find(query).sort(getSortOption(sort));
        res.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Update filter options
app.post('/filter', (req, res) => {
    const { sort, searchBy } = req.body;

    // Log filter options for debugging
    console.log('Received filter options:', { sort, searchBy });

    res.json({ message: 'Filter options updated successfully' });
});

// Helper function to get the sorting option
function getSortOption(sort) {
    switch (sort) {
        case 'A-Z':
            return { title: 1 };
        case 'Z-A':
            return { title: -1 };
        case 'lastModified':
            return { updatedAt: -1 };
        case 'lastInserted':
        default:
            return { createdAt: -1 };
    }
}


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
