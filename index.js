import { program } from "commander";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "./contacts.js";
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case "get":
      const contact = await getContactById(id);
      if (!contact) {
        console.log(`Contact with id=${id} not found`);
        console.log(contact);
        break;
      }
      console.log(contact);
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      const deletedContact = await removeContact(id);
      if (!deletedContact) {
        console.log(`Contact with id=${id} not found`);
        console.log(deletedContact);
        break;
      }
      console.log(deletedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
