import { NavLink, withRouter } from "react-router-dom";

function _AppHeader(props) {
  console.log("props:", props);

  function onBack() {
    props.history.goBack();
  }

  return (
    <header className="app-header">
      <section className="container">
        <div className="flex">
          <img
            className="wallet-png"
            src={require("../assets/imgs/bitcoin-logo.png")}
            alt=""
          />
          <h1 className="logo">Mister-BITcoin</h1>
        </div>
        <nav>
          <NavLink exact to="/">
            My profile
          </NavLink>
          <NavLink to="/contacts">Contacts</NavLink>
          <NavLink to="/charts">Statistics</NavLink>
          <NavLink to="/transactions">My transactions</NavLink>
        </nav>
      </section>
    </header>
  );
}

export const AppHeader = withRouter(_AppHeader);
