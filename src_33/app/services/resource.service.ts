import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import {Headers} from '@angular/http';


@Injectable()
export class ResourceService {
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
  let authToken = 'ee085b2d-2a4f-335d-a4f0-2b4679825e25';
  headers.append('Content-Type', 'application/json');
  // headers.append('Authorization', `Bearer ${authToken}`);
  headers.append('Authorization', 'Bearer ' + authToken);
  let options = new RequestOptions({ headers: headers });
  return this.http.get('https://10.31.15.210:8243/ACP/1.0/acp/resources',options).map((response) => response);
  
}



  UpdateResourceDetailsDetails(clientDetails,url){
  //  let url1=    "https://10.31.15.210:8243/ACP/1.0/acp/businessUnits/"+id;
    let headers = new Headers();
    let authToken = 'ee085b2d-2a4f-335d-a4f0-2b4679825e25';
    headers.append("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE,delete");
    headers.append("Access-Control-Allow-Origin", "*");

    headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', `Bearer ${authToken}`);
    headers.append('Authorization', 'Bearer ' + authToken);
    let options = new RequestOptions({ headers: headers });
    return this.http.put(url,clientDetails,options).map((response) => response);
    
  }

postResourceDetails(valaues){

  let headers = new Headers();
  let authToken = 'ee085b2d-2a4f-335d-a4f0-2b4679825e25';
  headers.append('Content-Type', 'application/json');
  // headers.append('Authorization', `Bearer ${authToken}`);
  headers.append('Authorization', 'Bearer ' + authToken);
  let options = new RequestOptions({ headers: headers });
  return this.http.post('http://10.31.15.210:9000/acp/resources/',valaues,options).map((response) => response);

}

DeleteResourceDetails(ResorceId){

  let url='http://10.31.15.210:9000/acp/resources/'+ResorceId;
  let headers = new Headers();
  let authToken = 'ee085b2d-2a4f-335d-a4f0-2b4679825e25';
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
