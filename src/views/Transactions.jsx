import { Component } from "react";
import { bitcoinService } from "../services/bitcoin.service";
import { Charts } from "./Charts";
import { userService } from "../services/user.service";
import { NavLink, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { signUp, setUsername } from "../store/actions/user.actions";

export class _Transactions extends Component {
  state = {
    bitcoin: null,
    user: null,
  };

  componentDidMount() {
    this.getBitcoin()
    console.log(this.props);
  }

  async getBitcoin() {
    try {
      console.log(this.props.loggedInUser);
      const bitcoin = await bitcoinService.getBitcoin(
        this.props.loggedInUser.coins
      );
      this.setState({ bitcoin });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { loggedInUser } = this.props;
    console.log(loggedInUser);
    const { user, moveToContacts, bitcoin } = this.state;
    if (!loggedInUser)
      return (
        <img
          className="loader"
          src={require("../assets/imgs/loader.gif")}
          alt=""
        />
      );
    return (
      <section className="transactions">
          <h1 className="main-header">My Transactions:</h1>
          {this.props.loggedInUser.moves.map(move => 
            <div className="move">
                <h1>To: {move.to}</h1>
                <h1>Time: {new Date(move.at).toLocaleString()}</h1>
                <h1>Amount: {move.amount}$</h1>
            </div>
          )}
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedInUser: state.userModule.loggedInUser,
  userName: state.userModule.userName,
});

const mapDispatchToProps = {
  signUp,
  setUsername,
};

export const Transactions = connect(mapStateToProps, mapDispatchToProps)(_Transactions);
