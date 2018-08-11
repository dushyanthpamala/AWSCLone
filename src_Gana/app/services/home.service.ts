////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////import { Injectable } from '@angular/core';
import { BusinessUnitsService } from './business-units.service';
import { BusinessGroupCrudService } from './business-group-crud.service';
import { ClientCrudService } from './client-crud.service';
import { ResourceService } from './resource.service';
import { CredentialService } from './credential.service';
import { SubscriberService } from './subscriber.service';
import { ResourceTypeService } from './resource-type.service';
import { LocationService } from './location.service';
import { Injectable } from '@angular/core';

@Injectable()
export class HomeService {

  Home_clientDetail;
  Home_BusinessUnitDetail;
  Home_BusinessGroupDetail;
  Home_LocationDetail;
  Home_SubscriberDetail;
  Home_ResourceDetail;
  Home_CredentialDetail;
  Home_ResourceTypeDetail;
  Client_BusinessGroup_Mapping_Id:number=0;
  Client_BusinessGroup_Mapping_Detailselected;
  constructor(private BusinessUnitsService:BusinessUnitsService,
              private BusinessGroupCrudService:BusinessGroupCrudService,
              private ClientCrudService:ClientCrudService,
              private ResourceService:ResourceService,
              private CredentialService:CredentialService,
              private SubscriberService:SubscriberService,
              private ResourceTypeService:ResourceTypeService,
              private LocationService:LocationService) {


               }



  getall(){

    this.ClientCrudService.getClientDetails().subscribe(product => {
      console.log("GetInformation----->"+product.json());
     console.log(JSON.stringify(product.json().clients));
     this.Home_clientDetail=product.json().clients;
      });

      this.BusinessUnitsService.getBusinessUnitsDetails().subscribe(product => {
        console.log("GetInformation----->"+product.json());
       console.log(JSON.stringify(product.json()));
       this.Home_BusinessUnitDetail=product.json().businessUnits;
        });

        this.BusinessGroupCrudService.getBusinessGroupDetails().subscribe(product => {
          console.log("GetInformation----->"+product.json());
         console.log(JSON.stringify(product.json().businessGroups));
         this.Home_BusinessGroupDetail=product.json().businessGroups;
          });

          
          this.ResourceService.getBusinessUnitsDetails().subscribe(product => {
            console.log("GetInformation----->"+product.json());
           console.log(JSON.stringify(product.json().resources));
           this.Home_ResourceDetail=product.json().resources;
            });


            
            this.CredentialService.getCredentials().subscribe(product => {
              console.log("GetInformation----->"+product.json());
             console.log(JSON.stringify(product.json().credentials));
             this.Home_CredentialDetail=product.json().credentials;
              });

              
              this.SubscriberService.getSubscriberDetails().subscribe(product => {
                console.log("GetInformation----->"+product.json());
               console.log(JSON.stringify(product.json().subscribers));
               this.Home_SubscriberDetail=product.json().subscribers;
                });

                this.ResourceTypeService.getResourceType().subscribe(product => {
                  console.log("GetInformation----->"+product.json());
                 console.log(JSON.stringify(product.json().resourceType));
                 this.Home_ResourceTypeDetail=product.json().resourceType;
                  });

                  this.LocationService.getLocations().subscribe(product => {
                    console.log("GetInformation----->"+product.json());
                   console.log(JSON.stringify(product.json().locations));
                   this.Home_LocationDetail=product.json().locations;
                    });

                                      
}

}
