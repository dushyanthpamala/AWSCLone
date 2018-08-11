import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import {Headers} from '@angular/http';

@Injectable()
export class BusinessUnitsService {
  statuscode;
  headers: Headers;
    options: RequestOptions;

  constructor(private http:Http) {
//     this.headers = new Headers({ 'Content-Type': 'application/json', 
//     'Accept': 'q=0.8;application/json;q=0.9' });
// this.options = new RequestOptions({ headers: this.headers });
   }

//{ data: this.SignUp, headers: headers}

getBusinessUnitsDetails(){
  let headers = new Headers();
  let authToken = 'ec99d004-58a3-38d3-953c-8e00f63ff0e7';
  headers.append('Content-Type', 'application/json');
  // headers.append('Authorization', `Bearer ${authToken}`);
  headers.append('Authorization', 'Bearer ' + authToken);
  let options = new RequestOptions({ headers: headers });
  return this.http.get('https://10.31.15.210:8243/ACP/1.0/acp/businessUnits',options).map((response) => response);
  
}



  UpdateBusinessDetailsDetails(clientDetails,id){
    let url=    "https://10.31.15.210:8243/ACP/1.0/acp/businessUnits/"+id;
    let headers = new Headers();
    let authToken = 'ec99d004-58a3-38d3-953c-8e00f63ff0e7';
    headers.append("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE,delete");
    headers.append("Access-Control-Allow-Origin", "*");

    headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', `Bearer ${authToken}`);
    headers.append('Authorization', 'Bearer ' + authToken);
    let options = new RequestOptions({ headers: headers });
    return this.http.put(url,clientDetails,options).map((response) => response);
    
  }

postBusinessUnitDetails(valaues){

  let headers = new Headers();
  let authToken = 'ec99d004-58a3-38d3-953c-8e00f63ff0e7';
  headers.append('Content-Type', 'application/json');
  // headers.append('Authorization', `Bearer ${authToken}`);
  headers.append('Authorization', 'Bearer ' + authToken);
  let options = new RequestOptions({ headers: headers });
  return this.http.post('https://10.31.15.210:8243/ACP/1.0/acp/businessUnits',valaues,options).map((response) => response);

}

DeleteBusinessUnitDetails(BusinessUnitId){

  let url='https://10.31.15.210:8243/ACP/1.0/acp/businessUnits/'+BusinessUnitId;
  let headers = new Headers();
  let authToken = 'ec99d004-58a3-38d3-953c-8e00f63ff0e7';
  headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  // headers.append('Authorization', `Bearer ${authToken}`);
  headers.append('Authorization', 'Bearer ' + authToken);
  headers.append("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE,delete");
  headers.append("Access-Control-Allow-Origin", "*");
  // headers.append('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Z-Key');

  

  // 'Content-Type': 'application/json; charset=UTF-8',
  //                                    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
  //                                    'Access-Control-Allow-Origin': '*',
  //                                    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Z-Key'


  let options = new RequestOptions({ headers: headers });
  return this.http.delete(url,options).map((response) => response);



}

}
