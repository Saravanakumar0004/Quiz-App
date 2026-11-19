function add(a: number, b: number): number{
    return a + b;
}

console.log(`Addition of 5 and 10 is: ${add(5, 10)}`);


function greet(name:string,title?:string):string {
    if(title){
       return `Hello ${title} ${name}`;
    }
    return `Hello ${name}`;
}


console.log(greet("John"));
console.log(greet("John", "Mr."));


function calculatesalary(salary: number[], bonus: number): number {
    return salary.reduce((total, salary) => total + salary, 0) + bonus;
}


let totalSalary = calculatesalary([1000, 2000, 3000], 500);
console.log(`Total Salary: ${totalSalary}`);

function logMessage(msg: string): void {
  console.log(msg);
}

logMessage("Welcome to TypeScript");





function calculateTotalPrice(price:number, quantity:number, discount?:number, gstRate?:number):number{
    let total = price * quantity;
    if(discount){
        total = total - (total * discount / 100);
    }
    if(gstRate){
        total = total + (total * gstRate / 100);
    }
    return total;
}



console.log(`Total Price: ${calculateTotalPrice(100, 5)}`);
console.log(`Total Price with Discount: ${calculateTotalPrice(100, 5, 10)}`);
console.log(`Total Price with GST: ${calculateTotalPrice(100, 5, undefined, 18)}`);
console.log(`Total Price with Discount and GST: ${calculateTotalPrice(100, 5, 10, 18)}`);
