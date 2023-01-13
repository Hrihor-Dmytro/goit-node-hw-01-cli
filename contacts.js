const path = require("path");
const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve("./db/contacts.json");

// TODO: задокументувати кожну функцію
function listContacts() {
  (async () => {
    try {
      const data = await fs.readFile(contactsPath, "utf8");
      const contacts = JSON.parse(data);
      console.table(contacts);
    } catch (error) {
      console.error(error);
    }
  })();
}

function getContactById(contactId) {
  (async () => {
    try {
      const data = await fs.readFile(contactsPath, "utf8");
      const contacts = JSON.parse(data);
      const contact = contacts.find((item) => item.id === contactId);
      console.log(contact);
    } catch (error) {
      console.error(error);
    }
  })();
}

function removeContact(contactId) {
  (async () => {
    try {
      const data = await fs.readFile(contactsPath, "utf8");
      const contacts = JSON.parse(data);
      const deletedContactIndex = contacts.findIndex(
        ({ id }) => id === contactId
      );
      if (deletedContactIndex === -1) {
        throw Error("No such ID in contacts");
      }
      contacts.splice(deletedContactIndex, 1);
      const stringifyContacts = JSON.stringify(contacts);
      await fs.writeFile(contactsPath, stringifyContacts);
    } catch (error) {
      console.error(error);
    }
  })();
}

function addContact(name, email, phone) {
  (async () => {
    try {
      const data = await fs.readFile(contactsPath, "utf8");
      const contacts = JSON.parse(data);
      let maxId = uuidv4();
      contacts.push({ id: maxId, name, email, phone });
      await fs.writeFile(contactsPath, JSON.stringify(contacts));
    } catch (error) {
      console.error(error);
    }
  })();
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
