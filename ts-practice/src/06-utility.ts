type Book = { readonly id: number; title: string; pages: number };

type NewBook = Omit<Book, "id">;                 
type BookPreview = Pick<Book, "id" | "title">;   
type BookUpdate = Partial<Book>;                
type LockedBook = Readonly<Book>;                
type Attendance = Record<"Mon" | "Tue", number>; 

const draft: NewBook = { title: "Maps", pages: 120 };           
const preview: BookPreview = { id: 1, title: "Maps" };
const change: BookUpdate = { pages: 150 };                      
const week: Attendance = { Mon: 20, Tue: 18 };

console.log(`Draft: ${draft.title}, Pages: ${draft.pages}`);
console.log(`Preview: ID: ${preview.id}, Title: ${preview.title}`);
console.log(`Change: Pages: ${change.pages}`);
console.log(`Attendance: Mon: ${week.Mon}, Tue: ${week.Tue}`);