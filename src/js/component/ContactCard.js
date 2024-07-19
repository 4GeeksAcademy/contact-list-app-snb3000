import React, { useContext } from "react";
import { Context } from "../store/flux";
import { Link } from "react-router-dom";

const ContactCard = ({ contact }) => {
  const { actions } = useContext(Context);

  return (
    <div>
      <h3>{contact.name}</h3>
      <p>{contact.email}</p>
      <p>{contact.phone}</p>
      <Link to={`/edit/${contact.id}`}>Edit</Link>
      <button onClick={() => actions.deleteContact(contact.id)}>Delete</button>
    </div>
  );
};

export default ContactCard;
