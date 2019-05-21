

let flag =true;
let test='d';
//console.log(!!flag);
console.log(test);
if(test){
    console.log(test);
}

class Rectangle {
    constructor(height, width) {
        //console.log(Rectangle.instance)
        //console.log(!!Rectangle.instance)
        if (!!Rectangle.instance) {
            return Rectangle.instance;
        }
        else{
            this.height = height;
            this.width = width;

            Rectangle.instance = this;
            return this
        }
        
    }
  }

  r1= new Rectangle(2,3);
  r2= new Rectangle(5,6);

  //console.log(r1.instance)
  //console.log(r2.height)