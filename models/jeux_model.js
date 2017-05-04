// appel objet mongoose, nécessaire pour mettre à disposition la base de données et le dialogue avec...
var mongoose = require('mongoose');
// le schema est le modèle de données (en relationnel, ce sont les tables, ici ce sont des documents)
Schema = mongoose.Schema;

// instanciation du modèle de données (plus puissant qu'une table users :p )
var JeuxSchema = new Schema({
    nom: {type: String, unique: true},
    createur: {type: String},
    lien : {type: String}
});

// pour pouvoir faire appel au schéma ailleurs :
mongoose.model('game',JeuxSchema);