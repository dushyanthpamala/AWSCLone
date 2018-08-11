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
declare let jsPDF;

@Component({
  
  selector: 'app-business-units',
  templateUrl: './business-units.component.html',
  styleUrls: ['./business-units.component.scss']
})
export class BusinessUnitsComponent implements OnInit {
  BusinessUnitNameUpdateErrorMessage;
  shortNameUpdateErrorMessage;
  businessGroupDescErrorMessage;
  BusinessRemarkErrorMessage;
  MainUpdateError;
  businessGroupInfo=[];
  businessGroupInfoKeyValue={};  
  BusinessUnitBussinessGroup:FormGroup;
  clientCounter:number;
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
  clientIdupdate;
  clientNameupdate;
  shortNameupdate;
  BusinessUnitNameUpdate;
  BusinessShortNameupdate;
  businessUnitDescUpdate;
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
  dtOptions: any= {};
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
        scrollCollapse:true,
        dom: 'Blcfrtipe',
        "buttons": [
          {
             extend: 'colvis',
             postfixButtons: ['colvisRestore'],
          }
        ]

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
  
          name: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(40)]],
          shortName :['',[Validators.required, Validators.minLength(3),Validators.maxLength(40)]],
          businessUnitDesc:['',[Validators.required, Validators.minLength(3),Validators.maxLength(40)]],
          remarks:['',[Validators.required, Validators.minLength(3),Validators.maxLength(40)]],
          businessGroupInfo:this.fb.group({
            businessGroupId:['',Validators.required]
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
  this.defaultUpdateValues();
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
  this.clientCounter=product.json().businessUnits.length;

            for(let i=0;i<product.json().businessUnits.length-1;i++){
            if(i==0){
              this.DetailSelected=product.json().businessUnits[i];
              this.testvalue=this.DetailSelected.businessUnitId;
              this.defaultUpdateValues()
        
            }
          }

//          this.dtTrigger.next();

this.ClientCrudService.statuscode=product.status;
  });
  
}

  Updateclient(){
console.log(this.BusinessUnitNameUpdate);
console.log(this.BusinessShortNameupdate);
console.log(this.businessUnitDescUpdate);
console.log(this.BusinessRemarksupdate);
console.log(this.statusupdate);
console.log(this.BusinessUnitBusinessGroupName);
console.log(this.remarksupdate);
console.log(this.DetailSelected.clientId)

let BusinessInfo =
{ 
"businessUnitId":this.DetailSelected.businessUnitId,
"businessGroupInfo":{
"businessGroupId":this.businessGroupInfoKeyValue[this.BusinessUnitBusinessGroupName]  
},
      "name": this.BusinessUnitNameUpdate,
      "shortName": this.BusinessShortNameupdate,
      "businessUnitDesc": this.businessUnitDescUpdate,
      "remarks": this.BusinessRemarksupdate,
      "isActive": true,
      
}
let ClientInfotwo=JSON.stringify(BusinessInfo);
console.log("constructed Json"+ClientInfotwo);
let url="http://10.31.15.210:9000/acp/businessUnits/"+this.DetailSelected.businessUnitId
console.log(url);
this.ClientCrudService.UpdateClientDetails(ClientInfotwo,url).subscribe(product => {
// this.persons=product.json().clients;

  console.log("after update"+product.json());
  this.DetailSelected=product.json().clientDetails;
  this.IncidentEditable=true;
 console.log(product.status);
 console.log(JSON.stringify(product.json()));
 this.rerender();
 this.updateAlert();
this.getclientDetails();

 this.ClientCrudService.statuscode=product.status;
});

  }
  deleteClient(){

    console.log(this.DetailSelected.businessUnitId);
    this.BusinessUnitsService.DeleteBusinessUnitDetails(this.DetailSelected.businessUnitId).subscribe(product => {

      console.log("GetInformation----->"+product.json());
      console.log(JSON.stringify(product.json()));
     console.log(product.status);
    this.persons=product.json().clients;
    this.myFunction();
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
defaultUpdateValues(){
  this.BusinessUnitNameUpdate=this.DetailSelected.name;
  this.BusinessShortNameupdate=this.DetailSelected.shortName;
//  this.dateOfBirthupdate=this.DetailSelected.dateOfBirth;
  this.businessUnitDescUpdate=this.DetailSelected.businessUnitDesc;
  this.BusinessRemarksupdate=this.DetailSelected.remarks;
  this.statusupdate=this.DetailSelected.isActive;
  // this.=this.DetailSelected.phone;
 
}



BusinessUnitNameUpdateValidation():boolean{
  if(!this.IncidentEditable){
       if(this.BusinessUnitNameUpdate==''){
         this.BusinessUnitNameUpdateErrorMessage="Client Name Cant be empty"
         return true;
       }
       else if(!(/^[a-zA-Z\s]+$/.test(this.BusinessUnitNameUpdate))){
        this.BusinessUnitNameUpdateErrorMessage="Client Name Cant have numbers or any spectialcharecters"
        return true;
       }
       else if(this.BusinessUnitNameUpdate.length<3){
        this.BusinessUnitNameUpdateErrorMessage="Client Name Cant be less than 3 charecters"
        return true;
       }
       else if(this.BusinessUnitNameUpdate.length>40){
        this.BusinessUnitNameUpdateErrorMessage="Client Name Cant be greater than 40 charecters"
        return true;

       }
  }
}

shortNameUpdateValidation(){
  if(!this.IncidentEditable){
    if(this.BusinessShortNameupdate==''){
      this.shortNameUpdateErrorMessage="Short Name Cant be empty"
      return true;
    }
    else if(!(/^[a-zA-Z]+$/.test(this.BusinessShortNameupdate))){
     this.shortNameUpdateErrorMessage="Short Name Cant have numbers or any spectialcharecters"
     return true;
    }
    else if(this.BusinessShortNameupdate.length<3){
     this.shortNameUpdateErrorMessage="Short Name Cant be less than 3 charecters"
     return true;
    }
    else if(this.BusinessShortNameupdate.length>40){
     this.shortNameUpdateErrorMessage="Short Name Cant be greater than 40 charecters"
     return true;

    }

}

}

BusinessDescupdateValidation(){
  if(!this.IncidentEditable){
    if(this.businessUnitDescUpdate==''){
      this.businessGroupDescErrorMessage="Business Description Cant be empty"
      return true;
    }
    else if(!(/^[a-zA-Z0-9]+$/.test(this.businessUnitDescUpdate))){
     this.businessGroupDescErrorMessage="Business Description Cant have any spectialcharecters"
     return true;
    }
    else if(this.businessUnitDescUpdate.length<3){
     this.businessGroupDescErrorMessage="Business Description Cant be less than 3 charecters"
     return true;
    }
    else if(this.businessUnitDescUpdate.length>40){
     this.businessGroupDescErrorMessage="Business Description Cant be greater than 40 charecters"
     return true;

    }

}

}
remarksupdateValidation(){
  if(!this.IncidentEditable){
    if(this.BusinessRemarksupdate==''){
      this.BusinessRemarkErrorMessage="remarks Cant be empty"
      return true;
    }
    else if(!(/^[a-zA-Z]+$/.test(this.BusinessRemarksupdate))){
     this.BusinessRemarkErrorMessage="remarks Name Cant have any spectialcharecters"
     return true;
    }
    else if(this.BusinessRemarksupdate.length<3){
     this.BusinessRemarkErrorMessage="remarks Cant be less than 3 charecters"
     return true;
    }
    else if(this.BusinessRemarksupdate.length>40){
     this.BusinessRemarkErrorMessage="remarks Cant be greater than 10 charecters"
     return true;

    }

}

}



editDetailselectedvalidate():boolean{

if(
   this.remarksupdateValidation()|| 
   this.BusinessDescupdateValidation()||
   this.BusinessUnitNameUpdateValidation() ||
   this.shortNameUpdateValidation()
  ){
    this.MainUpdateError="Please enter all valid Inputs and Update"
    return true;
  }

}

// phoneupdateValidation(){
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

// }
myFunction() {
  console.log("before check-->")
  $('#alert').removeClass('hide');
  $('#alert').addClass('alert alert-success alert-dismissible fade in');
 
}

updateAlert() {
  console.log("before check-->")
  $('#alertupdate').removeClass('hide');
  $('#alertupdate').addClass('alert alert-success alert-dismissible fade in');
 
}

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
  args={ filename:this.DetailSelected.name+".csv"}
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
 let pdfName=this.DetailSelected.name+".pdf";
  doc.save(pdfName) ;

}


ngOnDestroy() {

}
}
