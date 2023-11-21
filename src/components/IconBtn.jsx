import { CaretCircleLeft, CaretCircleRight, PencilSimple, PlusCircle, TrashSimple } from "@phosphor-icons/react";
import "../styles/icon-btn.css"

const IconBtn = ({ icon, handleClick, disabled, iconSize }) => {
    const iconBtnCommon = {
        weight: "bold",
        color: "#776B5D",
    } 

  const iconsMap = {
    add: <PlusCircle size={iconSize} {...iconBtnCommon} />,
    edit: <PencilSimple size={iconSize} {...iconBtnCommon} />,
    delete: <TrashSimple size={iconSize} {...iconBtnCommon} />,
    left: <CaretCircleLeft size={iconSize} {...iconBtnCommon} />,
    right: <CaretCircleRight size={iconSize} {...iconBtnCommon} />
  };
  const iconBtn = iconsMap[icon];
  return <button className="icon-btn" disabled={disabled} onClick={handleClick}>{iconBtn}</button>;
};

export default IconBtn;
