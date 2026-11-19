
function wrap<T>(item: T): T[] {
  return [item];
}

wrap(5);          
wrap("hi");       

interface Box<T> {
  content: T;
  label: string;
}



const numberBox: Box<number> = { content: 42, label: "answer" };
const namesBox: Box<string[]> = { content: ["Asha", "Ravi"], label: "names" };

console.log(`Number Box: ${numberBox.content}, Label: ${numberBox.label}`);
console.log(`Names Box: ${namesBox.content.join(", ")}, Label: ${namesBox.label}`);
