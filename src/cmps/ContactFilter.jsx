import { Component, createRef } from "react";
import TextField from "@mui/material/TextField";

export class ContactFilter extends Component {
  state = {
    filterBy: null,
  };

  typeInputRef = createRef();

  componentDidMount() {
    const { filterBy } = this.props;
    // this.setState({ filterBy: { ...filterBy } }, () => this.inputRef.current.focus())
    this.setState({ filterBy: { ...filterBy } });
  }

  handleRef = (elInput) => {
    elInput?.focus();
  };

  handleChange = ({ target }) => {
    const field = target.name;
    let value = target.value;
    console.log("field", field, " : value", value);
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

    this.setState(
      (prevState) => ({ filterBy: { ...prevState.filterBy, [field]: value } }),
      () => this.props.onChangeFilter({ ...this.state.filterBy })
    );
  };

  render() {
    const { filterBy } = this.state;
    if (!filterBy)
      return (
        <img
          className="loader"
          src={require("../assets/imgs/loader.gif")}
          alt=""
        />
      );

    const { name, type, phone, maxBatteryStatus } = filterBy;
    return (
      <form className="contact-filter">
        <section>
          <TextField
            className="search-input"
            placeholder="Search contact by name"
            ref={this.handleRef}
            onChange={this.handleChange}
            value={name}
            type="text"
            name="name"
            id="name"
            variant="outlined"
          />
        </section>
        {/* <section>
                    <label htmlFor="type">Type</label>
                    <input ref={this.typeInputRef} onChange={this.handleChange} value={type} type="text" name="type" id="type" />
                    </section>
                    <section>
                        <label htmlFor="phone">minBatteryStatus</label>
                        <input onChange={this.handleChange} value={phone} type="number" name="phone" id="phone" />
                    </section>
                <section>
                    <label htmlFor="maxBatteryStatus">maxBatteryStatus</label>
                    <input onChange={this.handleChange} value={maxBatteryStatus} type="number" name="maxBatteryStatus" id="maxBatteryStatus" />
                </section> */}
      </form>
    );
  }
}
