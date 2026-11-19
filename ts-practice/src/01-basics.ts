
let name = "saravana";
let age = 22;
let isTrainee = true;

let skills:string[] = ["JavaScript", "TypeScript", "Node.js"];

let location: [string, number] = ["Villupuram", 600001];

let CompanyName: string = "HEPL";

let employee: { name: string; age: number; isTrainee: boolean; skills: string[]; location: [string, number]; company: string } = {
    name: name,
    age: age,
    isTrainee: isTrainee,
    skills: skills,
    location: location,
    company: CompanyName
};

console.log(`Employee Name: ${employee.name}`);
console.log(`Employee Age: ${employee.age}`);
console.log(`Is Trainee: ${employee.isTrainee}`);
console.log(`Employee Skills: ${employee.skills.join(", ")}`);
console.log(`Employee Location: ${employee.location[0]}, ${employee.location[1]}`);
console.log(`Company Name: ${employee.company}`);

