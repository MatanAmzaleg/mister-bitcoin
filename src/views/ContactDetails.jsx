import { useState, useEffect } from "react";
import { contactService } from "../services/contact.service";
import { NavLink, withRouter } from "react-router-dom";

export function ContactDetails(props) {
  const [contact, setContact] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const contact = await contactService.getContactById(props.match.params.id);
      setContact(contact);
    }
    fetchData();
  }, []);

  if (!contact) return <img className="loader" src={require('../assets/imgs/loader.gif')} alt="" />;
  return (
    <section className="contact-details">
      <section>
        <img
          className="user-img"
          src={`https://robohash.org/${contact._id}?set=set5`}
          alt=""
        />
      </section>
      <section>
        <h3>
          <span className="bolder">Name:</span> {contact.name}
        </h3>
      </section>
      <section>
        <h3>
          <span className="bolder">Email:</span> {contact.email}
        </h3>
      </section>
      <section>
        <h3>
          <span className="bolder">Phone:</span> {contact.phone}
        </h3>
      </section>
      <div className="links flex">
        <NavLink to={"/contacts"}>Back</NavLink>
        <NavLink to={`/contact/edit/${contact._id}`}>Edit</NavLink>
        <NavLink to={`/transaction/${contact._id}`}>Transact BTC</NavLink>
      </div>
    </section>
  );
}