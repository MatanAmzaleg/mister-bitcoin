import { Component } from "react";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import { connect } from "react-redux";
import { signUp, setUsername } from "../store/actions/user.actions";

export class _SignupPage extends Component {
  componentDidMount() {}

  state = {
    user: {
      name: "",
    },
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState((prevState) => ({
      user: { ...prevState.user, [name]: value },
    }));
  };

  signup = () => {
    console.log(this.state.name);
    this.props.signUp(this.state.user.name);
    this.props.history.push("/");
  };

  render() {
    return (
      <section className="signup-page">
        <h1 className="main-header">Signup</h1>
        <img
          className="logo-img"
          src={require("../assets/imgs/logo.png")}
          alt=""
        />
        <h2>Enter your name</h2>
        <form>
          <Input
            value={this.state.user.name}
            id="name"
            onChange={this.handleChange}
            type="text"
            name="name"
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
          />
          <Button
            onClick={(ev) => {
              this.signup(ev);
            }}
          >
            Signup
          </Button>
        </form>
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

export const SignupPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(_SignupPage);
