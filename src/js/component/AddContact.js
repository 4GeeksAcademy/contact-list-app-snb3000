import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate, useParams } from "react-router-dom";

const AddContact = () => {
  const { actions, store } = useContext(Context);
  const navigate = useNavigate();
  const { id } = useParams();

  const [contact, setContact] = useState({
    name: "", email: "", address: "", phone: ""
  });

  useEffect(() => {
    if (id) {
      const contactId = Number(id);
      const contactData = store.contacts.find((contact) => contact.id === contactId);
      if (contactData) {
        setContact(contactData);
      }
    }
  }, [id, store.contacts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await actions.updateContact(id, contact);
      } else {
        await actions.addContact(contact);
      }
      await actions.fetchContacts();
      navigate("/");
    } catch (error) {
      console.error(id ? "Error updating contact" : "Errora dding contact", error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center mt-5">{id ? "Update Contact" : "Add a New Contact"}</h1>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group mt-3">
          <label>Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Name"
            value={contact.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mt-2">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter email"
            value={contact.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mt-2">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            className="form-control"
            placeholder="Enter phone"
            value={contact.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mt-2">
          <label>Address</label>
          <input
            type="text"
            name="address"
            className="form-control"
            placeholder="Enter address"
            value={contact.address}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary form-control mt-4">
          {id ? "Update Contact" : "Save"}
        </button>
      </form>
      <a href="/">
        Or get back to contacts
      </a>
    </div>
  );
};

export default AddContact;
