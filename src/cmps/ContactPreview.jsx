import { NavLink, withRouter } from "react-router-dom";

export function ContactPreview({
  contact,
  onSelectContactId,
  onRemoveContact,
}) {
  return (
    <section className="contact-preview">
      <NavLink to={`/contact/${contact._id}`} className="info">
        <img
          className="user-img"
          src={`https://robohash.org/${contact._id}?set=set5`}
          alt=""
        />
        <h2>{contact.name}</h2>
      </NavLink>
      <button className="remove-btn" onClick={() => onRemoveContact(contact._id)}>X</button>
    </section>
  );
}
