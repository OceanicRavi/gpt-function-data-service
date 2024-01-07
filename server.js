const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { gptFunctions, findFunctionById, addFunction, updateFunction, deleteFunction, findAndMapFunctionById  } = require('./data');
const app = express();
const port = 3001;

app.use(cors({
    origin: 'http://localhost:3000'
}));

  
app.use(bodyParser.json());

// GET all functions
app.get('/api/functions', (req, res) => {
  res.json(gptFunctions);
});

// GET a single function by id
app.get('/api/functions/:id', (req, res) => {
  const functionRecord = findFunctionById(req.params.id);
  if (functionRecord) {
    res.json(functionRecord);
  } else {
    res.status(404).send('Function not found');
  }
});

// GET a single mapped function by id
app.get('/api/mapped-functions/:id', (req, res) => {
  const functionRecord = findAndMapFunctionById(req.params.id);
  if (functionRecord) {
    res.json(functionRecord);
  } else {
    res.status(404).send('Function not found');
  }
});

// POST a new function
app.post('/api/functions', (req, res) => {
  const newFunction = addFunction(req.body);
  res.status(201).json(newFunction);
});

// PUT an update to an existing function
app.put('/api/functions/:id', (req, res) => {
  const updatedFunction = updateFunction(req.params.id, req.body);
  if (updatedFunction) {
    res.json(updatedFunction);
  } else {
    res.status(404).send('Function not found');
  }
});

// DELETE a function
app.delete('/api/functions/:id', (req, res) => {
    const isDeleted = deleteFunction(req.params.id);
    if (isDeleted) {
      res.status(200).send('Function deleted successfully');
    } else {
      res.status(404).send('Function not found');
    }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
