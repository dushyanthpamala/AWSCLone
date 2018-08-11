import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, ChangeDetectorRef, AfterViewChecked, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Http } from '@angular/http';
import { SharedService } from '../shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientCrudService } from '../services/client-crud.service';
import { DataTableDirective } from 'angular-datatables';
import { BusinessGroupCrudService } from '../services/business-group-crud.service';
import { ResourceTypeService } from '../services/resource-type.service';

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
  selector: 'app-resorce-type',
  templateUrl: './resorce-type.component.html',
  styleUrls: ['./resorce-type.component.scss']
})
export class ResorceTypeComponent implements OnInit {
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
    // dt-button buttons-columnVisibility
    // dt-button buttons-columnVisibility active
  
    $('.dt-button.buttons-collection.buttons-colvis').addClass('glyphicon glyphicon-th-list');
    $('.dt-button.buttons-collection.buttons-colvis span').addClass('hide');
    $('.buttons-columnVisibility span').addClass('fa fa-times') ;
    $('.buttons-columnVisibility.active span').removeClass('fa fa-times') 
    $('.buttons-columnVisibility:nth-child(0)').append('<span class="fa fa-square"></span>') ;


    $('.buttons-columnVisibility.active').css({
          background: 'white',
    border: 'transparent',
    'box-shadow': 'none'

    })


    
    
 

    

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
      padding:'0px',
      'font-size':'16px',
      color:'#999',
      left: '1206px',
      curser: 'pointer',
      top: '-35px',
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
      top: '-32px',
      // 'text-transform':'uppercase'
    });

    $('.dataTables_paginate').css({

      // float: 'right',
      // 'text-align': 'right',
      position: 'absolute',
      'font-size':'11px',
      // left: '22px',
      right: '536px',
      top: '-35px',
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
       top: '-34px',
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
      background: '#fff',
      border:'1px solid transparent',
      color:'red',
      margin: '3px',
      
    });

    $('.paginate_button:hover').css({
      border: '#fff',
      background:'#fff',
      color:'black',
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
      color: 'blue !important',     margin: '3px',
      
    
    });

     {
      
  }
  $('.span a.paginate_button:hover').css({
    color:'#fff',
    background:'#fff',
    'background-color':'#fff'
  })
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
  private fb: FormBuilder, 
  private route: ActivatedRoute,
  private router: Router,
  private ClientCrudService:ClientCrudService,
  private ResourceTypeService:ResourceTypeService,
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
        language: {
          lengthMenu: 'Show _MENU_ Entries',
          paginate:true
        },
        pageLength:5,

        paging :true,
        lengthChange: true,
        lengthMenu: [5, 10, 25, 50, 75, 100],
        info:false,
        scrollY:'30vh',
        scrollCollapse:true,
        dom: 'Blcfrtipe',
        "buttons": [
          {
             extend: 'colvis',
             background:false,
             border:'none',
             class:"HI",
             postfixButtons: ['colvisRestore']
           
 
            
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
          resourceTypeName: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(52)]],
          resourceCategory :['', [Validators.required,Validators.minLength(3),Validators.maxLength(52)]],
          resourceItem:['',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]],
          resourceTypeDesc:['',[Validators.required,Validators.minLength(3),Validators.maxLength(52)]],
          resourceTypeRemarks:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]]
       
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
this.testvalue=value.resourceTypeId;
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

ResourceTypeName;
ResourceTypeCategory;
ResourceTypeItem;
ResourceTypeDescription;
ResourceTypeRemarks;

defaultUpdateValues(){
  this.ResourceTypeName=this.DetailSelected.resourceTypeName;
  this.ResourceTypeCategory=this.DetailSelected.resourceCategory;
  this.ResourceTypeItem=this.DetailSelected.resourceItem;
  this.ResourceTypeDescription=this.DetailSelected.resourceTypeDesc;
  this.ResourceTypeRemarks=this.DetailSelected.resourceTypeRemarks;
  this.statusupdate=this.DetailSelected.reourcetypeIsActive;
 
}


  getclientDetails(){
  this.ResourceTypeService.getResourceType().subscribe(product => {

    console.log("GetInformation----->"+product.json());
   console.log(product.status);
   console.log(JSON.stringify(product.json().resourceType));
   this.BusinessGroupCrudService.clientDetails=product.json().resourceType;
  this.persons=product.json().resourceType;
  this.clientCounter=product.json().resourceType.length;
  console.log("Total Records---->"+this.clientCounter);

            for(let i=0;i<product.json().resourceType.length-1;i++){
            if(i==0){
              this.DetailSelected=product.json().resourceType[i];
              this.testvalue=this.DetailSelected.resourceTypeId;
              this.defaultUpdateValues();
               this.DataToCsv=product.json().resourceType[i];
              
            
        
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


  Updateclient(){
let isactive:boolean;
if(this.statusupdate=='Active'){
  isactive=true;
}
else if(this.statusupdate=='inactive'){
  isactive=false;
}
let ClientInfo =
{ 
"resourceTypeId":this.DetailSelected.resourceTypeId,
"resourceTypeName":this.ResourceTypeName,
      "resourceCategory": this.ResourceTypeCategory,
      "resourceItem": this.ResourceTypeItem,
      "resourceTypeDesc": this.ResourceTypeDescription,
      "resourceTypeRemarks": this.ResourceTypeRemarks,
      "reourcetypeIsActive": isactive
      
}
let ClientInfotwo=JSON.stringify(ClientInfo);
console.log("constructed Json"+ClientInfotwo);
//let url="https://10.31.15.210:8243/ACP/1.0/acp/clients/"+this.DetailSelected.clientId
let url="http://10.31.15.210:9000/acp/resourceTypes/"+this.DetailSelected.resourceTypeId
console.log(url);
this.ResourceTypeService.UpdateResourceTypeDetails(ClientInfotwo,url).subscribe(product => {

  console.log("after update"+product.json());
  this.DetailSelected=product.json().resourceType;
  console.log(this.DetailSelected);
  console.log(product.json().resourceType);

  for(let i=0;i<=product.json().resourceType.length-1;i++){
    if(i==0){
      this.DetailSelected=product.json().resourceType[i];
    }
  }



  this.IncidentEditable=true;
 console.log(product.status);
 console.log(JSON.stringify(product.json()));
 this.rerender();
// this.getclientDetails();
this.ResourceTypeService.getResourceType().subscribe(product => {

 console.log(JSON.stringify(product.json().resourceType));
 this.BusinessGroupCrudService.clientDetails=product.json().resourceType;
this.persons=product.json().resourceType;
this.clientCounter=product.json().resourceType.length;
this.myFunction1();
 });

 });

  }
  deleteClient(){
    console.log(this.DetailSelected.clientId);

    this.ResourceTypeService.DeleteResourceTypeDetails(this.DetailSelected.resourceTypeId).subscribe(product => {
      

      console.log("GetInformation----->"+product.json());
      console.log(JSON.stringify(product.json()));
     console.log(product.status);
    this.persons=product.json().clients;
    this.getclientDetails();
    this.myFunction();
// 
//setTimeout(this.alertFunc(),
//10000);

// window.setInterval(() => {
//     this.alertFunc()
// }, 3000); 



    this.ClientCrudService.statuscode=product.status;   
  });
        
     this.deleteModal.nativeElement.click();
  }

//starting of new Client addion

uservalidateAndGetProdut(values){

  this.SharedService.OptionSelectedtest.next('');
  console.log(values);
  let temppostvalues=values;
  temppostvalues.reourcetypeIsActive=true;
//  temppostvalues.status='active';
  console.log("changed values"+temppostvalues);
  console.log(JSON.stringify(temppostvalues));
  
  this.ResourceTypeService.postResourceTypeDetails(JSON.stringify(temppostvalues)).subscribe(product => {
  
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
    this.SharedService.OptionSelectedtest.next('ADD NEW RESOURCE TYPE');



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

ClientUpdateValidation():boolean{
  if(!this.IncidentEditable){
       if(this.ResourceTypeName==''){
         this.clientUpdateErrorMessage="Client Name Cant be empty"
         return true;
       }
       else if(!(/^[a-zA-Z\s]+$/.test(this.ResourceTypeName))){
        this.clientUpdateErrorMessage="Client Name Cant have numbers or any spectialcharecters"
        return true;
       }
       else if(this.ResourceTypeName.length<3){
        this.clientUpdateErrorMessage="Client Name Cant be less than 3 charecters"
        return true;
       }
       else if(this.ResourceTypeName.length>40){
        this.clientUpdateErrorMessage="Client Name Cant be greater than 40 charecters"
        return true;

       }
  }
}

shortNameUpdateValidation(){
  if(!this.IncidentEditable){
    if(this.ResourceTypeCategory==''){
      this.shortNameUpdateErrorMessage="Short Name Cant be empty"
      return true;
    }
    else if(!(/^[a-zA-Z]+$/.test(this.ResourceTypeCategory))){
     this.shortNameUpdateErrorMessage="Short Name Cant have numbers or any spectialcharecters"
     return true;
    }
    else if(this.ResourceTypeCategory.length<3){
     this.shortNameUpdateErrorMessage="Short Name Cant be less than 3 charecters"
     return true;
    }
    else if(this.ResourceTypeCategory.length>40){
     this.shortNameUpdateErrorMessage="Short Name Cant be greater than 40 charecters"
     return true;

    }

}

}

addressupdateValidation(){
  if(!this.IncidentEditable){
    if(this.ResourceTypeItem==''){
      this.addressupdateErrorMessage="RESOURCE TYPE Cant be empty"
      return true;
    }
    else if(!(/^[a-zA-Z0-9]+$/.test(this.ResourceTypeItem))){
     this.addressupdateErrorMessage="RESOURCE TYPE Name Cant have any spectialcharecters"
     return true;
    }
    else if(this.ResourceTypeItem.length<3){
     this.addressupdateErrorMessage="RESOURCE TYPE Cant be less than 3 charecters"
     return true;
    }
    else if(this.ResourceTypeItem.length>40){
     this.addressupdateErrorMessage="RESOURCE TYPE Cant be greater than 40 charecters"
     return true;

    }

}

}
remarksupdateValidation(){
  if(!this.IncidentEditable){
    if(this.ResourceTypeRemarks==''){
      this.remarksupdateErrorMessage="Remarks Cant be empty"
      return true;
    }
    else if(!(/^[a-zA-Z]+$/.test(this.ResourceTypeRemarks))){
     this.remarksupdateErrorMessage="remarks Name Cant have any spectialcharecters"
     return true;
    }
    else if(this.ResourceTypeRemarks.length<3){
     this.remarksupdateErrorMessage="remarks Cant be less than 3 charecters"
     return true;
    }
    else if(this.ResourceTypeRemarks.length>40){
     this.remarksupdateErrorMessage="remarks Cant be greater than 10 charecters"
     return true;

    }

}

}



editDetailselectedvalidate():boolean{

if(
   this.remarksupdateValidation()|| 
   this.addressupdateValidation()||
   this.ClientUpdateValidation() ||
   this.shortNameUpdateValidation()
  ){
    this.MainUpdateError="Please enter all valid Inputs and Update"
    return true;
  }

}

phoneupdateValidation(){
//   if(!this.IncidentEditable){
//     if(this.phoneupdate==''){
//       this.phoneupdateErrorMessage="Phone number Cant be empty"
//       return true;
//     }
//     else if(!(/^[0-9]+$/.test(this.phoneupdate))){
//      this.phoneupdateErrorMessage="phone number Cant have anycharecters or  spectialcharecters"
//      return true;
//     }
//     else if(!(this.phoneupdate.length==10)){
//      this.phoneupdateErrorMessage="Phone number must have  10 digits "
//      return true;
//     }

// }

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
  args={ filename:this.DetailSelected.clientName+".csv"}
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
 let pdfName=this.DetailSelected.clientName+".pdf";
  doc.save(pdfName) ;

}

ngOnDestroy() {

}
}