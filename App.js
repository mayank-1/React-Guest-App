class GuestForm extends React.Component {
  state = {
    name: "",
    guestType: "",
    isEdit: false
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

  updateForm() {
    let newObject = {
      name: this.state.name,
      guestType: this.state.guestType,
      isEdit: false
    };
    this.props.getUpdatedData(newObject);
    this.setState({
      name: "",
      guestType: "",
      isEdit: false
    });
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.dataToEdit !== prevProps.dataToEdit) {
      this.setState({
        name: this.props.dataToEdit.name,
        guestType: this.props.dataToEdit.guestType,
        isEdit: true
      });
    }
  };

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
            <option value="VIP">VIP</option>
            <option value="NORMAL">Normal</option>
            <option value="CHIEF GUEST">Chief Guest</option>
          </select>
        </div>
        <button
          onClick={e => {
            e.preventDefault();
            if (this.state.isEdit) {
              this.updateForm();
            } else {
              this.submitForm();
            }
          }}
          className="btn btn-primary"
        >
          {this.state.isEdit ? "UPDATE" : "ADD"}
        </button>
      </form>
    );
  }
}

class GuestList extends React.Component {
  guestToDelete(id) {
    this.props.getTheIdToDelete(id);
  }
  guestToEdit(id) {
    this.props.getTheIdToEdit(id);
  }

  render() {
    return (
      <tr key={this.props.index}>
        <td scope="row">{this.props.name}</td>
        <td>{this.props.guestType}</td>
        <td>
          <a onClick={() => this.guestToEdit(this.props.index)}>
            <i className="far fa-edit text-info"></i>
          </a>
          &nbsp;&nbsp;
          <a onClick={() => this.guestToDelete(this.props.index)}>
            <i className="fa fa-trash-alt text-danger"></i>
          </a>
        </td>
      </tr>
    );
  }
}

class Guest extends React.Component {
  state = {
    guests: [],
    editGuestdata: [],
    indexToUpdate: ""
  };

  getFormDataForGuests(data) {
    if (data.name && data.guestType) {
      this.setState({
        guests: [...this.state.guests, data]
      });
    }
  }

  getUpdatedDataFromGuest(data) {
    if (this.state.guests[this.state.indexToUpdate] !== data) {
      this.state.guests[this.state.indexToUpdate] = data;
    }

    this.setState({
      guests: this.state.guests
    });
  }

  guestToDelete(id) {
    let updatedGuest = [...this.state.guests];
    updatedGuest.splice(id, 1);
    this.setState({
      guests: updatedGuest
    });
  }

  guestToEdit(id) {
    let editData = {
      name: this.state.guests[id].name,
      guestType: this.state.guests[id].guestType,
      isEdit: true
    };
    this.setState({
      editGuestdata: editData,
      indexToUpdate: id
    });
  }

  render() {
    return (
      <div className="row text-center m-2">
        <div className="col-md-5 card mx-auto shadow m-1 p-3 col-xs-10">
          <h3>Guest Form</h3>
          <GuestForm
            dataToEdit={this.state.editGuestdata}
            getGuestData={data => this.getFormDataForGuests(data)}
            getUpdatedData={data => this.getUpdatedDataFromGuest(data)}
          />
        </div>
        <div className="col-md-5 card mx-auto m-1 p-3 shadow col-xs-10">
          <table className="table table-striped">
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
                    getTheIdToDelete={id => this.guestToDelete(id)}
                    getTheIdToEdit={id => this.guestToEdit(id)}
                    index={index}
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
