// appel objet mongoose, nécessaire pour mettre à disposition la base de données et le dialogue avec...
var mongoose = require('mongoose');

    // le schema est le modèle de données (en relationnel, ce sont les tables, ici ce sont des documents)
    Schema = mongoose.Schema;

var ScoreSchema = new Schema({

    point: {type: String},
	left: {type: String},
	time: {type: String},
	elapsed: {type: String},
	total: String,
    
});

mongoose.model('Score',ScoreSchema);