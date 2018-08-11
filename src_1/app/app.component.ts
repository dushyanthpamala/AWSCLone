import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  checkclicked:boolean=false;
  showStyle: false;

  bacgground(){
    console.log("Hi there");
    this.checkclicked=true;
    console.log(this.checkclicked);
  }

  getStyle() {
    if(this.showStyle){
      return "yellow";
    } else {
      return "";
    }
  }
}
