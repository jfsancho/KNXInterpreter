import React, { Component } from 'react';

//import './App.css';

class ItemDetails extends Component {

  constructor(props) {

    super(props);
    
    this.onEdit= this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onRead = this.onRead.bind(this);
    this.onWrite= this.onWrite.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    const item = this.props.item;
    this.state = {
      DEVgroupAddress: item.DEVgroupAddress,
      DEVconnection: item.DEVconnection,
      DEVstatusAddress: item.DEVstatusAddress,
      DEVdatapoint: item.DEVdatapoint,
      DEVdescription: item.DEVdescription,
      link: item.link,
      writeValue:null
    };

  }

  render() {

    const item = this.props.item;

    return (
      <div className="input-panel">
      <br/>
      <div><span className="field-name"> <b>DEVgroupAddress:</b></span> {item.DEVgroupAddress}</div>
      <div><span className="field-name"><b>DEVconnection:</b></span> {item.DEVconnection}</div>
      <div><span className="field-name"><b>DEVstatusAddress:</b></span> {item.DEVstatusAddress}</div>
      <div><span className="field-name"><b>DEVdatapoint:</b></span> {item.DEVdatapoint}</div>
      <div><span className="field-name"><b>DEVdescription:</b></span> {item.DEVdescription}</div>
      <br/>
      <button onClick={() => this.onRead()}>Read</button>
      <span className="field-name"><b> Value:</b></span> {item.readValue} 
      <div>
        <input  name="writeValue" maxLength="40" required onChange={this.handleInputChange} />
        <button onClick={() => this.onWrite()}>Write</button>
      </div>
      <button onClick={() => this.onEdit()}>Edit</button>
      </div>

    );

  }

  onEdit(){
    this.props.onEdit();
  }

  onDelete() {

    const item = this.props.item;
    if(window.confirm("Are you sure to delete item: " + item.DEVgroupAddress + " ?")) {
      this.props.onDelete(item.link);
    }
  }

  onRead(){
    const item = this.state;
    this.props.onRead(item);
  }

  onWrite(){
    if(this.state.writeValue!==null){
      this.props.onWrite(this.state);
    }
  }

  handleInputChange(event) {

    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

}

export default ItemDetails;