const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rushi1212',
  database: 'task_tracker'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    throw err;
  }
  console.log('Connected to MySQL database');
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/tasks', (req, res) => {
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) {
      console.error('Error fetching tasks:', err);
      res.status(500).send('Error fetching tasks');
    } else {
      res.json(results);
    }
  });
});

app.post('/tasks', (req, res) => {
  const { title, description } = req.body;
  const task = { title, description };

  db.query('INSERT INTO tasks SET ?', task, (err, result) => {
    if (err) {
      console.error('Failed to add task:', err);
      res.status(500).send('Failed to add task');
    } else {
      console.log('Task added successfully');
      res.send('Task added successfully');
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
