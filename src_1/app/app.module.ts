import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SharedService } from './shared.service';
import { routingModule } from './routing';
import { AddNewTaskComponent } from './home/add-new-task/add-new-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddNewTaskFormComponent } from './home/add-new-task/add-new-task-form/add-new-task-form.component';

import { ClientCrudService } from './services/client-crud.service';
import { ClientDetailsComponent } from './client-details/client-details.component';
//import { BusinessGroupComponent } from './business-group/business-group.component';
import { BusinessUnitsService } from './services/business-units.service';
import { BusinessUnitsComponent } from './business-units/business-units.component';
import { ClickOutsideDirective } from './click-outside.directive';
import { BusinessGroupCrudService } from './services/business-group-crud.service';
import { BusinessGroupsComponent } from './business-groups/business-groups.component';
import { SubscriberComponent } from './subscriber/subscriber.component';
import { SubscriberService } from './services/subscriber.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddNewTaskComponent,
    AddNewTaskFormComponent,
    ClientDetailsComponent,
    BusinessUnitsComponent,
    ClickOutsideDirective,
    BusinessGroupsComponent,
    SubscriberComponent,
  ],
  imports: [
    BrowserModule,DataTablesModule,HttpModule,routingModule,ReactiveFormsModule,FormsModule
  ],
  providers: [SharedService,ClientCrudService,BusinessUnitsService,BusinessGroupCrudService,SubscriberService],
  bootstrap: [AppComponent]
})
export class AppModule { }
