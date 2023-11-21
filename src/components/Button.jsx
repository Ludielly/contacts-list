import "../styles/button.css";

const Button = ({ children, handleClick, btnSecondary, disabled }) => {
  return (
    <button
      onClick={handleClick}
      className={`btn ${btnSecondary ? "btn-secondary" : "btn-primary"}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
