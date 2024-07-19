import React, { useState, useContext } from "react";
import { Context } from "../store/flux";
import { useHistory, useParams } from "react-router-dom";

const AddContact = () => {
  const { actions, contacts } = useContext(Context);
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const contactToEdit = contacts.find((contact) => contact.id === id);
      if (contactToEdit) {
        setContact(contactToEdit);
      }
    }
  }, [id, contacts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      actions.updateContact(id, contact);
    } else {
      actions.addContact(contact);
    }
    history.push("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={contact.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="email"
        name="email"
        value={contact.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        type="text"
        name="phone"
        value={contact.phone}
        onChange={handleChange}
        placeholder="Phone"
      />
      <button type="submit">{id ? "Update" : "Add"} Contact</button>
    </form>
  );
};

export default AddContact;
