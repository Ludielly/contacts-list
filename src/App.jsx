import { useEffect, useState } from "react";
import Modal from "./components/Modal";
import "./styles/app.css";
import Contact from "./components/Contact";
import IconBtn from "./components/IconBtn";
import Input from "./components/Input";
import { useMediaQuery } from "react-responsive";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [modalType, setModalType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  
  const mediumScreen = useMediaQuery({maxWidth: 1050})
  const smallScreen = useMediaQuery({maxWidth: 764})
  const extraSmallScreen = useMediaQuery({maxWidth: 425})
  const contactsPerPage = extraSmallScreen ? 4 : smallScreen ? 8 : mediumScreen ? 12 : 20
  
  const firstContact = (currentPage - 1) * contactsPerPage;
  const lastContact = firstContact + contactsPerPage;
  const alphabeticalOrder = [...contacts].sort((a, b) => a.name.localeCompare(b.name));
  const currentContacts = alphabeticalOrder.slice(firstContact, lastContact);
  const totalPages = Math.ceil(contacts.length / contactsPerPage);
  const searchContacts = currentContacts.filter((contact) => contact.name.toLowerCase().includes(search.toLowerCase())) 

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const setSelectedContactNull = () => {
    setSelectedContact(null);
  };

  const addedContact = (contact) => {
    const updatedContacts = [...contacts, contact];
    setContacts(updatedContacts);
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));
  };

  const handleSelectContact = (contact) => {
    if (selectedContact) {
      if (contact.id !== selectedContact.id) {
        setSelectedContact(contact);
      } else {
        setSelectedContactNull();
      }
    } else {
      setSelectedContact(contact);
    }
  };

  const handleDeleteContact = (id) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(updatedContacts);
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));
    setSelectedContactNull();
    closeModal();
  };

  const openModal = (content) => {
    setModalType(content);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem("contacts")) || [];
    setContacts(storedContacts);
  }, []);


  return (
    <>
      <div className="app">
        <div className="app-header">
          <div className="header-actions">
            <h1>Contatos</h1>
            <div className="actions-box">
              <IconBtn
                icon="add"
                iconSize={20}
                disabled={selectedContact}
                handleClick={() => openModal("add")}
              />
              <IconBtn
                icon="edit"
                iconSize={20}
                disabled={!selectedContact}
                handleClick={() => openModal("edit")}
              />
              <IconBtn
                icon="delete"
                iconSize={20}
                disabled={!selectedContact}
                handleClick={() => openModal("delete")}
              />
            </div>
          </div>
          <Input
            className="search-input"
            icon="search"
            placeholder="Filtrar por nome de contato..."
            handleChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
        <ul className="app-body">
          {searchContacts.map((contact) => (
            <Contact
              key={contact.id}
              contact={contact}
              handleSelectContact={handleSelectContact}
              selectedContact={selectedContact}
            />
          ))}
        </ul>
        <div className="pagination">
          <IconBtn
            icon="left"
            iconSize={24}
            handleClick={handlePrevPage}
            disabled={firstContact === 0 || totalPages === 0}
          />
          <span className={totalPages === 0 ? "disabled" : undefined}>
            {currentPage <= totalPages ? currentPage : "0"} / {totalPages}
          </span>
          <IconBtn
            icon="right"
            iconSize={24}
            handleClick={handleNextPage}
            disabled={currentPage >= totalPages}
          />
        </div>
      </div>

      {modalOpen && (
        <Modal
          closeModal={closeModal}
          addedContact={addedContact}
          contacts={contacts}
          selectedContact={selectedContact}
          modalType={modalType}
          handleDeleteContact={handleDeleteContact}
          setSelectedContactNull={setSelectedContactNull}
        />
      )}
    </>
  );
}

export default App;
