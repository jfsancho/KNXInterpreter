import React, { Component } from 'react';

//import './.css';

import Validator from '../shared/validator';

class EditItem extends Component {

  constructor(props) {

    super(props);
    this.validator = new Validator();
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    const itemToEdit = props.item;
    this.state = {
      DEVgroupAddress: itemToEdit.DEVgroupAddress,
      DEVconnection: itemToEdit.DEVconnection,
      DEVstatusAddress: itemToEdit.DEVstatusAddress,
      DEVdatapoint: itemToEdit.DEVdatapoint,
      DEVdescription: itemToEdit.DEVdescription,
      link: itemToEdit.link
    };

  }

  handleInputChange(event) {

    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

  }

  onCancel() {
    this.props.onCancel();

  }

  onSubmit() {

    if (this.validator.validateInputs(this.state)) {
      this.props.onSubmit(this.state);
    }

  }

  render() {
    return (
      <div className="input-panel">
      <span className="form-caption">Edit item: </span> <span>{this.state.DEVgroupAddress}</span>
      <div>
        <label className="field-name">Direccion de grupo:<br/> 
          <input value={this.state.DEVgroupAddress} name="DEVgroupAddress" required onChange={this.handleInputChange} placeholder="group address" />
        </label><br/>
      </div>
      <div>
        <label className="field-name">Direccion IP de conexion: <br/>
          <input value={this.state.DEVconnection} name="DEVconnection" required onChange={this.handleInputChange} placeholder="connection" />
        </label><br/>
      </div>
      <div>
        <label className="field-name">Direccion de grupo de estado: <br/>
          <input value={this.state.DEVstatusAddress} name="DEVstatusAddress" onChange={this.handleInputChange} placeholder="status address" />
        </label><br/>
      </div>
      <div>
        <label className="field-name">Datapoint:<br/> 
          <input value={this.state.DEVdatapoint} name="DEVdatapoint"  onChange={this.handleInputChange} placeholder="datapoint" />
        </label><br/>
      </div>
      <div>
        <label className="field-name">descripcion: <br/>
          <textarea value={this.state.DEVdescription} name="DEVdescription" onChange={this.handleInputChange} placeholder="description" />
        </label>
      </div>
      <br/>
      <button onClick={() => this.onCancel()}>Cancel</button> 
      <button onClick={() => this.onSubmit()}>Update</button>
      </div>
    );
  }
}

export default EditItem;