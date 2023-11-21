import "../styles/contact.css";
import { User, Check } from "@phosphor-icons/react";

const Contact = ({ contact, handleSelectContact, selectedContact }) => {
  return (
    <li className={`contact ${selectedContact && selectedContact.id === contact.id ? "selected" : ""}`} onClick={() => handleSelectContact(contact)}>
      <div
        className="contact-icon"
        style={{ backgroundColor: contact.bgColor }}
      >
        {selectedContact && selectedContact.id === contact.id ? (
          <Check weight="bold" size={20} color="#EEF5FF" />
        ) : (
          <User weight="bold" size={20} color="#EEF5FF" />
        )}
      </div>
      <div className="contact-data">
        <p>{contact.name}</p>
        <span>{contact.phone}</span>
      </div>
    </li>
  );
};
export default Contact;
