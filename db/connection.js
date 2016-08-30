var mongoose  = require("mongoose");

var DogSchema = new mongoose.Schema(
  {
    name: String,
    breed: String,
    pets: [String]
  }
);
var PetSchema = new mongoose.Schema(
  {
    technique: String
  }
);


mongoose.model("Dog", DogSchema);
mongoose.model("Pet", PetSchema);

mongoose.connect("mongodb://localhost/petly");

module.exports = mongoose;
