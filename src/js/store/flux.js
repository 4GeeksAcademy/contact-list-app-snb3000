const getState = ({ getStore, setStore }) => {
  const handleResponse = (response) => {
    if (!response.ok) throw Error(response.statusText);
    return response.text().then((text) => (text ? JSON.parse(text) : {}));
    // return response.json();
  };

  return {
    store: {
      contacts: [],
    },
    actions: {
      fetchContacts: () => {
        fetch("https://playground.4geeks.com/contact/agendas/NAME/contacts")
          .then(handleResponse)
          .then((data) => {
            console.log("Fetched contacts data:", data); // Log fetched data
            if (Array.isArray(data.contacts)) {
              setStore({ contacts: data.contacts });
              console.log("Contacts set in store:", data.contacts);
            } else {
              console.error("Fetched data is not an array:", data);
              setStore({ contacts: [] });
            }
          })
          .catch((error) => {
            console.error("Fetching contacts failed:", error);
            getState({ getStore, setStore }).actions.addAgendaSlug();
          });
      },
      addAgendaSlug: () => {
        fetch("https://playground.4geeks.com/contact/agendas/NAME", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        })
          .then(handleResponse)
          .then((data) => {
            console.log("Agenda added successfully:", data);
            getState({ getStore, setStore }).actions.fetchContacts();
          })
          .catch((error) => console.error("Adding agenda slug failed:", error));
      },
      addContact: (contactData) => {
        fetch("https://playground.4geeks.com/contact/agendas/NAME/contacts",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(contactData),
          }
        )
          .then(handleResponse)
          .then(() => getState({ getStore, setStore }).actions.fetchContacts())
          .catch((error) => console.error('Adding contact failed:', error));
      },
      updateContact: (id, updatedContact) => {
        fetch(`https://playground.4geeks.com/contact/agendas/NAME/contacts/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedContact),
          }
        )
          .then(handleResponse)
          .then(() => getState({ getStore, setStore }).actions.fetchContacts())
          .catch((error) => console.error('Editing contact failed:', error));
      },
      deleteContact: (id) => {
        fetch(`https://playground.4geeks.com/contact/agendas/NAME/contacts/${id}`, {
          method: "DELETE",
        })
          .then(handleResponse)
          .then(() => getState({ getStore, setStore }).actions.fetchContacts())
          .catch((error) => console.error('Deleting contact failed:', error));
      },
    },
  };
};

export default getState;