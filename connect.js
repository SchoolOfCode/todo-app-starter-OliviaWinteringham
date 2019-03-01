const mongodb = require("mongodb");

let uri =
  "mongodb+srv://appservice:appservice@cluster0-iba3x.mongodb.net/toDo?retryWrites=true";
function connect(database) {
  return mongodb.MongoClient.connect(uri).then(client => {
    return client.db(database);
  });
}

module.exports = connect;
