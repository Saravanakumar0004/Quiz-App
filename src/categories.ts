export interface Category {
  id: string;
  name: string;
}

export const categories: Category[] = [
  { id: "9", name: "General Knowledge" },
  { id: "17", name: "Science & Nature" },
  { id: "18", name: "Computers" },
  { id: "23", name: "History" },
];


export function getCategoryName(id: string): string {
  if (id === "") return "Any Category";

  const found = categories.find((item) => item.id === id);
  return found ? found.name : "";
}