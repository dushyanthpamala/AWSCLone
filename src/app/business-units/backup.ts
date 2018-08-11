import { Subject } from 'rxjs/Subject';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { SharedService } from '../shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientCrudService } from '../services/client-crud.service';
import { BusinessUnitsService } from '../services/business-units.service';
import { BusinessGroupCrudService } from '../services/business-group-crud.service';
import { Component, OnInit, ViewChild, ElementRef, EventEmitter, ChangeDetectorRef, Output } from '@angular/core';

@Component({
  
  selector: 'app-business-units',
  templateUrl: './business-units.component.html',
  styleUrls: ['./business-units.component.scss']
})
export class BusinessUnitsComponent implements OnInit {
  
    businessGroupInfo=[];
    businessGroupInfoKeyValue={};
    businessGroupId;
    businessGroupname;
    businessGroupnameObject;
    businessGroupshortName;
    businessName;
    businessShortName;
    businessUnitDesc;
    businessgroupRemarks;
    remarks;
    
    @ViewChild('deleteModal') deleteModal: ElementRef;
  
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
      persons= [];
      personsBackUp = [];
      searchTerm;
      @ViewChild("first", {read: ElementRef}) first: ElementRef;
  
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
    UpdateBusinessUnitForm:FormGroup;
    products;
    getuserNameAndPassword=new Array();
    IsCurrentUser: boolean = false;
    @Output() unhideDetail: EventEmitter<boolean> =
      new EventEmitter<boolean>();
      @Output() hideDetail: EventEmitter<boolean> =
      new EventEmitter<boolean>();
   
      
  url="https://10.31.15.210:8243/api/1.0/acp/clients";
  
  constructor(private cd : ChangeDetectorRef,
    private http: Http,
    private SharedService:SharedService, 
    private fb: FormBuilder, 
    private route: ActivatedRoute,
    private router: Router,
    private ClientCrudService:ClientCrudService,
  private BusinessUnitsService:BusinessUnitsService,
private BusinessGroupCrudService:BusinessGroupCrudService) { 
      this.intialisedetail();
    
    }
  
      ngOnInit(): void {
      
        


        this.dtOptions = {
          pagingType:'numbers',
          pageLength:5,
          paging :false,
          info:false,
          scrollY:'100vh',
          scrollCollapse:true
    
        };
      
  this.getclientDetails();
  this.getBusinessGroupInfo() ; 
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
   
            for(let i=0;i<persons.clients.length-1;i++){
              if(persons.clients[i].clientId==1){
          
              }
            }
   
            this.dtTrigger.next();
            
          });
    
    
          this.UpdateBusinessUnitForm = this.fb.group({
            businessUnitId: ['', Validators.required],
            businessUnitName: ['', Validators.required],
            Password: ['', Validators.required],
            businessGroupname: ['', [Validators.required, Validators.minLength(1)]],
            businessShortName: ['', Validators.required],
            businessUnitDesc: ['', Validators.required],
            remarks: ['', Validators.required],

    //       businessGroupId;
    // businessGroupname;
    // businessGroupnameObject;
    // businessGroupshortName;
    // businessName;
    // businessShortName;
    // businessUnitDesc;
    // businessgroupRemarks;
    // remarks;

      
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
    console.log("Hi hello"+IncidentDetails.IncidetNo);
  }
  
  sendMessagetest(person): void {
    console.log(person);
    this.testDetail=person;
  }
  
  toggleDropdown(){
  
    this.showDropdownSearchsuggestion=!this.showDropdownSearchsuggestion;
  }
  
  
  getStyle(person) {
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
  
  this.height=250;
  this.zoomIncidentDetail=true;
  
  
  
  
  }
  
    zoomOutIncidentDetails(){
      this.zoomIncidentDetail=false;
  
  this.height=180;
  this.cd.detectChanges();
      
    console.log(this.persons);
      
  
    }
  
    zoomTableDetails(){
   this.heightTable=400;
  this.zoomTableDetail=true;
  
  }
    zoomOutTableDetails(){
      this.heightTable=213;
  this.zoomTableDetail=false;
    }
  
  getclientDetails(){
    this.BusinessUnitsService.getBusinessUnitsDetails().subscribe(product => {
  
      console.log("GetInformation----->"+product.json());
    this.persons=product.json().businessUnits;
  
              for(let i=0;i<product.json().businessUnits.length;i++){
              if(i==0){
                this.DetailSelected=product.json().businessUnits[i];
          
              }
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
  
    onChange(businessGroup) {
    //   alert(businessGroup);
    //  // console.log(this.businessGroupname);
    //   alert(businessGroup);
//      this.businessGroupname=this.businessGroupnameObject.name;
  //    console.log(this.businessGroupnameObject.name);
console.log("Hi hello");
}

    UpdateBusinessUnit(){

    }

    uservalidateAndGetProdut(values){
console.log(values);
console.log(values.businessGroupname);
console.log(values.businessShortName);
console.log(values.businessUnitDesc);
console.log(values.businessUnitId);
console.log(values.businessUnitName);
console.log(values.remarks);
console.log("Group Id info-->"+this.businessGroupInfoKeyValue[values.businessGroupname]);

 let BisinessUnit =
 { 
 "businessUnitId":this.DetailSelected.businessUnitId,
"businessGroups":{
  "businessGroupId":this.businessGroupInfoKeyValue[values.businessGroupname]
},
"name":values.businessUnitName,
"businessUnitDesc": values.businessUnitDesc,
"remarks": values.remarks,
"isActive": true
 }

 console.log(BisinessUnit);

 this.BusinessUnitsService.UpdateBusinessDetailsDetails(BisinessUnit,this.DetailSelected.businessUnitId).subscribe(product => {

  console.log("after update"+product.json());
  this.DetailSelected=product.json().clientDetails;
  this.IncidentEditable=true;
 console.log(product.status);
 console.log(JSON.stringify(product.json()));
this.getBusinessGroupInfo();
 this.ClientCrudService.statuscode=product.status;
});




}
test1(){
  this.SharedService.OptionSelectedtest.next('NEW Business Units');

}
    ngOnDestroy() {
  
  }

}
