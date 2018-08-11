import {RouterModule, Routes} from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ClientDetailsComponent } from "./client-details/client-details.component";
//import { BusinessGroupComponent } from "./business-group/business-group.component";
import { BusinessUnitsComponent } from "./business-units/business-units.component";
import { BusinessGroupsComponent } from "./business-groups/business-groups.component";
import { SubscriberComponent } from "./subscriber/subscriber.component";
import { ResourceComponent } from "./resource/resource.component";
import { CredentialsComponent } from "./credentials/credentials.component";
import { LocationComponent } from "./location/location.component";
import { ResorceTypeComponent } from "./resorce-type/resorce-type.component";
import { RespolveclientService } from "./services/respolveclient.service";


const APP_ROUTES :Routes =[
   {path:'BusinessUnit',component:BusinessUnitsComponent},
   {path:'Subscriber',component:SubscriberComponent},
//    {path:'ClienttoBG/:id',component:BusinessGroupsComponent},
   {path:'BusinessGroup',component:BusinessGroupsComponent},
   {path:'Resource',component:ResourceComponent},
   {path:'Credentials',component:CredentialsComponent},
   {path:'ResourceType',component:ResorceTypeComponent},
   {path:'Location',component:LocationComponent},
   {path:'**',component:ClientDetailsComponent,resolve:{cartDetailsLocalProperty:RespolveclientService}},

];

export const routingModule = RouterModule.forRoot(APP_ROUTES);


