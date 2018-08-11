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
searchResult=['Manage Client','Manage Business unit','Manage Business Group','Manage Subscriber','Manage Groups','Manage Providers','Manage Credentials','Manage Resource','Manage Services'];
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

constructor(private cd : ChangeDetectorRef,
  private http: Http,
  private SharedService:SharedService, 
  private fb: FormBuilder, 
  private route: ActivatedRoute,
  private router: Router,
  private ClientCrudService:ClientCrudService,
  private _eref: ElementRef) { 
    this.intialisedetail();
  
  


  }



  testOptionSelected;
  ngOnInit(): void {

    
   
  
    //50vh
      this.dtOptions = {
        pagingType:'numbers',
        pageLength:5,
        paging :true,
        info:false,
        scrollY:'200px',
        scrollCollapse:true
  
      };
      //https://10.31.15.210:8243/ACP/1.0/acp/clients
      // https://10.31.15.210:8243/api/1.0/acp/clients
///assets/Data/sample.json
    
this.getclientDetails();

this.http.get('/assets/Data/sample.json')
        .map(Response => Response.json())
        .subscribe(persons => {
          console.log("response--->"+persons.clients);
          this.persons = persons.clients;

          for(let i=0;i<persons.clients.length;i++){
console.log(persons.clients[i].clientId);
console.log(persons.clients[i].clientName);
console.log(persons.clients[i].shortName);
console.log(persons.clients[i].isActive);
console.log(persons.clients[i].address);
console.log(persons.clients[i].remarks);
          }
 


          
          this.personsBackUp=persons;
          // Calling the DT trigger to manually render the table
 
          for(let i=0;i<persons.clients.length-1;i++){
            if(persons.clients[i].clientId==1){
              // this.DetailSelected=persons.clients[i];
        
            }
          }
 
          this.dtTrigger.next();
          
        });
  
  
        this.UpdateIncident = this.fb.group({
          IncidentNumber: ['', Validators.required],
          CreatedDate: ['', [Validators.required, Validators.minLength(1)]],
          Priority :['', Validators.required],
          Summary:['',]
    
    
        });

        this.UpdateclientDetail = this.fb.group({
          clientId: ['', ''],
          clientName: [''],
          shortName :[''],
          address :[''],
          phone :[''],
          dateOfBirth :[''],
          status :[''],
          remarks:['']

        });
       
        this.AddNewTask = this.fb.group({
          clientName: ['', [Validators.required, Validators.minLength(1)]],
          shortName :['', Validators.required],
          address:['',Validators.required],
          remarks:['',Validators.required],
          phone:['',Validators.required],
          dateOfBirth:['',Validators.required]
    
    
    
        });
    
       
  
        
}



intialisedetail(){
  for(let i=0;i<this.persons.length-1;i++){
    if(this.persons[i].Priority=='P1'){
      this.DetailSelected=this.persons[i];
console.log(this.persons[i].Priority);
    }
  }
  console.log("HI hello gappu"+this.DetailSelected);
console.log(this.persons);
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

getStyle(person) {
//  if(this.showStyle){
//  return "yellow";
//} else {
//  return "";
console.log(person.IncidetNo);
if(person.IncidetNo===this.testvalue){
  if(this.showStyle){
    return "yellow";
  }
}
else{
  return "";
}
}


toggle(value){
  console.log(JSON.stringify(value));
  
  this.DetailSelected=value;
  this.DetailSelectedshow=true;
  console.log(this.DetailSelected.IncidetNo);


  console.log(value.IncidetNo);
this.testvalue=value.clientId;
this.showStyle = !this.showStyle;
}

edit(){

  this.IncidentEditable=false;
}
Cancel(){
  this.IncidentEditable=true;
  
}


zoomProductIncidentDetails(){

    //let elem=this.first.nativeElement;
    //elem.setAttribute("style", "height: 100px");
    //elem.setAttribute("style", "width: 600px;");
//    this.first.nativeElement.setAttribute(("style","height:20px"));
this.height=250;
this.zoomIncidentDetail=true;




}

  zoomOutIncidentDetails(){
    this.zoomIncidentDetail=false;
//  this.persons=this.personsBackUp;

this.height=180;
this.cd.detectChanges();
    
  console.log(this.persons);
    

  }

  zoomTableDetails(){
 this.heightTable=400;
this.zoomTableDetail=true;
// this.cd.detectChanges();

//this.dtOptions.scrollY='200vh';

}
  zoomOutTableDetails(){
    this.heightTable=213;
this.zoomTableDetail=false;
  }

  filterTable(filterValue){
    console.log(filterValue);
let temp=this.persons;
let temp2= new Array();
let temp3;
switch(filterValue){
case 'clientName':
console.log("correct");
temp3='clientName';
break;
case 'clientId':
console.log("correct");
temp3='clientId';
break;
case 'shortName':
console.log("correct");
temp3='shortName';
break;
default:console.log("lets try");
}




 for(let i=0;i<temp.length;i++){
 
 }

    
  }

getclientDetails(){
  this.ClientCrudService.getClientDetails().subscribe(product => {

    console.log("GetInformation----->"+product.json());
   //console.log(product.status);
  this.persons=product.json().clients;

            for(let i=0;i<product.json().clients.length-1;i++){
            if(i==0){
              this.DetailSelected=product.json().clients[i];
        
            }
          }

this.ClientCrudService.statuscode=product.status;
  });
  
}

  Updateclient(){
console.log(this.clientIdupdate);
console.log(this.clientNameupdate);
console.log(this.shortNameupdate);
console.log(this.addressupdate);
console.log(this.phoneupdate);
console.log(this.dateOfBirthupdate);
console.log(this.statusupdate);
console.log(this.remarksupdate);
console.log(this.DetailSelected.clientId)

let ClientInfo =
{ 
"clientId":this.DetailSelected.clientId,
"clientName":this.clientNameupdate,
      "shortName": this.shortNameupdate,
      "isActive": true,
      "address": this.addressupdate,
      "remarks": this.remarksupdate,
      "status": this.statusupdate,
      "phone": this.phoneupdate,
      "dateOfBirth": this.dateOfBirthupdate
}
let ClientInfotwo=JSON.stringify(ClientInfo);
console.log("constructed Json"+ClientInfotwo);
let url="https://10.31.15.210:8243/ACP/1.0/acp/clients/"+this.DetailSelected.clientId

this.ClientCrudService.UpdateClientDetails(ClientInfotwo,url).subscribe(product => {
// this.persons=product.json().clients;

  console.log("after update"+product.json());
  this.DetailSelected=product.json().clientDetails;
  this.IncidentEditable=true;
 console.log(product.status);
 console.log(JSON.stringify(product.json()));

 this.ClientCrudService.getClientDetails().subscribe(product => {

  console.log("GetInformation----->"+product.json());
 //console.log(product.status);
this.persons=product.json().clients;
 });

 this.ClientCrudService.statuscode=product.status;
});

  }
  deleteClient(){
    console.log(this.DetailSelected.clientId);

    this.ClientCrudService.DeleteClientDetails(this.DetailSelected.clientId).subscribe(product => {

      console.log("GetInformation----->"+product.json());
      console.log(JSON.stringify(product.json()));
     console.log(product.status);
    this.persons=product.json().clients;
    this.getclientDetails();
    this.ClientCrudService.statuscode=product.status;   
  });
        
     this.deleteModal.nativeElement.click();
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
else if(stakeholdername=='Manage Business Group'){
  this.router.navigateByUrl('/BusinessGroup');
}
else if(stakeholdername=='Manage Subscriber'){
  this.router.navigateByUrl('/Subscriber');
}
else if(stakeholdername=='Manage Resource'){
  this.router.navigateByUrl('/Resource');
}
else{
//  this.OptionSelected=this.SharedService.OptionSelected;
this.selectedStakeholder="Manage clients";
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

