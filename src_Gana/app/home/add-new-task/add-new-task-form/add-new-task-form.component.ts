import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientCrudService } from '../../../services/client-crud.service';


@Component({
  selector: 'app-add-new-task-form',
  templateUrl: './add-new-task-form.component.html',
  styleUrls: ['./add-new-task-form.component.scss']
})
export class AddNewTaskFormComponent implements OnInit {
  AddNewTask: FormGroup;
  products;
  getuserNameAndPassword=new Array();
  IsCurrentUser: boolean = false;
  @Output() unhide: EventEmitter<boolean> =
    new EventEmitter<boolean>();
    @Output() hide: EventEmitter<boolean> =
    new EventEmitter<boolean>();
user;


  constructor(private fb: FormBuilder, private route: ActivatedRoute,
              private router: Router,
              private ClientCrudService:ClientCrudService) {
  }


  ngOnInit() {
    this.AddNewTask = this.fb.group({
      clientName: ['', [Validators.required, Validators.minLength(1)]],
      shortName :['', Validators.required],
      address:['',Validators.required],
      remarks:['',Validators.required],
      phone:['',Validators.required],
      dateOfBirth:['',Validators.required]



    });


  }

  uservalidateAndGetProdut(values){
console.log(values);
let temppostvalues=values;
temppostvalues.isActive=true;
temppostvalues.status='active';
console.log("changed values"+temppostvalues);
console.log(JSON.stringify(temppostvalues));

this.ClientCrudService.postClientDetails(JSON.stringify(temppostvalues)).subscribe(product => {

  console.log("success");
  console.log("GetInformation----->"+product.json());
  console.log(JSON.stringify(product.json()));
  // this.router.navigate(['/HomeComponent']);
  location.reload();
  console.log(product.status);
 });



}

  unhideContent(){
this.unhide.emit(true);
  }

  hideForm(){
    console.log("Hi hello from child component");
    this.hide.emit(true);
  }



}
