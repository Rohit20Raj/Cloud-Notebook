const express = require('express')
const app = express()
const connectToMongo = require('./db');
const cors = require('cors');
const port = 5000

connectToMongo();

app.use(cors());
app.use(express.json());
// Available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on: http://localhost:${port}`)
})