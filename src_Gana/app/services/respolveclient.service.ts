import { Injectable } from '@angular/core';
import { BusinessUnitsService } from './business-units.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Observable} from "rxjs/Observable";

@Injectable()
export class RespolveclientService {
details=[];

  

  constructor(private BusinessUnitsService:BusinessUnitsService,private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {


return this.getbusinessgroupdetails();

}



getbusinessgroupdetails(){

  return this.BusinessUnitsService.getBusinessUnitsDetails()
  .map(product => {
    if (product) {
      console.log(product.status);
      return product;

    }
    console.log(`Product was not found: `);
  })


}
}