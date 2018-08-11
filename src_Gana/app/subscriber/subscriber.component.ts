import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { FormGroup, FormBuilder, Validators, FormControl, FormControlName } from '@angular/forms';
import { Http } from '@angular/http';
import { SharedService } from '../shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientCrudService } from '../services/client-crud.service';
import { BusinessUnitsService } from '../services/business-units.service';
import { BusinessGroupCrudService } from '../services/business-group-crud.service';
import { SubscriberService } from '../services/subscriber.service';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-subscriber',
  templateUrl: './subscriber.component.html',
  styleUrls: ['./subscriber.component.scss']
})
export class SubscriberComponent implements OnInit {
 businessunotvalue_key;
  businessUnitInfoKeyValue={};
  businessGroupInfo=[];
  clientinfo=[];
  @Output()   TestResult: EventEmitter<any> = new EventEmitter();
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }
  ngAfterViewChecked(): void {




    $('.dt-button.buttons-collection.buttons-colvis').addClass('fa fa-ellipsis-h');
    $('.dt-button.buttons-collection.buttons-colvis span').addClass('hide');
    $('.buttons-columnVisibility span').addClass('fa fa-times') ;
    $('.buttons-columnVisibility.active span').removeClass('fa fa-times') 

    $('button.buttons-colvis').css({
      position:'absolute',
      left: '1187px',
      top: '-36px',
      border: 'none',
      'background-color': 'white',
      'background-image': '-webkit-gradient(linear, left top, left bottom, from(white), to(white))'
  
    });

 //   this.dtTrigger.next();
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

 {
  
}

$('.dataTables_scrollBody').css({
  'border-bottom':'1px solid #FFF',

});

  }



  DataToCsv;
subscriberId;
subscriberName;
subsDesc;
remarks;
authAttribute;
isActive;

  clientIdupdate;
  clientNameupdate;
  shortNameupdate;
  addressupdate;
  phoneupdate;
  dateOfBirthupdate;
  statusupdate;
  remarksupdate;

  
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
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
    persons= [];
    personsBackUp= [];
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
//form
personDetails;
  testDetail;
  AddNewTask: FormGroup;
  UpdateIncident: FormGroup;
  UpdateclientDetail:FormGroup;
  products;
  clientCounter:number;
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
  private SubscriberService:SubscriberService,
private BusinessGroupCrudService:BusinessGroupCrudService,
private BusinessUnitsService:BusinessUnitsService) { 
    this.intialisedetail();
  
  }

    ngOnInit(): void {
      this.loader();
      
    
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
        scrollCollapse:true

  
      };
      //https://10.31.15.210:8243/ACP/1.0/acp/clients
      // https://10.31.15.210:8243/api/1.0/acp/clients
///assets/Data/sample.json
    
this.getclientDetails();
this.getBusinessUnitDetails();
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
          subscriberName: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(15)]],
          shortName :['', [Validators.required, Validators.minLength(3),Validators.maxLength(15)]],
          subsDesc:['',[Validators.required, Validators.minLength(3),Validators.maxLength(15)]],
          remarks:['',[Validators.required, Validators.minLength(3),Validators.maxLength(15)]],
          authAttribute:['',Validators.required],
          clientInfo:this.fb.group({
            clientId:['']
          })
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
  this.DetailSelectedshow=true;
  console.log(this.DetailSelected.IncidetNo);


  console.log(value.IncidetNo);
this.testvalue=value.subscriberId;
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

getclientDetails(){
  this.SubscriberService.getSubscriberDetails().subscribe(product => {

    console.log("GetInformation----->"+product.json());
   console.log(product.status);
   this.persons=product.json().subscribers;
   console.log(JSON.stringify(product.json().subscribers));
   this.BusinessGroupCrudService.clientDetails=product.json().subscribers;
  this.persons=product.json().subscribers;
  this.clientCounter=product.json().subscribers.length;

            for(let i=0;i<product.json().subscribers.length-1;i++){
            if(i==0){
              this.DetailSelected=product.json().subscribers[i];
        
              this.testvalue=this.DetailSelected.subscriberId;
              this.defaultUpdateValues();
               this.DataToCsv=product.json().subscribers[i];

        
            }
          }

//          this.dtTrigger.next();

this.ClientCrudService.statuscode=product.status;
  });
  
}

ClientinfoafterUpdate=[]
getBusinessUnitDetails(){
  
  
  this.ClientCrudService.getClientDetails().subscribe(product => {
    this.clientinfo =product.json().clients;
    console.log("clientinfo information"+JSON.stringify(this.clientinfo));

for(let i=0;i<this.clientinfo.length;i++){

console.log(this.clientinfo[i].clientId);
console.log(this.clientinfo[i].clientName);
console.log(this.clientinfo[i].shortName);
console.log(this.clientinfo[i].isActive);
console.log(this.clientinfo[i].address);
console.log(this.clientinfo[i].remarks   );
console.log(this.clientinfo[i].status);

this.businessUnitInfoKeyValue[this.clientinfo[i].clientName]=this.clientinfo[i].clientId;
this.ClientinfoafterUpdate[this.clientinfo[i].clientId]=this.clientinfo[i].clientName;

console.log('this is bisinessgroup key value pair-->'+JSON.stringify(this.businessUnitInfoKeyValue));


}
});

}





  Updateclient(){

 
console.log(this.subscriberName);
console.log(this.clientNameupdate);
console.log(this.subsDesc);
console.log(this.remarks);
console.log(this.authAttribute);
console.log(this.isActive);
console.log(this.DetailSelected.clientId)

let ClientInfo =
{ 
  "subscriberId":this.DetailSelected.subscriberId,
"subscriberName":this.subscriberName,
      "subsDesc": this.subsDesc,
      "isActive": true,
      "remarks": this.remarks,
      "authAttribute": this.authAttribute,
      "clientInfo": {
        "clientId": this.businessUnitInfoKeyValue[this.businessunotvalue_key]
      }
      
}
console.log("umma"+this.businessUnitInfoKeyValue[this.businessunotvalue_key]);

console.log(this.businessUnitInfoKeyValue[this.businessunotvalue_key])
let ClientInfotwo=JSON.stringify(ClientInfo);
console.log("constructed Json"+ClientInfotwo);
let url="http://10.31.15.210:9000/acp/subscribers/"+this.DetailSelected.subscriberId;
//let url="http://10.31.15.210:9000/acp/clients/"+this.DetailSelected.subscriberId;
 console.log(url);
 this.SubscriberService.UpdateSubscriberDetails(ClientInfotwo,url).subscribe(product => {
//  this.persons=product.json().subscribers;

  console.log("after update"+product.json());
  this.DetailSelected=product.json().subscriber;
  this.DetailSelected.clientDetails.clientName=this.ClientinfoafterUpdate[this.DetailSelected.clientDetails.clientId];
  console.log("AFter UPdate"+this.DetailSelected)
  this.IncidentEditable=true;

  console.log(product.status);
  console.log(JSON.stringify(product.json()));

// this.getclientDetails();
 this.SubscriberService.getSubscriberDetails().subscribe(product => {
  console.log(JSON.stringify(product.json().clients));
  this.persons=product.json().subscribers;
  this.rerender();
  this.clientCounter=product.json().subscribers.length;
//  this.myFunction1();
  });
 
 });

  }

  myFunction1() {
    console.log("before check-->")
    $('#alertupdate').removeClass('hide');
    $('#alertupdate').addClass('alert alert-success alert-dismissible fade in');
   
  }
  



  deleteSubscriber(){
    console.log(this.DetailSelected.subscriberId);

    this.SubscriberService.DeleteBusinessDetails(this.DetailSelected.subscriberId).subscribe(product => {

      console.log("GetInformation----->"+product.json());
      console.log(JSON.stringify(product.json()));
     console.log(product.status);
//    this.persons=product.json().subscriberDetails;
    this.getclientDetails();
    this.ClientCrudService.statuscode=product.status;   
  });
        
  this.deleteModal.nativeElement.click();
  }

//starting of new Client addion

uservalidateAndGetProdut(values){

  this.SharedService.OptionSelectedtest.next('');
  values.clientInfo.clientId=this.businessUnitInfoKeyValue[values.clientInfo.clientId];
  
  console.log(values);
  let temppostvalues=values;
  temppostvalues.isActive=true;
  console.log("changed values"+temppostvalues);
  console.log(JSON.stringify(temppostvalues));
  
  this.SubscriberService.postBusinessDetailsDetails(JSON.stringify(temppostvalues)).subscribe(product => {
  
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
    this.SharedService.OptionSelectedtest.next('ADD NEW SUBSCRIBER');



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
defaultUpdateValues(){

  this.authAttribute=this.DetailSelected.authAttribute;
  this.subscriberName=this.DetailSelected.subscriberName;
  this.subsDesc=this.DetailSelected.subsDesc;
  this.remarks=this.DetailSelected.remarks;
  this.isActive=this.DetailSelected.isActive;
  this.businessunotvalue_key=this.DetailSelected.businessUnitDetails.name;
  
 
}
subscriberNameUpdateErrorMessage;
SubscriberNameUpdateValidation():boolean{
  if(!this.IncidentEditable){
       if(this.subscriberName==''){
         this.subscriberNameUpdateErrorMessage="Suscriber Name Cant be empty"
         return true;
       }
       else if(!(/^[a-zA-Z\s]+$/.test(this.subscriberName))){
        this.subscriberNameUpdateErrorMessage="Suscriber Name Cant have numbers or any spectialcharecters"
        return true;
       }
       else if(this.subscriberName.length<3){
        this.subscriberNameUpdateErrorMessage="Suscriber Name Cant be less than 3 charecters"
        return true;
       }
       else if(this.subscriberName.length>40){
        this.subscriberNameUpdateErrorMessage="Suscriber Name Cant be greater than 40 charecters"
        return true;

       }
  }
}
subsDescUpdateErrorMessage;
SUbscriberDescriptionUpdateValidation(){ 
  if(!this.IncidentEditable){
    if(this.subsDesc==''){
      this.subsDescUpdateErrorMessage="Short Name Cant be empty"
      return true;
    }
    else if(!(/^[a-zA-Z]+$/.test(this.subsDesc))){
     this.subsDescUpdateErrorMessage="Short Name Cant have numbers or any spectialcharecters"
     return true;
    }
    else if(this.subsDesc.length<3){
     this.subsDescUpdateErrorMessage="Short Name Cant be less than 3 charecters"
     return true;
    }
    else if(this.subsDesc.length>40){
     this.subsDescUpdateErrorMessage="Short Name Cant be greater than 40 charecters"
     return true;

    }

}

}

// BusinessDescupdateValidation(){
//   if(!this.IncidentEditable){
//     if(this.businessUnitDescUpdate==''){
//       this.businessGroupDescErrorMessage="Business Description Cant be empty"
//       return true;
//     }
//     else if(!(/^[a-zA-Z0-9]+$/.test(this.businessUnitDescUpdate))){
//      this.businessGroupDescErrorMessage="Business Description Cant have any spectialcharecters"
//      return true;
//     }
//     else if(this.businessUnitDescUpdate.length<3){
//      this.businessGroupDescErrorMessage="Business Description Cant be less than 3 charecters"
//      return true;
//     }
//     else if(this.businessUnitDescUpdate.length>40){
//      this.businessGroupDescErrorMessage="Business Description Cant be greater than 40 charecters"
//      return true;

//     }

// }

//}
AuthAttributeErrorMessage
AuthAttributeValidation(){
  if(!this.IncidentEditable){
    if(this.authAttribute==''){
      this.AuthAttributeErrorMessage="Auth Attribute Cant be empty"
      return true;
    }
    else if(!(/^[a-zA-Z]+$/.test(this.authAttribute))){
     this.AuthAttributeErrorMessage="Auth Attribute  Cant have any spectialcharecters"
     return true;
    }
    else if(this.authAttribute.length<3){
     this.AuthAttributeErrorMessage="Auth Attribute Cant be less than 3 charecters"
     return true;
    }
    else if(this.authAttribute.length>40){
     this.AuthAttributeErrorMessage="Auth Attribute Cant be greater than 10 charecters"
     return true;

    }

}

}
SubscriberRemarkErrorMessage;
remarksupdateValidation(){
  if(!this.IncidentEditable){
    if(this.remarks==''){
      this.SubscriberRemarkErrorMessage="remarks Cant be empty"
      return true;
    }
    else if(!(/^[a-zA-Z]+$/.test(this.remarks))){
     this.SubscriberRemarkErrorMessage="remarks Name Cant have any spectialcharecters"
     return true;
    }
    else if(this.remarks.length<3){
     this.SubscriberRemarkErrorMessage="remarks Cant be less than 3 charecters"
     return true;
    }
    else if(this.remarks.length>40){
     this.SubscriberRemarkErrorMessage="remarks Cant be greater than 10 charecters"
     return true;

    }

}

}


MainUpdateError;
editDetailselectedvalidate():boolean{

if(
   this.remarksupdateValidation()|| 
   this.SubscriberNameUpdateValidation()||
   this.SUbscriberDescriptionUpdateValidation() 
  ){
    this.MainUpdateError="Please enter all valid Inputs and Update"
    return true;
  }

}

ngOnDestroy() {

}

}
