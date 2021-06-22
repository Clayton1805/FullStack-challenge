const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL || 'mongodb://localhost', {
  dbName: process.env.DB_NAME || 'EscolaAMais',
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB conectado');
  })
  .catch((err) => {
    console.log(`MongoDB error in connect ${err}`);
  });
