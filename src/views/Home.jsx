import { Component } from "react";
import { bitcoinService } from "../services/bitcoin.service";
import { Charts } from "./Charts";
import { userService } from "../services/user.service";
import { NavLink, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { signUp, setUsername } from "../store/actions/user.actions";

export class _Home extends Component {
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
    const { bitcoin } = this.state;
    if (Object.keys(loggedInUser).length === 0) this.props.history.push("/signup")
    if(!bitcoin)
      return (
        <img
          className="loader"
          src={require("../assets/imgs/loader.gif")}
          alt=""
        />
      );
    return (
      <section className="home">
        <div className="user-section">
          <h1 className="main-header">Youre profile</h1>
          <img src="https://robohash.org/$%7Brobot._id%7D?set=set5" alt="" />
          <h1>
            <span className="bolder">User:</span> {loggedInUser.name}
          </h1>
          <h1>
            <span className="bolder">Coins:</span> {loggedInUser.coins}
          </h1>
          <h1>
            <span className="bolder">
              Btc:
              <FontAwesomeIcon icon="fa-brands fa-bitcoin" />{" "}
            </span>
            {bitcoin}
          </h1>
        </div>
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

export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home);