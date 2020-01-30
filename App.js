class GuestForm extends React.Component {
  state = {
    name: "",
    guestType: ""
  };

  changeName(name) {
    this.setState({
      name: name
    });
  }

  changeGuestType(type) {
    this.setState({
      guestType: type
    });
  }

  submitForm() {
    this.props.getGuestData(this.state);
    this.setState({
      name: "",
      guestType: ""
    });
  }

  render() {
    return (
      <form>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Guest Name"
            value={this.state.name} //value attribute doesn't works here
            onChange={event => this.changeName(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <select
            className="form-control"
            value={this.state.guestType}
            onChange={event => this.changeGuestType(event.target.value)}
            required
          >
            <option value="">Choose Type</option>
            <option value="VIP GUEST">VIP</option>
            <option value="NORMAL GUEST">Normal</option>
            <option value="CHIEF GUEST">Chief Guest</option>
          </select>
        </div>
        <button
          onClick={e => {
            e.preventDefault();
            this.submitForm();
          }}
          className="btn btn-primary"
        >
          ADD
        </button>
      </form>
    );
  }
}

class GuestList extends React.Component {
  render() {
    return (
      // <div>
      //   {/* <ul type="none">
      //     <li key={this.props.key}>
      //       {this.props.name} - {this.props.guestType}
      //     </li>
      //   </ul> */}
      // </div>
      <tr key={this.props.key}>
        <td scope="row">{this.props.name}</td>
        <td>{this.props.guestType}</td>
        <td>
          <button>EDIT</button>&nbsp;
          <button>DELETE</button>
        </td>
      </tr>
    );
  }
}

class Guest extends React.Component {
  state = {
    guests: []
  };

  getFormDataForGuests(data) {
    if (data.name && data.guestType) {
      this.setState(
        {
          guests: [...this.state.guests, data]
        },
        () => {}
      );
      console.log("GUEST:", this.state);
    }
  }
  render() {
    return (
      <div className="row text-center m-2">
        <div className="col-md-5 card mx-auto shadow m-1 p-3 col-xs-10">
          <h3>Guest Form</h3>
          <GuestForm getGuestData={data => this.getFormDataForGuests(data)} />
        </div>
        <div className="col-md-5 card mx-auto m-1 p-3 shadow col-xs-10">
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Guest Type</th>
                <th>Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.guests.map((data, index) => {
                return (
                  <GuestList
                    key={index}
                    name={data.name}
                    guestType={data.guestType}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Guest />, document.getElementById("root"));
