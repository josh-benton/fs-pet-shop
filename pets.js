let fs = require("fs");

let pets;
let option = process.argv[2];
let optIndex = process.argv[3];
let age;
let kind;
let name;
let updatedPets;

switch (option) {
  case "read":
    fs.readFile("pets.json", "utf-8", (error, data) => {
      pets = JSON.parse(data);
      let last = pets.length - 1;
      if (optIndex < 0 || optIndex > last) {
        console.error(`Usage: node pets.js read INDEX`);
      } else if (optIndex !== undefined) {
        console.log(pets[optIndex]);
      } else {
        console.log(pets);
      }
    });
    break;
  case "create":
    age = process.argv[3];
    kind = process.argv[4];
    name = process.argv[5];
    fs.readFile("pets.json", "utf-8", (error, data) => {
      pets = JSON.parse(data);
      if (age !== undefined && kind !== undefined && name !== undefined) {
        let obj = {};
        obj.age = Number(age);
        obj.kind = kind;
        obj.name = name;
        pets.push(obj);
        updatedPets = JSON.stringify(pets);
        fs.writeFile("pets.json", updatedPets, (error) => {
          if (error) throw error;
        });
      } else {
        console.error(`Usage: node pets.js create AGE KIND NAME`);
      }
    });
    break;
  case "update":
    age = process.argv[4];
    kind = process.argv[5];
    name = process.argv[6];
    fs.readFile("pets.json", "utf-8", (error, data) => {
      pets = JSON.parse(data);
      if (
        option !== undefined &&
        optIndex !== undefined &&
        age !== undefined &&
        kind !== undefined &&
        name !== undefined
      ) {
        updateObj = {};
        updateObj.age = Number(age);
        updateObj.kind = kind;
        updateObj.name = name;
        pets[optIndex] = updateObj;
        let updatedPet = JSON.stringify(pets);
        fs.writeFile("pets.json", updatedPet, (error) => {
          if (error) throw error;
        });
      } else {
        console.error(`Usage: node pets.js update INDEX AGE KIND NAME`);
      }
    });
    break;
  case "destroy":
    fs.readFile("pets.json", "utf-8", (error, data) => {
      pets = JSON.parse(data);
      if (optIndex !== undefined) {
        pets.splice(optIndex, 1);
        updatedPets = JSON.stringify(pets);
        fs.writeFile("pets.json", updatedPets, (error) => {
          if (error) throw error;
        });
      } else {
        console.error(`Usage: node pets.js destroy INDEX`);
      }
    });
    break;
  default:
    console.error(`Usage: node pets.js [read | create | update | destroy]`);
    process.exit(1);
}
