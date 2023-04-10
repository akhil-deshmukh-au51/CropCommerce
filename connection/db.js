const mongoose = require('mongoose');

function connect() {
 mongoose.connect('mongodb+srv://sahil:sahil123@cluster0.msvdj9m.mongodb.net/myapp?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;

  db.on('error', (err) => {
    console.error('Failed to connect to database:', err);
  });

  db.once('open', () => {
    console.log('Connected to database');
  });
}


module.exports = { connect };
