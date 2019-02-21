'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;

mongoose.connect('mongodb://localhost:27017/alquiler-fiestas-eventos',{
  connectTimeoutMS: 1000,  useNewUrlParser: true
  // Note that mongoose will **not** pull `bufferCommands` from the query string
}).then(
  () => {
	  console.log("La conexión a la base de datos está funcionando correctamente...");

	  app.listen(port, function(){
		  console.log("Servidor del api rest de musica escuchando en http://localhost:"+port);
	  });
  },
  err => { console.error.bind(console, 'MongoDB connection error:',err)}
);
