import {RouterModule, Routes} from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ClientDetailsComponent } from "./client-details/client-details.component";
//import { BusinessGroupComponent } from "./business-group/business-group.component";
import { BusinessUnitsComponent } from "./business-units/business-units.component";
import { BusinessGroupsComponent } from "./business-groups/business-groups.component";
import { SubscriberComponent } from "./subscriber/subscriber.component";
import { ResourceComponent } from "./resource/resource.component";


const APP_ROUTES :Routes =[
   {path:'BusinessUnit',component:BusinessUnitsComponent},
   {path:'Subscriber',component:SubscriberComponent},
   {path:'BusinessGroup',component:BusinessGroupsComponent},
   {path:'Resource',component:ResourceComponent},
   {path:'**',component:ClientDetailsComponent},

];

export const routingModule = RouterModule.forRoot(APP_ROUTES);


