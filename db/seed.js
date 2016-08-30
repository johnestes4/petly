var mongoose  = require("./connection");
var seedData  = require("./seeds");

var DogModel = mongoose.model('Dog')
var PetModel = mongoose.model('Pet')
// PetModel.remove({}, function(err){
// })

DogModel.remove({}).then(function(){
  DogModel.collection.insert(seedData).then(function(){
    process.exit();
  });
})


// PetModel.remove({}, function(err){
// })
//
// var django = new DogModel(
//   {name: "Django"}, {breed: "Portuguese Water Dog"}
// )
// var tigg = new DogModel(
//   {name: "Tigg"}, {breed: "Labrador"}
// )
// var puppins = new DogModel(
//   {name: "Puppins"}, {breed: "Sheltie"})
//
// var pet1 = new PetModel({technique: "tummy scratches"})
// var pet2 = new PetModel({technique: "head rubs"})
// var pet3 = new PetModel({technique: "chin scratches"})
// var pet4 = new PetModel({technique: "down the back pets"})
// var pet5 = new PetModel({technique: "butt scratching"})
// var pet6 = new PetModel({technique: "xtreme tummy scratches"})
//
// var dogs = [django, tigg, puppins]
// var pets = [pet1, pet2, pet3, pet4, pet5, pet6]
//
// for(var i = 0; i < dogs.length; i++){
//   dogs[i].pets.push(pets[i], pets[i+3])
//   dogs[i].save(function(err){
//     if (err){
//       console.log(err)
//     }else {
//       console.log("dog was saved")
//     }
//   })
// }
