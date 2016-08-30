"use strict";

(function(){
  angular
  .module("dogs", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    "$locationProvider",
    "$urlRouterProvider",
    Router
  ])
  .factory("Dog", [
    "$resource",
    Dog
  ])
  .controller("dogIndexCtrl", [
    "Dog",
    dogIndexCtrl
  ])
  .controller("dogShowCtrl", [
    "Dog",
    "$stateParams",
    "$window",
    dogShowCtrl
  ]);

  function Router($stateProvider, $locationProvider, $urlRouterProvider){
    $locationProvider.html5Mode(true);
    $stateProvider
    .state("welcome", {
      url: "/",
      templateUrl: "/assets/html/dogs-welcome.html"
    })
    .state("index", {
      url: "/dogs",
      templateUrl: "/assets/html/dogs-index.html",
      controller: "dogIndexCtrl",
      controllerAs: "indexVM"
    })
    .state("show", {
      url: "/dogs/:name",
      templateUrl: "/assets/html/dogs-show.html",
      controller: "dogShowCtrl",
      controllerAs: "showVM"
    });
    $urlRouterProvider.otherwise("/");
  }

  function Dog($resource){
    var Dog = $resource("/api/dogs/:name", {}, {
      update: {method: "PUT"}
    });
    console.log(Dog.query());
    Dog.all = Dog.query();
    Dog.find = function(property, value, callback){
      Dog.all.$promise.then(function(){
        Dog.all.forEach(function(dog){
          if(dog[property] == value) callback(dog);
        });
      });
    }
    return Dog;
  }

  function dogIndexCtrl(Dog){
    var vm = this;
    vm.dogs = Dog.all;
    console.log();
  }

  function dogShowCtrl(Dog, $stateParams, $window){
    var vm = this;
    Dog.find("name", $stateParams.name, function(dog){
      vm.dog = dog;
    });
    vm.update = function(){
      Dog.update({name: vm.dog.name}, {dog: vm.dog}, function(){
        console.log("Done!");
      });
    }
    vm.delete = function(){
      Dog.remove({name: vm.dog.name}, {dog: vm.dog}, function(){
        console.log("dog gone");
        console.log("get it");
        $window.location.replace("/");
      })
    }
    vm.addPet = function(){
      if (vm.dog.pets.includes(vm.newPet)){
        console.log("they already have this one! invent a NEW pet");
      }
      else {
        vm.dog.pets.push(vm.newPet);
        vm.newPet = "";
        vm.update();
      }
    }
    vm.removePet = function($index){
      vm.dog.pets.splice($index, 1);
      vm.update();
    }
  }
})();
