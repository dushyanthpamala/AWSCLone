import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import {Headers} from '@angular/http';

@Injectable()
export class BusinessGroupCrudService {
clientDetails=[];
  constructor(private http:Http) { }




getBusinessGroupDetails(){
  let headers = new Headers();
  let authToken = 'ec99d004-58a3-38d3-953c-8e00f63ff0e7';
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', 'Bearer ' + authToken);
  let options = new RequestOptions({ headers: headers });
  return this.http.get('https://10.31.15.210:8243/ACP/1.0/acp/businessGroups',options).map((response) => response);
  
}


UpdateClientDetails(clientDetails,url){
    let headers = new Headers();
  let authToken = 'ec99d004-58a3-38d3-953c-8e00f63ff0e7';
  headers.append('Content-Type', 'application/json');
  headers.append("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE,delete");
  headers.append("Access-Control-Allow-Origin", "*");

 headers.append('Authorization', 'Bearer ' + authToken);
  headers.append('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Z-Key,Authorization');
  let options = new RequestOptions({ headers: headers });
  return this.http.put(url,clientDetails,options).map((response) => response);

}

postBusinessDetailsDetails(valaues){

let headers = new Headers();
let authToken = 'ec99d004-58a3-38d3-953c-8e00f63ff0e7';
headers.append('Authorization', 'Bearer ' + authToken);
headers.append('Content-Type', 'application/json');
headers.append("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE,delete");
headers.append("Access-Control-Allow-Origin", "*");
headers.append('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Z-Key,Authorization');
let options = new RequestOptions({ headers: headers });
return this.http.post('https://10.31.15.210:8243/ACP/1.0/acp/businessGroups',valaues,options).map((response) => response);

}

DeleteBusinessUnitsDetails(businessId){

let url='https://10.31.15.210:8243/ACP/1.0/acp/businessGroups/'+businessId;

let headers = new Headers();
let authToken = 'ec99d004-58a3-38d3-953c-8e00f63ff0e7';

headers.append('Content-Type', 'application/json');
  headers.append("Access-Control-Allow-Methods", "GET,PATCH, POST, OPTIONS, PUT, DELETE");
headers.append("Access-Control-Allow-Origin", "*");
headers.append('Authorization', 'Bearer ' + authToken);
headers.append('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Z-Key,Authorization');
let options = new RequestOptions({ headers: headers });
return this.http.delete(url,options).map((response) => response);



}


}
