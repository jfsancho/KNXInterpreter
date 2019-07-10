

class ItemService { 

  async retrieveItems() {

    return fetch("http://localhost:3001/devices")
      .then(response => {
        if (!response.ok) {
          this.handleResponseError(response);
        }
        console.log(response);
        return response.json();

      })

      .then(json => {

        console.log("Retrieved items:");
        console.log(json);
        const items = [];
        const itemArray = json;

        for(var i = 0; i < itemArray.length; i++) {
          itemArray[i].link =  i;
          items.push(itemArray[i]);
        }

        return items;

      })

      .catch(error => {
        this.handleError(error);
      });

  }

  //curl -H 'Content-Type: application/json' -H "Accept: application/json" -X GET -d '{"devId":"0/0/1"}' http://localhost:3000/devices/dev/
  async getItem(item) {
    console.log("ItemService.getItem():");
    console.log("Item: " + item);

    return fetch("http://localhost:3001/devices/dev/get",{
      method: "POST",
      mode: "cors",
      headers: {
            "Content-Type": "application/json",
            "Accept":"application/json"
        },
      body: JSON.stringify({devId : item.DEVgroupAddress})
    })
      .then(response => {
        if (!response.ok) {
            this.handleResponseError(response);
        }
        console.log(response);
        return response.json();
      })

      .then(item => {
          return item;
        }
      )

      .catch(error => {
        this.handleError(error);
      });

  }

  async createItem(newitem) {
    console.log("ItemService.createItem():");
    console.log(newitem);
    return fetch("http://localhost:3001/devices/dev", {
      method: "POST",
      mode: "cors",
      headers: {
            "Content-Type": "application/json",
            "Accept":"application/json"
        },
      body: JSON.stringify(newitem)
    })

      .then(response => {
       if (!response.ok) {
            this.handleResponseError(response);
        }
        return response.json();
      })
      .catch(error => {
        this.handleError(error);
      });

  }

  async deleteItem(itemlink) {
    console.log("ItemService.deleteItem():");
    console.log("item: " + itemlink);

    return fetch(itemlink, {
      method: "DELETE",
      mode: "cors"
    })
      .then(response => {
        if (!response.ok) {
            this.handleResponseError(response);
        }

      })

      .catch(error => {
        this.handleError(error);
      });

  }

  async updateItem(item) {
    console.log("ItemService.updateItem():");
    console.log(item);
    return fetch("http://localhost:3001/devices/dev", {
      method: "PUT",
      mode: "cors",
      headers: {
            "Content-Type": "application/json",
            "Accept":"application/json"
          },

      body: JSON.stringify(item)
    })

      .then(response => {
        if (!response.ok) {
          this.handleResponseError(response);
        }
        return response.json();
      })

      .catch(error => {
        this.handleError(error);
      });

  }

  async onWriteItem(data){
    console.log("ItemService.writeItem():");
    console.log(data);

    return fetch("http://localhost:3001/devices/dev/write", {
      method: "POST",
      mode: "cors",
      headers: {
            "Content-Type": "application/json",
            "Accept":"application/json"
          },

      body: JSON.stringify({ 
        devId: data.DEVgroupAddress,
        value: data.writeValue
      })
    })

      .then(response => {
        if (!response.ok) {
          this.handleResponseError(response);
        }
        return response.json();
      })

      .catch(error => {
        this.handleError(error);
      });

  }
  

  async onReadItem(item){
    console.log("ItemService.readItem():");
    //console.log(item);
    return fetch("http://localhost:3001/devices/dev/read", {
      method: "POST",
      mode: "cors",
      headers: {
            "Content-Type": "application/json",
            "Accept":"application/json"
          },

      body: JSON.stringify({devId: item.DEVgroupAddress})
    })

      .then(response => {
        if (!response.ok) {
          this.handleResponseError(response);
        }

        return response.json();
      })

      .catch(error => {
        this.handleError(error);
      });

  }

  handleResponseError(response) {
      throw new Error("HTTP error, status = " + response.status);
  }

  handleError(error) {
      console.log(error.message);
  }

}

export default ItemService;