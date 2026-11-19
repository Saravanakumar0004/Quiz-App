
interface Pet {
  id: number;
  name: string;
  owner?: string;          
  species: string;
}


interface Dog extends Pet {
  tricks: number;
}


function printPet(p: Pet): void {
  console.log(p.id, p.name, p.species);

  if (p.owner) {
    console.log("Owner:", p.owner);
  } else {
    console.log("No owner");
  }
}


type Toy = { readonly id: number; label: string; price: number };

const dog: Dog = { id: 1, name: "Rex", species: "dog", tricks: 3 };
printPet(dog);             

const ball: Toy = { id: 5, label: "Ball", price: 50 };
ball.price = 60;           