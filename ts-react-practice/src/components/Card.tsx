import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode; 
}

function Card({ children }: CardProps) {
  return (
    <div
      style={{
        border: "1px solid #dddddd",
        borderRadius: 12,
        padding: 16,
        margin: 12,
      }}
    >
      {children}
    </div>
  );
}

export default Card;