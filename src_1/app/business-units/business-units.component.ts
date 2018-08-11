import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { SharedService } from '../shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientCrudService } from '../services/client-crud.service';
import { BusinessUnitsService } from '../services/business-units.service';
import { BusinessGroupCrudService } from '../services/business-group-crud.service';
import { DataTableDirective } from 'angular-datatables';

@Component({
  
  selector: 'app-business-units',
  templateUrl: './business-units.component.html',
  styleUrls: ['./business-units.component.scss']
})
export class BusinessUnitsComponent implements OnInit {
  businessGroupInfo=[];
  businessGroupInfoKeyValue={};  
  BusinessUnitBussinessGroup:FormGroup;
  @Output()   TestResult: EventEmitter<any> = new EventEmitter();
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngAfterViewChecked(): void {
 //   this.dtTrigger.next();
    $('.dataTables_filter').css({

      float: 'right',
      'text-align': 'right',
      position: 'absolute',
      left: '22px',
      right: '137px',
      'z-index': 1,
      top: '-35px'
    })

    $('.dataTables_filter input').css({
      border:'1px solid #DDD',
      'font-size': '12px',
      'font-weight':'normal',
       padding:'3px',
    });

    $('.dataTables_scrollBody').css({
      'border-bottom':'1px solid #FFF',

    });
  }
  clientIdupdate;
  clientNameupdate;
  shortNameupdate;
  BusinessUnitNameUpdate;
  BusinessShortNameupdate;
  businessGroupDescUpdate;
  BusinessRemarksupdate;
  BusinessUnitBusinessGroupName;
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
    persons = [];
    personsBackUp = [];
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
        pagingType:'numbers',
        pageLength:5,
        paging :false,
        info:false,
        scrollY:'30vh',
        scrollCollapse:true
  
      };
      //https://10.31.15.210:8243/ACP/1.0/acp/clients
      // https://10.31.15.210:8243/api/1.0/acp/clients
///assets/Data/sample.json
    
this.getclientDetails();
this.getBusinessGroupInfo();
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
          // clientName: ['', [Validators.required, Validators.minLength(1)]],
          // shortName :['', Validators.required],
          // address:['',Validators.required],
          // remarks:['',Validators.required],
          // phone:['',Validators.required],
          // dateOfBirth:['',Validators.required],businessUnitId
          name: ['', [Validators.required, Validators.minLength(1)]],
          shortName :['', Validators.required],
          businessUnitDesc:['',Validators.required],
          remarks:['',Validators.required],
          businessGroupInfo:this.fb.group({
            businessGroupId:['']
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
this.testvalue=value.businessUnitId;
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
  this.BusinessUnitsService.getBusinessUnitsDetails().subscribe(product => {

    console.log("GetInformation----->"+product.json());
   console.log(product.status);
   console.log(JSON.stringify(product.json().businessUnits));
   this.BusinessGroupCrudService.clientDetails=product.json().businessUnits;
  this.persons=product.json().businessUnits;

            for(let i=0;i<product.json().businessUnits.length-1;i++){
            if(i==0){
              this.DetailSelected=product.json().businessUnits[i];
        
            }
          }

//          this.dtTrigger.next();

this.ClientCrudService.statuscode=product.status;
  });
  
}

  Updateclient(){
console.log(this.BusinessUnitNameUpdate);
console.log(this.BusinessShortNameupdate);
console.log(this.businessGroupDescUpdate);
console.log(this.BusinessRemarksupdate);
console.log(this.statusupdate);
console.log(this.BusinessUnitBusinessGroupName);
console.log(this.remarksupdate);
console.log(this.DetailSelected.clientId)

let BusinessInfo =
{ 
"businessUnitId":this.DetailSelected.businessUnitId,
"businessGroups":{
"businessGroupId":this.businessGroupInfoKeyValue[this.BusinessUnitBusinessGroupName]  
},
      "name": this.BusinessUnitNameUpdate,
      "shortName": this.BusinessShortNameupdate,
      "businessUnitDesc": this.businessGroupDescUpdate,
      "remarks": this.BusinessRemarksupdate,
      "isActive": this.statusupdate,
      
}
let ClientInfotwo=JSON.stringify(BusinessInfo);
console.log("constructed Json"+ClientInfotwo);
//let url="https://10.31.15.210:8243/ACP/1.0/acp/clients/"+this.DetailSelected.clientId
// let url="https://10.31.15.210:9000/acp/clients/"+this.DetailSelected.clientId
// console.log(url);
// this.ClientCrudService.UpdateClientDetails(ClientInfotwo,url).subscribe(product => {
// // this.persons=product.json().clients;

//   console.log("after update"+product.json());
//   this.DetailSelected=product.json().clientDetails;
//   this.IncidentEditable=true;
//  console.log(product.status);
//  console.log(JSON.stringify(product.json()));
//  this.rerender();
// this.getclientDetails();

//  this.ClientCrudService.statuscode=product.status;
// });

  }
  deleteClient(){

    console.log(this.DetailSelected.businessUnitId);
    this.BusinessUnitsService.DeleteBusinessUnitDetails(this.DetailSelected.businessUnitId).subscribe(product => {

      console.log("GetInformation----->"+product.json());
      console.log(JSON.stringify(product.json()));
     console.log(product.status);
    this.persons=product.json().clients;
    this.getclientDetails();
    this.ClientCrudService.statuscode=product.status;   
  });
        
     this.deleteModal.nativeElement.click();
  }

//starting of new Client addion

uservalidateAndGetProdut(values){

  values.businessGroupInfo.businessGroupId=this.businessGroupInfoKeyValue[values.businessGroupInfo.businessGroupId];

this.SharedService.OptionSelectedtest.next('');
  console.log(values);
console.log("value of businessgroupid-->"+this.businessGroupInfoKeyValue[values.businessGroupInfo.businessGroupId]);
let temppostvalues=values;
  temppostvalues.isActive=true;
  console.log("changed values"+temppostvalues);
  console.log(JSON.stringify(temppostvalues));
  
  this.BusinessUnitsService.postBusinessUnitDetails(JSON.stringify(temppostvalues)).subscribe(product => {
  
    console.log("success");
    console.log("GetInformation----->"+product.json());
    console.log(JSON.stringify(product.json()));
    this.getclientDetails();    // this.router.navigate(['/HomeComponent']);
    location.reload();
    console.log(product.status);
   });
  
  
  
  }
  MakeAddClientEnable(){
    this.enableClientNew=true;
    this.SharedService.OptionSelectedtest.next('ADD NEW CLIENT');



  }
  disableclientaddform(){
    this.enableClientNew=false;
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
  

ngOnDestroy() {

}
}
