interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

function Button({ label, onClick, variant = "primary" }: ButtonProps) {
  const color = variant === "primary" ? "#6c5ce7" : "#888888";

  return (
    <button
      onClick={onClick}
      style={{
        background: color,
        color: "white",
        padding: "8px 16px",
        border: "none",
        borderRadius: 8,
        margin: 4,
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}

export default Button;