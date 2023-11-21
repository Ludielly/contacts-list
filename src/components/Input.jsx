import ReactInputMask from "react-input-mask";
import "../styles/input.css";
import { MagnifyingGlass, Phone, User } from "@phosphor-icons/react";

const Input = ({ placeholder, inputValue, handleChange, icon, required }) => {
  const iconsCommon = {
    weight: "bold",
    color: "#a59e91",
    size: "18",
  };
  const inputIconMap = {
    name: <User {...iconsCommon} />,
    phone: <Phone {...iconsCommon} />,
    search: <MagnifyingGlass {...iconsCommon} />
  };
  const inputIcon = inputIconMap[icon];

  const inputCommonProps = {
    value: inputValue,
    onChange: handleChange,
    placeholder: placeholder,
  };
  return (
    <div className="input">
      {inputIcon}
      {icon === "phone" ? (
        <ReactInputMask
          mask="(99) 99999-9999"
          required={required}
          {...inputCommonProps}
        />
      ) : (
        <input required={required} {...inputCommonProps}></input>
      )}
    </div>
  );
};

export default Input;
