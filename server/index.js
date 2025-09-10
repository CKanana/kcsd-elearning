const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

app.post('/api/courses', (req, res) => {
  const { title, description } = req.body;
  // In a real application, you would save the course to a database.
  console.log('Creating course:', { title, description });
  res.status(201).json({ id: Date.now(), title, description });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
