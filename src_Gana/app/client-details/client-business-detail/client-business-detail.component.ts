import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-client-business-detail',
  templateUrl: './client-business-detail.component.html',
  styleUrls: ['./client-business-detail.component.scss']
})
export class ClientBusinessDetailComponent implements OnInit,OnChanges {
clientDetailsHeader=[];
BusinessGroupDetailsHeader=["NAME","SHORTNAME","BUSINESS GROUPNAME","REMARKS","ACTIVE"];
BusinessUnitDetailsHeader=[];
SubscriberDetailsHeader=[];



  @Input()
  Stakeholder;
  stakeholderdetails;
  stakeholderHeader;

  constructor(private HomeService:HomeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }



  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {  
 let change = changes[propName];
 let curVal  = JSON.stringify(change.currentValue);
 let prevVal = JSON.stringify(change.previousValue);

       console.log(curVal);
       console.log(prevVal);

       if(curVal="businessGroup"){
       this.stakeholderdetails=this.HomeService.Home_BusinessGroupDetail;
       this.stakeholderHeader=this.BusinessGroupDetailsHeader;
      console.log(this.stakeholderdetails);
       }
    }
 }

 id=0;
 togglecolor(i){
this.id=i;
  }

  navigatetoStakeholder(stakeholder){
    this.HomeService.Client_BusinessGroup_Mapping_Detailselected=stakeholder;
    console.log(stakeholder);
    console.log("Hi Hello");
    this.router.navigate(['/BusinessGroup'])
    console.log(this.HomeService.Client_BusinessGroup_Mapping_Id=stakeholder.businessGroupId);
  }


  }

