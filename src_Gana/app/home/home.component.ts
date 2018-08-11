import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http } from '@angular/http';
import { SharedService } from '../shared.service';
import 'rxjs/add/operator/map';
import { DataTablesModule } from 'angular-datatables';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import {ChangeDetectorRef} from '@angular/core';
import { ClientCrudService } from '../services/client-crud.service';
import { empty } from 'rxjs/Observer';
import { HomeService } from '../services/home.service';


class Person { 
  IncidetNo: string;
  Client: string;
  CreatedDate: string;
  SLAStatus: string;
  Priority: string;
  remarks: string;
  Status: string;
  Summary: string;
  Assignment: string;  
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '(document:click)': 'onClick($event)',
  } 
})
export class HomeComponent implements OnInit,AfterViewChecked
 {

//only for test delete once demo is done
  
Testdetails:any;
selectedStakeholder:any="Manage clients";  
  ngAfterViewChecked(): void {
//this.OptionSelected;

this.SharedService.OptionSelectedtest.asObservable().subscribe( value => {
  this.OptionSelected = value
 // console.log("value changed-->");
 this.assignoptionselcted(value);
 this.testOptionSelected=value;
 if(value){
  $('#headerOptionsAddNew').removeClass('hide');
   $('#headerOptionsAddNew').addClass('Addnew')
}
else{
  $('#headerOptionsAddNew').addClass('hide')
}
 this.dummy.emit(empty);
 console.log(this.OptionSelected);
});


  }
  clientIdupdate;
  clientNameupdate;
  shortNameupdate;
  addressupdate;
  phoneupdate;
  dateOfBirthupdate;
  statusupdate;
  remarksupdate;

  @ViewChild('deleteModal') deleteModal: ElementRef;
  OptionSelected;
  zoomIncidentDetail:boolean=false;
zoomTableDetail:boolean=false;
public height: Number=180;
  public heightTable:number;
  public width: Number;

  IncidentEditable:boolean=true;
  showStyle: boolean=false;
  testvalue;
  title = 'app';
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
    persons: Person[] = [];
    personsBackUp: Person[] = [];
    searchTerm;

    @ViewChild("first", {read: ElementRef}) first: ElementRef;

    searchsuggestions=['Manage Client','Manage Business unit','Manage Business Group','Manage Subscriber','Manage Groups','Manage Providers','Manage Credentials','Manage Resource','Manage Services'];
searchResult=['Manage Client','Manage Business unit','Manage Business Group','Manage Subscriber','Manage location','Manage ResourceType','Manage Credentials','Manage Resource'];
    HideContent:boolean=true;
HideContentForm:boolean=false;
HideTable:boolean=true;
DetailSelected:any;
DetailSelectedshow:boolean=false;
IncidentDetails;
showDropdownSearchsuggestion:boolean=false;
//form
personDetails;
  testDetail;
  AddNewTask: FormGroup;
  UpdateIncident: FormGroup;
  UpdateclientDetail:FormGroup;
  products;
  getuserNameAndPassword=new Array();
  IsCurrentUser: boolean = false;
  @Output() unhideDetail: EventEmitter<boolean> =
    new EventEmitter<boolean>();
    @Output() hideDetail: EventEmitter<boolean> =
    new EventEmitter<boolean>();

    @Output() dummy: EventEmitter<any> =
    new EventEmitter<any>();





 
    
url="https://10.31.15.210:8243/api/1.0/acp/clients";

constructor(private cd : ChangeDetectorRef,private HomeService:HomeService,
  private http: Http,
  private SharedService:SharedService, 
  private fb: FormBuilder, 
  private route: ActivatedRoute,
  private router: Router,
  private ClientCrudService:ClientCrudService,
  private _eref: ElementRef) { 
  

  }



  testOptionSelected;
  ngOnInit(): void {
 this.HomeService.getall();
        
}





addnewTask(){
  console.log("Hi Hello");
this.HideContent=false;
this.HideContentForm=true;
this.HideTable=false;
}

unhide(unhideValue){
  this.HideContent=true;

}
hideForm(value){
  console.log("Hi hello from parent  component");

  this.HideContent=true;
  this.HideContentForm=false;
  this.HideTable=true;
  console.log(this.persons);
  
}

selectedDetails(person){

console.log(JSON.stringify(person));
  
this.DetailSelected=person;
this.DetailSelectedshow=true;
console.log(this.DetailSelected.IncidetNo);

}
test(IncidentDetails){
  // this.SharedService.selectedIncidentDetailsTest=IncidentDetails;
  console.log("Hi hello"+IncidentDetails.IncidetNo);
}

sendMessagetest(person): void {
  // send message to subscribers via observable subject
  console.log(person);
 // this.TestService.sendMessagetest(person);
  this.testDetail=person;
}

toggleDropdown(){

  this.showDropdownSearchsuggestion=!this.showDropdownSearchsuggestion;
}

searchSuggestion(value){

  this.searchResult.splice(0, this.searchResult.length)
  let subString=value;
    console.log("value searchsuggestion"+value);
  for(let i=0;i<this.searchsuggestions.length;i++){
    if(this.searchsuggestions[i].toLocaleLowerCase().includes(subString.toLocaleLowerCase())){
      this.searchResult.push(this.searchsuggestions[i]);
      console.log(this.searchResult);
    }
   

  
}

}




  navigatetoStakeholders(stakeholdername){
    this.SharedService.OptionSelected=stakeholdername;
console.log(stakeholdername);
//Manage Business Group
if(stakeholdername=='Manage Business unit'){
  //this.OptionSelected=this.SharedService.OptionSelected;BusinessUnit
  this.selectedStakeholder="MANAGE BUSINESSUNIT";
  this.router.navigateByUrl('/BusinessUnit');
}
else if(stakeholdername=='Manage Credentials'){
  this.selectedStakeholder="MANAGE CREDENTIALS"
  this.router.navigateByUrl('/Credentials');

}
else if(stakeholdername=='Manage Business Group'){
  this.selectedStakeholder="MANAGE BUSINESGROUP"
  console.log(this.HomeService.Client_BusinessGroup_Mapping_Id=0);
  this.router.navigateByUrl('/BusinessGroup');
}
 
else if(stakeholdername=='Manage ResourceType'){
  this.selectedStakeholder="MANAGE RESOURCETYPE"
  this.router.navigateByUrl('/ResourceType');
}
else if(stakeholdername=='Manage location'){
  this.selectedStakeholder="MANAGE LOCATION"
  this.router.navigateByUrl('/Location');
}

else if(stakeholdername=='Manage Subscriber'){
  this.selectedStakeholder="MANAGE SUBSCRIBER"
  this.router.navigateByUrl('/Subscriber');
}

else if(stakeholdername=='Manage Resource'){
  this.selectedStakeholder="MANAGE RESOURCE"
  this.router.navigateByUrl('/Resource');
}
else{
//  this.OptionSelected=this.SharedService.OptionSelected;
this.selectedStakeholder="Manage clients";
this.selectedStakeholder="MANAGE CLIENTS"
  this.router.navigateByUrl('/*');
}
  }
  closeDropDown() {
    console.log("Hi inside CloseDropDown");
    this.showDropdownSearchsuggestion=false;  }


  onClick(event) {
    console.log(this.first.nativeElement.outerHTML);
    if (!this._eref.nativeElement.contains(event.target)){
      //this.showDropdownSearchsuggestion=!this.showDropdownSearchsuggestion;
    }
    
     }  

assignoptionselcted(value){
  this.OptionSelected=value;
}



ngOnDestroy() {

}

}

var monthName = new Array('January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
var hourap = new Array(12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
function showTime(){
    var dateObj = new Date();
    var day = dateObj.getDate(), month = dateObj.getMonth(), year = dateObj.getFullYear(), hour = dateObj.getHours(), minutes = (dateObj.getMinutes()<=9?'0'+dateObj.getMinutes():dateObj.getMinutes());
    var string  = 
    // ' '+hourap[hour]+
    // ':'+minutes+
    // ' '+(hour<=11?'AM':'PM')+
    ' '+monthName[month]+
    ' '+day+
    ','+' '+year+
    ' - '+hourap[hour]+
    ':'+minutes+
    ' '+(hour<=11?'AM':'PM');
    var timeDiv = document.getElementById('time');
    if(timeDiv !== null) {
        timeDiv.innerHTML = string;
        timeDiv.setAttribute('datetime',year+'-'+(month+1<=9?'0'+(month+1):month+1)+'-'+day+' '+hour+':'+minutes);

    };
};
setInterval(showTime,1000);