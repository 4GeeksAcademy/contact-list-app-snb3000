import { createContext, useState } from "react";
const Context = createContext(null);

const StoreWrapper = (props) => {
  const [state, setState] = useState({
    contacts: [],
    actions: {
      fetchContacts: async () => {
        const response = await fetch(
          "https://playground.4geeks.com/contact/docs"
        );
        const data = await response.json();
        setState((prevState) => ({
          ...prevState,
          contacts: data,
        }));
      },
      addContact: async (contact) => {
        const response = await fetch(
          "https://playground.4geeks.com/contact/docs",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(contact),
          }
        );
        const newContact = await response.json();
        setState((prevState) => ({
          ...prevState,
          contacts: [...prevState.contacts, newContact],
        }));
      },
      updateContact: async (id, updatedContact) => {
        const response = await fetch(
          `https://playground.4geeks.com/contact/docs/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedContact),
          }
        );
        const updatedData = await response.json();
        setState((prevState) => ({
          ...prevState,
          contacts: prevState.contacts.map((contact) =>
            contact.id === id ? updatedData : contact
          ),
        }));
      },
      deleteContact: async (id) => {
        await fetch(`https://playground.4geeks.com/contact/docs/${id}`, {
          method: "DELETE",
        });
        setState((prevState) => ({
          ...prevState,
          contacts: prevState.contacts.filter((contact) => contact.id !== id),
        }));
      },
    },
  });

  return <Context.Provider value={state}>{props.children}</Context.Provider>;
};

export { Context, StoreWrapper };
