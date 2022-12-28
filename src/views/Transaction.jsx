import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import { useSelector,  } from "react-redux";
import { contactService } from "../services/contact.service";
import { Home } from "./Home";
import { NavLink, withRouter } from "react-router-dom";
import { spendBalance, addMove } from "../store/actions/user.actions";

export function Transaction(props) {
  const [contact, setContact] = useState(null);
  const [transactionAmount, setTransactionAmount] = useState(null);
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.userModule.loggedInUser);

  useEffect(() => {
    const loadContact = async () => {
      const contact = await contactService.getContactById(
        props.match.params.id
      );
      setContact(contact);
    };
    loadContact();
  }, []);

  function transact() {
    if (transactionAmount > loggedInUser.coins) return;
    dispatch(spendBalance(transactionAmount));
    const move = {
      contact: contact,
      amount: transactionAmount,
    };
    dispatch(addMove(move));
    props.history.push("/transactions");
  }

  function handleChange(ev) {
    setTransactionAmount(+ev.target.value);
  }

  if (!contact)
    return (
      <img
        className="loader"
        src={require("../assets/imgs/loader.gif")}
        alt=""
      />
    );

  return (
    <section className="transaction">
      <div className="deal-users">
        <div className="transacion-maker">
          <h1>From:</h1>
          <Home />
        </div>
        <img
          className="arrow-img"
          src={require("../assets/imgs/right-arrow.png")}
          alt=""
        />
        <div className="transacted-user">
          <h1>To:</h1>
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
        </div>
      </div>
      <div className="transacion-details flex">
        <form>
          <input
            onChange={handleChange}
            type="number"
            placeholder="Put amount here$$"
          />
          <button onClick={transact}>Transact</button>
        </form>
      </div>
    </section>
  );
}
