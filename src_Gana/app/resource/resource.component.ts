import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, ChangeDetectorRef, AfterViewChecked, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Http } from '@angular/http';
import { SharedService } from '../shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientCrudService } from '../services/client-crud.service';
import { DataTableDirective } from 'angular-datatables';
import { BusinessGroupCrudService } from '../services/business-group-crud.service';
import { ResourceService } from '../services/resource.service';
import { SubscriberService } from '../services/subscriber.service';
import { BusinessUnitsService } from '../services/business-units.service';

declare let jsPDF;

function PhoneNumberValidator(): ValidatorFn {
  return  (c: AbstractControl): {[key: string]: boolean} | null => {
      if ( c.value!= 10) {
        console.log("Hi");
          return { 'phoneNumberValidator': true };
      };
      return null;
  };
}



function phoneValidator(c: AbstractControl): {[key: string]: boolean} | null {
  // let phone = c.get('phone').toString();
  

  // if (phone.length!=10) {
  //   return null;
  // }

  // return { 'phone': true };
  
  var PhoneNumber = c.value,
  PhoneNumberArray = [],
  
    PhoneNumberString = PhoneNumber.toString();

for (var i = 0, len = PhoneNumberString.length; i < len; i += 1) {
  PhoneNumberArray.push(+PhoneNumberString.charAt(i));
}

  if ( PhoneNumberArray.length!= 10) {
    console.log("Hi");
      return { 'phoneNumberValidator': true };
  };
  return null;
};




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
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss']
})
export class ResourceComponent implements OnInit,AfterViewChecked,AfterViewInit   {
  ResourcesBusinessGroupName;
  stockData = [
    {
      "clientId": 1,
      "clientName": "Carman",
      "shortName": "Car",
      "isActive": true,
      "address": "Hennur",
      "remarks": "Manager",
      "status": "Active",
      "phone": "988888888",
      "dateOfBirth": "1997-06-05"
      },
      {
      "clientId": 2,
      "clientName": "Candy",
      "shortName": "Cany",
      "isActive": true,
      "address": "Hennur",
      "remarks": "Programmar",
      "status": "Active",
      "phone": "9979768876",
      "dateOfBirth": "2006-06-30"
      },
      {
      "clientId": 3,
      "clientName": "Carlos",
      "shortName": "Carl",
      "isActive": true,
      "address": "Kalyan nagar",
      "remarks": "Manager",
      "status": "Active",
      "phone": "9879879879",
      "dateOfBirth": "1997-06-08"
      },
      {
      "clientId": 4,
      "clientName": "Agnes",
      "shortName": "Agna",
      "isActive": true,
      "address": "Kalyan nagar",
      "remarks": "Manager",
      "status": "Active",
      "phone": "9879879879",
      "dateOfBirth": "1997-10-08"
      },
      {
      "clientId": 5,
      "clientName": "Balu",
      "shortName": "Balug",
      "isActive": true,
      "address": "Kalyan nagar",
      "remarks": "Manager",
      "status": "Active",
      "phone": "9879879879",
      "dateOfBirth": "1997-10-08"
      },
      {
      "clientId": 2,
      "clientName": "Candy",
      "shortName": "Cany",
      "isActive": true,
      "address": "Hennur",
      "remarks": "Programmar",
      "status": "Active",
      "phone": "9979768876",
      "dateOfBirth": "2006-06-30"
      },
      {
      "clientId": 3,
      "clientName": "Carlos",
      "shortName": "Carl",
      "isActive": true,
      "address": "Kalyan nagar",
      "remarks": "Manager",
      "status": "Active",
      "phone": "9879879879",
      "dateOfBirth": "1997-06-08"
      },
      {
      "clientId": 4,
      "clientName": "Agnes",
      "shortName": "Agna",
      "isActive": true,
      "address": "Kalyan nagar",
      "remarks": "Manager",
      "status": "Active",
      "phone": "9879879879",
      "dateOfBirth": "1997-10-08"
      },
      {
      "clientId": 5,
      "clientName": "Balu",
      "shortName": "Balug",
      "isActive": true,
      "address": "Kalyan nagar",
      "remarks": "Manager",
      "status": "Active",
      "phone": "9879879879",
      "dateOfBirth": "1997-10-08"
      }
      
];
ResourceSubscriberName;
subscriberbusinessUnitName;
businessGroupInfo;
businessGroupInfoKeyValue=[];
SubscriberInfo;
SubscriberfoKeyValue=[];
ClientIDHide:boolean=true;
ClientNameHide:boolean=true;
ClientShortNameHide:boolean=true;
ClientAddressHide:boolean=true;
ClientRemarksHide:boolean=true;
ClientStatusHide:boolean=true;

DataToCsv;
clientUpdateErrorMessage;  
shortNameUpdateErrorMessage;
addressupdateErrorMessage;
remarksupdateErrorMessage;
phoneupdateErrorMessage;
MainUpdateError;
clientCounter:number;
statusupdate1;
  @Output()   TestResult: EventEmitter<any> = new EventEmitter();
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngAfterViewChecked(): void {

    $('.dt-button.buttons-collection.buttons-colvis').addClass('fa fa-ellipsis-h');
    $('.dt-button.buttons-collection.buttons-colvis span').addClass('hide');
    $('.buttons-columnVisibility span').addClass('fa fa-times') ;
    $('.buttons-columnVisibility.active span').removeClass('fa fa-times') 

    //   this.dtTrigger.next();
    // $('.dataTables_filter').css({

    //   float: 'right',
    //   'text-align': 'right',
    //   position: 'absolute',
    //   left: '22px',
    //   right: '137px',
    //   'z-index': 1,
    //   top: '-35px'
    // })

    // $('.dataTables_filter input').css({
    //   border:'1px solid #DDD',
    //   'font-size': '12px',
    //   'font-weight':'normal',
    //    padding:'3px',
    // });

    // $('.dataTables_scrollBody').css({
    //   'border-bottom':'1px solid #FFF',

    // });



    

    $('button.buttons-colvis').css({
      position:'absolute',
      left: '1190px',
      top: '-36px',
      border: 'none',
      'background-color': 'white',
      'background-image': '-webkit-gradient(linear, left top, left bottom, from(white), to(white))'
  
    });



    $('.dataTables_filter').css({

      float: 'right',
      'text-align': 'right',
      position: 'absolute',
      'font-size':'11px',
      left: '22px',
      right: '137px',
      top: '-33px',
      // 'text-transform':'uppercase'
    });

    $('.dataTables_paginate').css({

      // float: 'right',
      // 'text-align': 'right',
      position: 'absolute',
      'font-size':'11px',
      // left: '22px',
      right: '536px',
      top: '-33px',
      next: '&#8594;', // or '→'
        previous: '&#8592;', // or '←' 
     
    }); 


    $('.dataTables_length').css({

      // float: 'right',
      // 'text-align': 'right',
      position: 'absolute',
      // left: '22px',
      right: '736px',
      'font-size': '11px',
      'font-weight':'normal !important',
      'z-index': 1,
      // 'text-transform':'uppercase',
       top: '-35px',
      next: '&#8594;', // or '→'
        previous: '&#8592;' // or '←' 
      // margin:'0px'
    });  
    $('.dataTables_length select').css({
 margin:'5px'
    });  

    $('.dataTables_filter input').css({
      border:'1px solid #DDD',
      'font-size': '11px',
      'font-weight':'normal',
       padding:'3px',

    });
    $('span a.current').css({
      background: '#5bc0de',
      border:'1px solid transparent',
      color:'red',
      
    });

    $('label').css({
      'font-size': '11px',
      'font-weight':'normal'
    });

    $('.previous').css({
       padding:'0px'
    })
    $('.next').css({
      padding:'0px'
   })
    $('span a.paginate_button').css({
      padding:'0px',
      margin:'0px'
       
      
    });

    $('.dataTables_wrapper .dataTables_paginate .paginate_button.current, .dataTables_wrapper .dataTables_paginate .paginate_button.current:hover').css({
      color: 'red !important',
      
    
    });

     {
      
  }
  
    $('.dataTables_scrollBody').css({
      'border-bottom':'1px solid #FFF',

    });

  }
ClientUpDateFirstArray=new Array();
ClientUpDateSecondArray=new Array();
ClientUpDateThirdArray=new Array();
  @ViewChild('deleteModal') deleteModal: ElementRef;


  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;






rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }  zoomIncidentDetail:boolean=false;
zoomTableDetail:boolean=false;
public height: Number=170;
  public heightTable:number;
  public width: Number;

  IncidentEditable:boolean=true;
  showStyle: boolean=false;
  testvalue;
  title = 'app';
  //DataTables.Settings
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
    persons: Person[] = [];
    personsBackUp: Person[] = [];
    searchTerm;
    @ViewChild("first", {read: ElementRef}) first: ElementRef;
    searchsuggestions=['Manage Client','Manage Business Group','Manage Locations','Manage Users','Manage Groups','Manage Providers','Manage Credentials','Manage Resource types','Manage Services'];

searchResult=['Manage Client','Manage Business Group','Manage Locations','Manage Users','Manage Groups','Manage Providers','Manage Credentials','Manage Resource types','Manage Services'];
    HideContent:boolean=true;
HideContentForm:boolean=false;
HideTable:boolean=true;
DetailSelected:any;
DetailSelectedshow:boolean=false;
enableClientNew:boolean=false;
IncidentDetails;
showDropdownSearchsuggestion:boolean=false;
clientIdupdate;
clientNameupdate;
shortNameupdate;
addressupdate;
phoneupdate;
dateOfBirthupdate;
statusupdate;
remarksupdate;
ResourceShortNameUpdate;
ResourceLongNameUpdate;
ResourceDescUpdate;
ResourceRemarksUpdate; 
ResourcestatusUpdate;
businessUnitInfo;
businessUnitInfoKeyValue=[];


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
   DataTable;
   yourModelToProvideValue='150px';
scrollY='150px';    
url="https://10.31.15.210:8243/api/1.0/acp/clients";

constructor(private cd : ChangeDetectorRef,
  private http: Http,
  private SharedService:SharedService, 
  private ResourceService:ResourceService,
  private fb: FormBuilder, 
  private route: ActivatedRoute,
  private BusinessUnitsService:BusinessUnitsService,
  private SubscriberService:SubscriberService,
  private router: Router,
  private ClientCrudService:ClientCrudService,
private BusinessGroupCrudService:BusinessGroupCrudService) { 
    this.intialisedetail();
  
  }

    ngOnInit(): void {
      this.loader();
      
    
      $('.buttons-columnVisibility').append( '<span class="glyphicon glyphicon-ok"></span>' );

      // this.DataTable= $('#table_id').DataTable({
      //   paging: false,
      //   "bInfo" : false,
      //   scroller:       true,
      //   scrollY:        200 ,
      //   responsive: true
      // });
  


      this.dtOptions = {
        pagingType:'simple_numbers',
        // language: {
        //   paginate: {
        //     next: '>',
        //     previous: '<'  
        //   }
        // },
        pageLength:5,
        paging :true,
        lengthChange: true,
        lengthMenu: [5, 10, 25, 50, 75, 100],
        info:false,
        scrollY:'30vh',
        scrollX:true,
        scrollCollapse:true,
        dom: 'Blcfrtipe',
        "buttons": [
          {
             extend: 'colvis',
             postfixButtons: ['colvisRestore'],
          }
          
   ]
  //  checkbox: [
  //     {
  //       extend: 'colvis',
  //       postfixButtons: ['colvisRestore'],
  //    },
  //    'print',
  //         'excel'
  //   ]  
        // checkbox: [
        //   {
        //     extend: 'colvis',
        //     postfixButtons: ['colvisRestore'],
        //  }
        //   ,
        //   'print',
        //   'excel'

        // ]

  
      };
      //https://10.31.15.210:8243/ACP/1.0/acp/clients
      // https://10.31.15.210:8243/api/1.0/acp/clients
///assets/Data/sample.json
    
this.getclientDetails();
this.getSubscriberDetails();
this.getBusinessGroupInfo();
this.getBusinessUnitInfo();


this.dataTablePreload();

// this.http.get('/assets/Data/sample.json')
//         .map(Response => Response.json())
//         .subscribe(persons => {
//           console.log("response--->"+persons.clients);
//           this.persons = persons.clients;

//           for(let i=0;i<persons.clients.length;i++){
// console.log(persons.clients[i].clientId);
// console.log(persons.clients[i].clientName);
// console.log(persons.clients[i].shortName);
// console.log(persons.clients[i].isActive);
// console.log(persons.clients[i].address);
// console.log(persons.clients[i].remarks);
//           }
 


          
//           this.personsBackUp=persons;
//           // Calling the DT trigger to manually render the table
 
//           for(let i=0;i<persons.clients.length-1;i++){
//             if(persons.clients[i].clientId==1){
//               // this.DetailSelected=persons.clients[i];
        
//             }
//           }
 
//           this.dtTrigger.next();
          
//         });
  
  
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
          // clientName: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(52)]],
           shortName:['', [Validators.required,Validators.minLength(3),Validators.maxLength(52)]],
          longName:['',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]],
          resourceDesc:['',[Validators.required,Validators.minLength(3),Validators.maxLength(52)]],
          //shortName1: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(52)]],
          remarks: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(52)]],
          //address: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(52)]],
          subscriberResourceID:['SUBS2', [Validators.required, Validators.minLength(3),Validators.maxLength(52)]],
          
          businessUnitInfo:this.fb.group({
            businessUnitId: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(52)]]   
          }),
          businessGroupInfo:this.fb.group({
            businessGroupId: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(52)]] 
          })
         
          
          // phone:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10),phoneValidator]]
       
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

dataTablePreload(){
  // $('.dataTables_wrapper .dataTables_filter').css('style',
  // 'position: absolute,left: 22px,right: 137px, z-index: 1,top: -35px')

  $('.dataTables_wrapper').css("style","display:none !important");
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
  this.defaultUpdateValues();
  this.DetailSelectedshow=true;
  console.log(this.DetailSelected.IncidetNo);


  console.log(value.IncidetNo);
this.testvalue=value.resourceID;
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

$('.dataTables_scrollBody').css("max-height","400px");
//this.yourModelToProvideValue='400px';
//this.dtOptions.scrollY='200vh';

}
  zoomOutTableDetails(){
    $('.dataTables_scrollBody').css("max-height","30vh");
    this.heightTable=300;
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

alert(){
  

}



myFunction() {
  console.log("before check-->")
  $('#alert').removeClass('hide');
  $('#alert').addClass('alert alert-success');
 
}

 alertFunc() {

  console.log("after check-->");
  $('#alert').addClass('hide');

}

defaultUpdateValues(){
  this.ResourceShortNameUpdate=this.DetailSelected.shortName;
  this.ResourceLongNameUpdate=this.DetailSelected.longName;
  this.ResourceDescUpdate=this.DetailSelected.resourceDesc;
  this.ResourceRemarksUpdate=this.DetailSelected.remarks;
  this.ResourcestatusUpdate=this.DetailSelected.isActive;
   
}


  getclientDetails(){
  this.ResourceService.getBusinessUnitsDetails().subscribe(product => {

    console.log("GetInformation----->"+product.json());
   console.log(product.status);
   console.log(JSON.stringify(product.json().resources));
//   this.BusinessGroupCrudService.clientDetails=product.json().clients;
  this.persons=product.json().resources;
  this.clientCounter=product.json().resources.length;
  console.log("Total Records---->"+this.clientCounter);

            for(let i=0;i<product.json().resources.length-1;i++){
            if(i==0){
              this.DetailSelected=product.json().resources[i];
              this.testvalue=this.DetailSelected.resourceID;
              this.defaultUpdateValues();
               this.DataToCsv=product.json().resources[i];
              
            
        
            }
          }

//          this.dtTrigger.next();

this.ClientCrudService.statuscode=product.status;
  });
  
}

myFunction1() {
  console.log("before check-->")
  $('#alertupdate').removeClass('hide');
  $('#alertupdate').addClass('alert alert-success alert-dismissible fade in');
 
}

 alertFunc1() {

  console.log("after check-->");
  $('#alertupdate').addClass('hide');

}
SubscriberBusinessGroupName;
SubscriberBusinessUnitName;

  Updateclient(){
let isactive:boolean;
if(this.ResourcestatusUpdate=="active"){
  isactive=true;
}
else if(this.ResourcestatusUpdate=="inactive"){
  isactive=false;
}
console.log("isactive"+isactive);
console.log(this.ResourceShortNameUpdate);
console.log(this.ResourceLongNameUpdate);
console.log(this.ResourceDescUpdate);
console.log(this.ResourceRemarksUpdate);
console.log(this.ResourcestatusUpdate);
console.log(this.SubscriberBusinessGroupName);

let ClientInfo =
{ 
"resourceID":this.DetailSelected.resourceID,
"shortName":this.ResourceShortNameUpdate,
      "longName": this.ResourceLongNameUpdate,
      "resourceDesc": this.ResourceDescUpdate,
      "remarks": this.ResourceRemarksUpdate,
      "isActive": isactive,
      "configManagerResourceID": 1,
      "itsmResourceID": 1,
      "subscriberResourceID": this.SubscriberfoKeyValue[this.ResourceSubscriberName],
      "providerResourceID":1,
      "resourceTypeInfo": { 
        "resourceTypeId":1
      },
      "businessUnitInfo":{
        "businessUnitId":this.businessUnitInfoKeyValue[this.subscriberbusinessUnitName]
      },
      "businessGroupInfo":{
        "businessGroupId":this.businessGroupInfoKeyValue[this.SubscriberBusinessGroupName]
      }
}
let ClientInfotwo=JSON.stringify(ClientInfo);
console.log("constructed Json"+ClientInfotwo);
// //let url="https://10.31.15.210:8243/ACP/1.0/acp/clients/"+this.DetailSelected.clientId
let url="http://10.31.15.210:9000/acp/resources/"+this.DetailSelected.resourceID
console.log(url);
this.ResourceService.UpdateResourceDetailsDetails(ClientInfotwo,url).subscribe(product => {
// this.persons=product.json().clients;

  console.log("after update"+product.json());
  this.DetailSelected=product.json().resourceInfo;
  this.IncidentEditable=true;
 console.log(product.status);
 console.log(JSON.stringify(product.json()));
 this.rerender();
 this.testvalue=this.DetailSelected.resourceID;
// this.getclientDetails();
this.ResourceService.getBusinessUnitsDetails().subscribe(product => {

 console.log(JSON.stringify(product.json().resources));
this.persons=product.json().resources;
this.clientCounter=product.json().resources.length;
this.myFunction1();

setTimeout(this.alertFunc(),
10000);

window.setInterval(() => {
    this.alertFunc1()
},4000); 

console.log("Total Records---->"+this.clientCounter);

this.ClientCrudService.statuscode=product.status;
});

});

  }
  deleteClient(){
    console.log(this.DetailSelected.resourceID);

    this.ResourceService.DeleteResourceDetails(this.DetailSelected.resourceID).subscribe(product => {
      

      console.log("GetInformation----->"+product.json());
      console.log(JSON.stringify(product.json()));
     console.log(product.status);
    this.getclientDetails();
    this.myFunction();

    this.ClientCrudService.statuscode=product.status;   
  });
        
     this.deleteModal.nativeElement.click();
  }

//starting of new Client addion

uservalidateAndGetProdut(values){

  this.SharedService.OptionSelectedtest.next('');
  console.log(values);
  let temp=values.businessGroupInfo.businessGroupId;
  let temp2=values.businessUnitInfo.businessUnitId;
 let temp3=values.subscriberResourceID
  console.log(values.businessGroupInfo.businessGroupId)
  console.log(values.businessUnitInfo.businessUnitId)
  console.log(values.subscriberResourceID);
  values.subscriberResourceID=this.SubscriberfoKeyValue[temp3];
 
  values.businessGroupInfo.businessGroupId=this.businessGroupInfoKeyValue[temp];
  values.businessUnitInfo.businessUnitId=this.businessUnitInfoKeyValue[temp2];
  let temppostvalues=values;
  temppostvalues.isActive=true;
//  temppostvalues.status='active';
  temppostvalues.configManagerResourceID=1;
  temppostvalues.itsmResourceID=1;
  temppostvalues.providerResourceID=1;
  temppostvalues.resourceTypeInfo={
    "resourceTypeId":1
  }
  console.log("changed values"+temppostvalues);
  console.log(JSON.stringify(temppostvalues));
  

   this.ResourceService.postResourceDetails(JSON.stringify(temppostvalues)).subscribe(product => {
  
    console.log("success");
    console.log("GetInformation----->"+product.json());
    console.log(JSON.stringify(product.json()));
    // this.router.navigate(['/HomeComponent']);
    location.reload();
    console.log(product.status);
   });
  
  
  
  }
  MakeAddClientEnable(){
    this.enableClientNew=true;
    this.SharedService.OptionSelectedtest.next('ADD NEW RESOURCE');



  }
  disableclientaddform(){
    this.enableClientNew=false;
    this.SharedService.OptionSelectedtest.next('');
  }  


  calculateAndDevideClientSElectedInfo(){


  }
  toggleTitle(){
    $('.title').addClass("sujith");; //
  }

showLoader(){
  $('#loader').addClass('loader');
}
hideloader(){
  $('#loader').addClass('hide');
}

ManageClientsDropdownToggle(){
let display=  $('#ManageClients').css('display')
console.log(display);
if(display!='none'){
  $('#ManageClients').addClass('hide');
}
else{
  $('#ManageClients').removeClass('hide');
  $('#ManageClients').addClass('ManageClients');
}
}

closeDropDown(){
  $('#ManageClients').addClass('hide');
}
loadersec(){ 
  $('#loader').removeClass('hide');
  $('#loader').addClass('loader');
 }

loader() {
  setTimeout(this.loadersec(), 3000);

   $('#loader').addClass('hide');
}

ShortNameUpdateValidation():boolean{
  if(!this.IncidentEditable){
       if(this.ResourceShortNameUpdate==''){
         this.clientUpdateErrorMessage="Short Name Cant be empty"
         return true;
       }
       else if(!(/^[a-zA-Z]+$/.test(this.ResourceShortNameUpdate))){
        this.clientUpdateErrorMessage="Short Name Cant have numbers or any spectialcharecters"
        return true;
       }
       else if(this.ResourceShortNameUpdate.length<3){
        this.clientUpdateErrorMessage="Short Name Cant be less than 3 charecters"
        return true;
       }
       else if(this.ResourceShortNameUpdate.length>40){
        this.clientUpdateErrorMessage="Short Name Cant be greater than 40 charecters"
        return true;

       }
  }
}

LongNameUpdateValidation(){
  if(!this.IncidentEditable){
    if(this.ResourceLongNameUpdate==''){
      this.shortNameUpdateErrorMessage="Long Name Cant be empty"
      return true;
    }
    else if(!(/^[a-zA-Z]+$/.test(this.ResourceLongNameUpdate))){
     this.shortNameUpdateErrorMessage="Long Name Cant have numbers or any spectialcharecters"
     return true;
    }
    else if(this.ResourceLongNameUpdate.length<3){
     this.shortNameUpdateErrorMessage="Long Name Cant be less than 3 charecters"
     return true;
    }
    else if(this.ResourceLongNameUpdate.length>40){
     this.shortNameUpdateErrorMessage="Long Name Cant be greater than 40 charecters"
     return true;

    }

}

}

addressupdateValidation(){
  if(!this.IncidentEditable){
    if(this.ResourceDescUpdate==''){
      this.addressupdateErrorMessage="address Cant be empty"
      return true;
    }
    else if(!(/^[a-zA-Z0-9]+$/.test(this.ResourceDescUpdate))){
     this.addressupdateErrorMessage="address Name Cant have any spectialcharecters"
     return true;
    }
    else if(this.ResourceDescUpdate.length<3){
     this.addressupdateErrorMessage="address Cant be less than 3 charecters"
     return true;
    }
    else if(this.ResourceDescUpdate.length>40){
     this.addressupdateErrorMessage="Short Name Cant be greater than 40 charecters"
     return true;

    }

}

}
remarksupdateValidation(){
  if(!this.IncidentEditable){
    if(this.ResourceRemarksUpdate==''){
      this.remarksupdateErrorMessage="remarks Cant be empty"
      return true;
    }
    else if(!(/^[a-zA-Z]+$/.test(this.ResourceRemarksUpdate))){
     this.remarksupdateErrorMessage="remarks Name Cant have any spectialcharecters"
     return true;
    }
    else if(this.ResourceRemarksUpdate.length<3){
     this.remarksupdateErrorMessage="remarks Cant be less than 3 charecters"
     return true;
    }
    else if(this.ResourceRemarksUpdate.length>40){
     this.remarksupdateErrorMessage="remarks Cant be greater than 10 charecters"
     return true;

    }

}

}



editDetailselectedvalidate():boolean{

if(
   this.remarksupdateValidation()|| 
   this.addressupdateValidation()||
   this.ShortNameUpdateValidation() ||
   this.LongNameUpdateValidation()
  ){
    this.MainUpdateError="Please enter all valid Inputs and Update"
    return true;
  }

}

phoneupdateValidation(){
  if(!this.IncidentEditable){
    if(this.phoneupdate==''){
      this.phoneupdateErrorMessage="Phone number Cant be empty"
      return true;
    }
    else if(!(/^[0-9]+$/.test(this.phoneupdate))){
     this.phoneupdateErrorMessage="phone number Cant have anycharecters or  spectialcharecters"
     return true;
    }
    else if(!(this.phoneupdate.length==10)){
     this.phoneupdateErrorMessage="Phone number must have  10 digits "
     return true;
    }

}

}
declareAllBooleans(){

}
// tryonce(){
//   //this.ClientIDHide=!this.ClientIDHide;
//   if(this.ClientIDHide){
//     $('#clientId').addClass('hide');
//   }
//   let temp=$('.dt-button.buttons-columnVisibility span').attr('class'); 
// }

convertArrayOfObjectsToCSV(args) {
  var result, ctr, keys, columnDelimiter, lineDelimiter, data;

  data = args.data || null;
  if (data == null || !data.length) {
      return null;
  }

  columnDelimiter = args.columnDelimiter || ',';
  lineDelimiter = args.lineDelimiter || '\n';

  keys = Object.keys(data[0]);

  result = '';
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  data.forEach(function(item) {
      ctr = 0;
      keys.forEach(function(key) {
          if (ctr > 0) result += columnDelimiter;

          result += item[key];
          ctr++;
      });
      result += lineDelimiter;
  });

  return result;
}

downloadCSV(args) {

  //args=this.DetailSelected.clientName+".CSV";
  args={ filename:this.DetailSelected.shortName+this.DetailSelected.longName+".csv"}
  console.log(this.DetailSelected);
  let DatatoCsv=[
    this.DetailSelected
  ]
  var data, filename, link;

  var csv = this.convertArrayOfObjectsToCSV({
      data:DatatoCsv
  });
  if (csv == null) return;

  filename = args.filename || 'export.csv';

  if (!csv.match(/^data:text\/csv/i)) {
      csv = 'data:text/csv;charset=utf-8,' + csv;
  }
  data = encodeURI(csv);

  link = document.createElement('a');
  link.setAttribute('href', data);
  link.setAttribute('download', filename);
  link.click();
}

downloadPdf(){

  var doc = new jsPDF();

  var col = ["Deatils", "Values"];
  var rows = [];

  for(var key in this.DetailSelected){
      var temp = [key, this.DetailSelected[key]];
      rows.push(temp);
  }

  doc.autoTable(col, rows);
 let pdfName=this.DetailSelected.shortName+this.DetailSelected.longName+".pdf";
  doc.save(pdfName) ;

}

getSubscriberDetails(){
  this.SubscriberService.getSubscriberDetails().subscribe(product => {
    this.SubscriberInfo =product.json().subscribers;
    console.log("businessGroupInfo information"+JSON.stringify(this.SubscriberInfo));

for(let i=0;i<this.SubscriberInfo.length;i++){

console.log(this.SubscriberInfo[i].subscriberId);
console.log(this.SubscriberInfo[i].clientDetails);
console.log(this.SubscriberInfo[i].subscriberName);
console.log(this.SubscriberInfo[i].subsDesc);
console.log(this.SubscriberInfo[i].remarks);
console.log(this.SubscriberInfo[i].authAttribute   );
console.log(this.SubscriberInfo[i].isActive);

this.SubscriberfoKeyValue[this.SubscriberInfo[i].subscriberName]=this.SubscriberInfo[i].subscriberId;

console.log('this is bisinessgroup key value pair-->'+JSON.stringify(this.SubscriberfoKeyValue));
}
});

}
getBusinessGroupInfo(){
  this.BusinessGroupCrudService.getBusinessGroupDetails().subscribe(product => {
    this.businessGroupInfo =product.json().businessGroups;
    console.log("businessGroupInfo information"+JSON.stringify(this.businessGroupInfo));

for(let i=0;i<this.businessGroupInfo.length;i++){

console.log(this.businessGroupInfo[i].businessGroupId);
console.log(this.businessGroupInfo[i].clientDetails);
console.log(this.businessGroupInfo[i].name);
console.log(this.businessGroupInfo[i].shortName);
console.log(this.businessGroupInfo[i].businessGroupDesc);
console.log(this.businessGroupInfo[i].remarks   );
console.log(this.businessGroupInfo[i].businessGroupId);
console.log(  this.businessGroupInfo[i].businessGroupDesc);

this.businessGroupInfoKeyValue[this.businessGroupInfo[i].name]=this.businessGroupInfo[i].businessGroupId;

console.log('this is bisinessgroup key value pair-->'+JSON.stringify(this.businessGroupInfoKeyValue));


}
});
      
}
getBusinessUnitInfo(){
  this.BusinessUnitsService.getBusinessUnitsDetails().subscribe(product => {
    this.businessUnitInfo =product.json().businessUnits;
    console.log("businessunitInfo information"+JSON.stringify(this.businessUnitInfo));

for(let i=0;i<this.businessUnitInfo.length;i++){

console.log(this.businessUnitInfo[i].businessUnitId);
console.log(this.businessUnitInfo[i].businessGroups);
console.log(this.businessUnitInfo[i].name);
console.log(this.businessUnitInfo[i].shortName);
console.log(this.businessUnitInfo[i].businessUnitDesc);
console.log(this.businessUnitInfo[i].remarks);
console.log(this.businessUnitInfo[i].isActive);

this.businessUnitInfoKeyValue[this.businessUnitInfo[i].name]=this.businessGroupInfo[i].businessGroupId;

console.log('this is bisinessgroup key value pair-->'+JSON.stringify(this.businessGroupInfoKeyValue));


}
});
      
}


ngOnDestroy() {

}
}
