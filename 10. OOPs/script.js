"use strict";

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

const Sunny = new Person("Sunny", 1997);
const Shalu = new Person("Shalu", 1995);

console.log(Sunny);
console.log(Sunny instanceof Person);
