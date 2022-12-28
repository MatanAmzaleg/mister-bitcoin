import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux'
import { contactService } from "../services/contact.service";
import { NavLink, withRouter } from "react-router-dom";
import { IMaskInput } from "react-imask";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import { addContact, getContact } from "../store/actions/contact.actions";
import { useSelector } from "react-redux";

export function ContactEdit(props) {
  const [contactToSave, setContactToSave] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        const id = props.match.params.id;
        const contact = await dispatch(getContact(id));
        setContactToSave(contact);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [dispatch]);

  const handleChange = ({ target }) => {
    const field = target.name;
    let value = target.value;
    switch (target.type) {
      case "number":
      case "range":
        value = +value;
        break;
      case "checkbox":
        value = target.checked;
        break;
      default:
        break;
    }
    setContactToSave({
      ...contactToSave,
      [field]: value,
    });
  };

  const onAddContact = async (ev) => {
    ev.preventDefault();
    try {
      await dispatch(addContact({ ...contactToSave }));
      props.history.push("/contacts");
    } catch (err) {
      console.log("err:", err);
    }
  };

  if (!contactToSave)
    return (
      <img
        className="loader"
        src={require("../assets/imgs/loader.gif")}
        alt=""
      />
    );
  const { name, email, phone } = contactToSave;
  return (
    <section className="contact-edit">
      <h1>{contactToSave._id ? "Edit" : "Add"} Contact</h1>
      <form className="edit-form" onSubmit={onAddContact}>
        <label htmlFor="name">
          Name:
          <Input
            id="name"
            onChange={handleChange}
            value={name}
            type="text"
            name="name"
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
          />
        </label>
        <label htmlFor="email">
          Email:
          <Input
            onChange={handleChange}
            value={email}
            type="text"
            name="email"
            id="email"
          />
        </label>
        <label htmlFor="phone">
          Phone:
          <Input
            onChange={handleChange}
            value={phone}
            name="phone"
            id="phone"
          />
        </label>

        <Button type="submit" variant="outlined">
          Save
        </Button>
      </form>
    </section>
  );
}
