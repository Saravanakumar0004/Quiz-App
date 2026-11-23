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

// "18" -> "Computers"
export function getCategoryName(id: string): string {
  const found = categories.find((item) => item.id === id);
  return found ? found.name : "";
}