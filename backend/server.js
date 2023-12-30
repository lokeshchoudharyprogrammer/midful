const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors')

const app = express();
const PORT = process.env.PORT || 3100;
app.use(cors())
// Connect to MongoDB
mongoose.connect('mongodb+srv://lokesh:lokeshcz@cluster0.dsoakmx.mongodb.net/middatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Middleware
app.use(bodyParser.json());

// Task Model
// {
//     userName: 'JohnDoe',
//     mobile: '123-456-7890',
//     email: 'john.doe@example.com',
// }

const taskSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    mobile: { type: Number, required: true },
    email: { type: String, required: true },
});

const Task = mongoose.model('Task', taskSchema);

// Routes

// Get all tasks
app.get("/", (req, res) => {
    res.send("<h1>Welcome to 2024</h1>")
})
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a specific task
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
        email: req.body.email
    });

    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a task
app.put('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;

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

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
