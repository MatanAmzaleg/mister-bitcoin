import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./assets/scss/global.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ContactDetails } from "./views/ContactDetails";
import { ContactIndex } from "./views/ContactIndex";
import { Home } from "./views/Home";
import { AppHeader } from "./cmps/AppHeader";
import { Charts } from "./views/Charts";
import { ContactEdit } from "./views/ContactEdit";
import { SignupPage } from "./views/SignupPage";
import { Transaction } from "./views/Transaction";
import { Transactions } from "./views/Transactions";

function App() {
  return (
    <Router>
      <div className="main-app">
        <AppHeader></AppHeader>

        <main className="container">
          <Switch>
            <Route path="/contact/edit/:id?" component={ContactEdit} />
            <Route path="/contact/:id" component={ContactDetails} />
            <Route path="/transaction/:id" component={Transaction} />
            <Route path="/transactions" component={Transactions} />
            <Route path="/contacts" component={ContactIndex} />
            <Route path={"/signup"} component={SignupPage}></Route>
            <Route path={"/charts"} component={Charts}></Route>
            <Route path="/" component={Home} />
          </Switch>
        </main>

        <footer>
          <section className="container">contactRights 2022 &copy;</section>
        </footer>
      </div>
    </Router>
  );
}

export default App;
