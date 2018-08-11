import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { SharedService } from '../shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientCrudService } from '../services/client-crud.service';
import { BusinessGroupCrudService } from '../services/business-group-crud.service';
declare let jsPDF;
@Component({
  selector: 'app-business-groups',
  templateUrl: './business-groups.component.html',
  styleUrls: ['./business-groups.component.scss']
})
export class BusinessGroupsComponent implements OnInit {

  @Output()   TestResult: EventEmitter<any> = new EventEmitter();
clientDetails;
clientCounter:number;


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
  top: '-35px',
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
  'font-size': '12px',
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
  
  businessClientUpdate;
  clientIdupdate;
  clientNameupdate;
  businessGroupNameupdate;
  businessgroupupdate;
  shortNameupdate;
  businessGroupshortNameupdate;
  addressupdate;
  businessGroupDescupdate;
  businessremarksupdate;
  phoneupdate;
  dateOfBirthupdate;
  businessStatusupdate;
  isactiveupdate;
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
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
    persons= [];
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
  UpdateBusinessGroupForm:FormGroup;
  AddNewBusinessGroup: FormGroup;
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
private BusinessGroupCrudService:BusinessGroupCrudService) { 
    this.intialisedetail();
  
  }

    ngOnInit(): void {

      
    
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
       
        this.AddNewBusinessGroup = this.fb.group({
          name: ['', [Validators.required, Validators.minLength(1)]],
          shortName :['', Validators.required],
          remarks:['',Validators.required],
          businessGroupDesc:['',Validators.required],
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
  this.defaultUpdateValues();
  console.log(this.DetailSelected.IncidetNo);


  console.log(value.IncidetNo);
this.testvalue=value.businessGroupId;
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
  this.BusinessGroupCrudService.getBusinessGroupDetails().subscribe(product => {

    console.log("GetInformation----->"+product.json());
   console.log(product.status);

   console.log(product.json().businessGroups);
   console.log(JSON.stringify(product.json().businessGroups));
  this.persons=product.json().businessGroups;
  this.clientCounter=product.json().businessGroups.length;
this.clientDetails=this.BusinessGroupCrudService.clientDetails;

console.log("clientDetails------>"+this.clientDetails);
            for(let i=0;i<product.json().businessGroups.length-1;i++){
            if(i==0){
              this.DetailSelected=product.json().businessGroups[i];
              this.testvalue=this.DetailSelected.businessGroupId;
              this.defaultUpdateValues()
        console.log("this is this.DetailSelected-->"+this.DetailSelected);
            }
          }

//          this.dtTrigger.next();

this.ClientCrudService.statuscode=product.status;
  });
  
}












Updateclient(){
let clientId;
  console.log(this.businessGroupNameupdate);
console.log(this.businessGroupshortNameupdate);
console.log(this.businessGroupDescupdate);
console.log(this.businessremarksupdate);
console.log(this.businessStatusupdate);
console.log(this.DetailSelected.businessGroupId)
console.log(this.businessClientUpdate)
for(let i=0;i<this.clientDetails.length;i++){
  if(this.clientDetails[i].clientName==this.businessClientUpdate)
  {
   clientId=this.clientDetails[i].clientId;
   console.log(clientId);
  }
  }
  


let ClientInfo =
{ 
"businessGroupId":this.DetailSelected.businessGroupId,
"businessGroupDesc":this.businessGroupDescupdate, 
"name":this.businessGroupNameupdate,
      "shortName": this.businessGroupshortNameupdate,
      "isActive": true,
      "remarks": this.businessremarksupdate,
      "clientInfo":{
        "clientId":clientId        
      }
}
let ClientInfotwo=JSON.stringify(ClientInfo);
console.log("constructed Json"+ClientInfotwo);
//let url="https://10.31.15.210:8243/ACP/1.0/acp/clients/"+this.DetailSelected.clientId
let url="http://10.31.15.210:9000/acp/businessGroups/"+this.DetailSelected.businessGroupId
console.log(url);
this.BusinessGroupCrudService.UpdateBusinessGroupDetails(ClientInfotwo,url).subscribe(product => {
// this.persons=product.json().clients;

  console.log("after update"+product.json());
  this.DetailSelected=product.json().clientDetails;
  this.IncidentEditable=true;
 console.log(product.status);
 console.log(JSON.stringify(product.json()));
 this.rerender();
this.getclientDetails();

 this.ClientCrudService.statuscode=product.status;
});

  }

  
  deleteBusinessGroup(){
    console.log(this.DetailSelected.businessGroupId);

    this.BusinessGroupCrudService.DeleteBusinessUnitsDetails(this.DetailSelected.businessGroupId).subscribe(product => {

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

AddBusinessGroup(selectedvalues){
let clientId;
  this.SharedService.OptionSelectedtest.next('');
  console.log(selectedvalues);
for(let i=0;i<this.clientDetails.length;i++){
if(this.clientDetails[i].clientName==selectedvalues.clientInfo.clientId)
{
 clientId=this.clientDetails[i].clientId;
 console.log(clientId);
}

}

  let temppostvalues=selectedvalues;
   temppostvalues.isActive=true;
   temppostvalues.clientInfo.clientId=clientId;
   console.log("changed values"+temppostvalues);
   console.log(JSON.stringify(temppostvalues));
  
  this.BusinessGroupCrudService.postBusinessDetailsDetails(JSON.stringify(temppostvalues)).subscribe(product => {
  
    console.log("success");
    console.log("GetInformation----->"+product.json());
    console.log(JSON.stringify(product.json()));
    // this.router.navigate(['/HomeComponent']);
    this.getclientDetails();
   location.reload();
    console.log(product.status);
   });
  
  
  
  }
  MakeAddClientEnable(){
    this.enableClientNew=true;
    this.SharedService.OptionSelectedtest.next('ADD NEW Business ');



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
defaultUpdateValues(){
  this.businessGroupNameupdate=this.DetailSelected.name;
  this.businessremarksupdate=this.DetailSelected.remarks;
  this.businessGroupDescupdate=this.DetailSelected.businessGroupDesc;
  this.businessStatusupdate=this.DetailSelected.isActive;
  this.businessClientUpdate=this.DetailSelected.clientDetails.clientName;
 
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
