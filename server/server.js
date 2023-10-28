const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/notes', require('./routes/noteRoutes'));

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log('Server Listening');
});
