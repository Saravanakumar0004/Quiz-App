
type Size = "small" | "medium" | "large";


function getPrice(size: Size): number {
  switch (size) {
    case "small":
      return 50;
    case "medium":
      return 80;
    case "large":
      return 100;
  }
}


function toLabel(value: string | number): string {
  if (typeof value === "number") {
    return "#" + value;     
  }
  return value;              
}

getPrice("medium");          
toLabel(7);                  
toLabel("ready");            

console.log(`Price for medium size: ${getPrice("medium")}`);
console.log(`Label for number 7: ${toLabel(7)}`);
console.log(`Label for string "ready": ${toLabel("ready")}`);