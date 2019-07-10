import React, { Fragment,Component } from 'react';

import {
  withStyles,
  Typography,
  Button,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';

import './device.css';
import ItemDetails from './item-details';
import NewItem from './new-item';
import EditItem from './edit-item';
import ItemService from '../shared/mock-item-service';
import { makeStyles } from '@material-ui/styles';

const styles = theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCard: {
    width: '90%',
    maxWidth: 500,
  },
  modalCardContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  marginTop: {
    marginTop: 2 * theme.spacing.unit,
  },
});


class Devices extends Component {

  constructor(props) {

    super(props);
    this.itemService = new ItemService();
    this.onSelect = this.onSelect.bind(this);
    this.onNewItem = this.onNewItem.bind(this);
    this.onEditItem = this.onEditItem.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onCancelEdit = this.onCancelEdit.bind(this);
    this.onCreateItem = this.onCreateItem.bind(this);
    this.onUpdateItem = this.onUpdateItem.bind(this);
    this.onDeleteItem = this.onDeleteItem.bind(this);

    this.onReadItem=this.onReadItem.bind(this);
    this.onWriteItem=this.onWriteItem.bind(this);
    
    this.state = {

      showDetails: false,
      editItem: false,
      selectedItem: null,
      newItem: null,
      msg:null
    }

  }

  componentDidMount() {
      this.getItems();
  }

  render() {
    
    
    const items = this.state.items;
    if(!items) return null;

    const showDetails = this.state.showDetails;
    const selectedItem = this.state.selectedItem;
    const newItem = this.state.newItem;
    const editItem = this.state.editItem;
    const msg=this.state.msg;
    
    const listItems = items.map((item) =>

      <ListItem  key={item.link} onClick={() => this.onSelect(item)}>
         <ListItemText style={{"text-align": 'center'}}> {item.DEVgroupAddress} |  {item.DEVconnection} | {item.DEVdescription}
         </ListItemText>
      </ListItem>
    );

    var divStyle = {
      background: "#eee",
      padding: "20px",
      margin: "20px"
    };

    

    return (
      <div  className="Devices" >
          {listItems}
          
          <Button variant= 'outlined' color="primary" onClick={() => this.onNewItem()}> New Item</Button>
            {newItem && <NewItem onSubmit={this.onCreateItem} onCancel={this.onCancel}/>}
            {showDetails && selectedItem && <ItemDetails item={selectedItem} onRead={this.onReadItem} onWrite={this.onWriteItem} onEdit={this.onEditItem} onDelete={this.onDeleteItem} />}
            {editItem && selectedItem && <EditItem onSubmit={this.onUpdateItem} onCancel={this.onCancelEdit} item={selectedItem} />}
            {msg && <div style={divStyle}><Typography variant="subtitle2">message:</Typography> {this.state.msg}</div>} 
      </div>
    );

  }

  getItems() {
    this.itemService.retrieveItems().then(items => {
          this.setState({items: items});
        }
    );
  }

  onSelect(itemLink) {
    this.clearState();
    this.itemService.getItem(itemLink).then(item => {
      this.setState({
          showDetails: true,
          selectedItem: item
        });
      }
    );
  }

  onCancel() {
    this.clearState();
  }

  onNewItem() {
    this.clearState();
    this.setState({
      newItem: true
    });

  }
  onEditItem() {
    this.setState({
      showDetails: false,
      editItem: true,
      newItem: null
    });

  }

  onCancelEdit() {
    this.setState({
      showDetails: true,
      editItem: false,
      newItem: null
    });

  }

  onUpdateItem(item) {
    this.clearState();
    this.itemService.updateItem(item).then(item => {
      if(item.msg){
        window.alert(item.msg);
      }
        this.getItems();
      }

    );

  }

  onCreateItem(newItem) {
    this.clearState();
    this.itemService.createItem(newItem).then(item => {
        this.getItems();
      }
    );
  }

  onDeleteItem(itemLink) {
    this.clearState();
    this.itemService.deleteItem(itemLink).then(res => {
        this.getItems();
      }
    );
  }
  onReadItem(item){
    this.itemService.onReadItem(item).then(res=>{
      if(res){
        item.readValue=res.value.toString();
      }
      else{
        item.readValue='no read Value';
      }
      this.setState({
        selectedItem:item
      });
      
      
    })
  }

  onWriteItem(item){
    this.itemService.onWriteItem(item).then(res=>{
      let message;
      if(res){
        message=res.msg;
      }
      else{
        message='No se pudo escribir'
      }
      this.setState({
        msg:message
      })
      
    })
  }

  clearState() {
    this.setState({
      showDetails: false,
      selectedItem: null,
      editItem: false,
      newItem: null,
      msg:null
    });

  }

}

export default Devices;