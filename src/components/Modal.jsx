import { X } from "@phosphor-icons/react";
import Button from "./Button";
import Input from "./Input";
import "../styles/modal.css";
import { useState } from "react";
import { v4 as uuid } from "uuid";

const Modal = ({ closeModal, addedContact, selectedContact, modalType, handleDeleteContact, setSelectedContactNull }) => {
  const [name, setName] = useState(selectedContact ? selectedContact.name : "");
  const [phone, setPhone] = useState(selectedContact ? selectedContact.phone : "");

  const colors = [
    "rgb(8 47 183)",
    "rgb(22, 64, 214)",
    "rgb(237, 90, 179)",
    "rgb(248, 117, 170)",
    "rgb(187 82 130)",
    "rgb(119, 107, 93)",
    "rgb(133 178 117)",
    "rgb(85, 124, 85)",
    "rgb(250, 112, 112)",
    "rgb(22, 72, 99)",
    "rgb(66, 125, 157)",
    "rgb(89 145 180)",
    "rgb(0, 169, 255)",
    "rgb(62 164 194)",
    "rgb(125 169 109)",
    "rgb(85, 88, 67)",
    "rgb(20 61 74)",
    "rgb(158 136 105)",
    "rgb(209 69 69)",
    "rgb(199, 0, 57)",
    "rgb(180 6 81)",
    "rgb(0, 66, 37)",
    "rgb(187 129 0)",
    "rgb(136 132 132)",
    "rgb(70 64 64)",
    "rgb(129 12 24)",
  ];

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const [backgroundColor, setBackgroundColor] = useState(getRandomColor());

  const changeBackgroundColor = () => {
    const newColor = getRandomColor();
    setBackgroundColor(newColor);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedContact) {
      selectedContact.name = name;
      selectedContact.phone = phone;
      setSelectedContactNull()
    } else {
      changeBackgroundColor();
      addedContact({
        id: uuid(),
        name,
        phone,
        bgColor: backgroundColor,
      });
    }
    closeModal();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e)
    }
  }

  let modalTitle;
  let modalContent;
  switch (modalType) {
    case "add":
      modalTitle = "Adicionar contato";
      modalContent = (
        <form className="modal-form" onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
          <Input
            placeholder="Nome"
            inputValue={name}
            handleChange={(e) => setName(e.target.value)}
            icon="name"
            required
          />
          <Input
            placeholder="Telefone"
            inputValue={phone}
            handleChange={(e) => setPhone(e.target.value)}
            icon="phone"
            required
          />
          <div className="modal-btn">
            <Button btnSecondary={true} handleClick={closeModal}>
              Cancelar
            </Button>
            <Button>Adicionar</Button>
          </div>
        </form>
      );
      break;

    case "edit":
      modalTitle = "Editar contato";
      modalContent = (
        <form className="modal-form" onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
          <Input
            placeholder="Nome"
            inputValue={name}
            handleChange={(e) => setName(e.target.value)}
            icon="name"
            required
          />
          <Input
            placeholder="Telefone"
            inputValue={phone}
            handleChange={(e) => setPhone(e.target.value)}
            icon="phone"
            required
          />
          <div className="modal-btn">
            <Button btnSecondary={true} handleClick={closeModal}>
              Cancelar
            </Button>
            <Button>Salvar</Button>
          </div>
        </form>
      );
      break;

    case "delete":
      modalTitle = "Deletar contato?";
      modalContent = (
        <>
          <p>
            Ao confirmar, o contato <span style={{color: selectedContact.bgColor}}>{selectedContact.name}</span> será
            deletado e não poderá ser recuperado.
          </p>
          <div className="modal-btn">
            <Button btnSecondary={true} handleClick={closeModal}>
              Cancelar
            </Button>
            <Button handleClick={() => handleDeleteContact(selectedContact.id)}>Confirmar</Button>
          </div>
        </>
      );
      break;
  }

  return (
    <div className="modal">
      <dialog>
        <div className="modal-title">
          <h1>{modalTitle}</h1>
          <X color="black" weight="bold" size={16} onClick={closeModal} />
        </div>
        {modalContent}
      </dialog>
    </div>
  );
};

export default Modal;
