import React, { Component } from 'react';

//import './App.css';

import Validator from '../shared/validator';

class NewItem extends Component {

  constructor(props) {
    super(props);
    
    this.validator = new Validator();
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      DEVgroupAddress: '',
      DEVconnection: '',
      DEVstatusAddress: '',
      DEVdatapoint: '',
      DEVdescription: '',
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
      
    if(this.validator.validateInputs(this.state)) {
        this.props.onSubmit(this.state);

    }

  }

  render() {

    return (
      <div className="input-panel">
      <span className="form-caption">New item:</span>
      <div>
        <label className="field-name">Direccion de grupo:<br/>
          <input value={this.state.name} name="DEVgroupAddress" maxLength="40" required onChange={this.handleInputChange} placeholder="x/x/x" />
        </label>
      </div>
      <div>
        <label className="field-name">Direccion IP de connexion:<br/>
          <input value={this.state.summary} name="DEVconnection" maxLength="40" required onChange={this.handleInputChange} placeholder="x.x.x.x" />
        </label>
      </div>
      <div>
        <label className="field-name">Direccion de grupo de estado:<br/>
          <input value={this.state.year} name="DEVstatusAddress" maxLength="40" onChange={this.handleInputChange} placeholder="x/x/x" />
        </label>
      </div>
      <div>
        <label className="field-name">Datapoint:<br/>
          <input value={this.state.country} name="DEVdatapoint" maxLength="40"  onChange={this.handleInputChange} placeholder="DPTx.xxx" />
        </label>
      </div>
      <div>
        <label className="field-name">Descripcion:<br/>
          <textarea value={this.state.description} name="DEVdescription" onChange={this.handleInputChange}  />
        </label>
      </div>
      <br/>
      <button onClick={() => this.onCancel()}>Cancel</button> 
      <button onClick={() => this.onSubmit()}>Create</button>
      </div>
    );
  }
}

export default NewItem;