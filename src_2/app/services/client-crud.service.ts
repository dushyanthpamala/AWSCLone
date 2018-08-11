import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import {Headers} from '@angular/http';


@Injectable()
export class ClientCrudService {
statuscode;
  headers: Headers;
    options: RequestOptions;

  constructor(private http:Http) {
//     this.headers = new Headers({ 'Content-Type': 'application/json', 
//     'Accept': 'q=0.8;application/json;q=0.9' });
// this.options = new RequestOptions({ headers: this.headers });
   }

//{ data: this.SignUp, headers: headers}

getClientDetails(){
  let headers = new Headers();
  let authToken = 'ec99d004-58a3-38d3-953c-8e00f63ff0e7';
  headers.append('Content-Type', 'application/json');
  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE,delete');
    // headers.append('Authorization', `Bearer ${authToken}`);
  headers.append('Authorization', 'Bearer ' + authToken);
  // headers.append('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Z-Key,Authorization');

  let options = new RequestOptions({ headers: headers });

  return this.http.get('https://10.31.15.210:8243/ACP/1.0/acp/clients',options).map((response) => response);
  //https://10.31.15.210:8243/api/1.0/acp/clients
  //http://10.31.15.210:9000/acp/clients
  ///assets/Data/sample.json

}



  UpdateClientDetails(clientDetails,url){
    // let headers = new HttpHeaders({'Content-Type': 'application/json'});
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // // let _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    // let urlString=url;
    // console.log("json from service--->"+clientDetails);
    // console.log("url  from service--->"+url);
    // let header = new Headers();
    // header.append('Content-Type', 'application/json');
    // let options = new RequestOptions({ headers: header });
//     let headerss = new Headers({ 'Content-Type': 'application/json', 
//     'Accept': 'q=0.8;application/json;q=0.9' });
// let options = new RequestOptions({ eaders: headerss });
    // return this.http.put(urlString,{body:clientDetails,headers: headers}).map((response) => response);
    // return this.http.put(urlString,clientDetails).map((response) => response);
    // return this.http.delete(urlString).map((response) => response);
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', 'Basic ' + 'f35e7445-b90d-3f26-b886-cc6b539f2f42');
    // let headers = new Headers({'Content-Type': 'application/json'});  
    // headers.append('Authorization','Bearer'+'f35e7445-b90d-3f26-b886-cc6b539f2f42')
    // let options = new RequestOptions({headers: headers});
    
    let headers = new Headers();
    let authToken = 'ec99d004-58a3-38d3-953c-8e00f63ff0e7';
    headers.append('Content-Type', 'application/json');
    headers.append("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE,delete");
    headers.append("Access-Control-Allow-Origin", "*");

//   headers.append('Authorization', 'Bearer ' + authToken);

    headers.append('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Z-Key,Authorization');
  
    // headers.append('Authorization', `Bearer ${authToken}`);
    let options = new RequestOptions({ headers: headers });
//    let stringurl="https://10.31.15.210:8243/ACP/1.0/acp/clients/"+id
    return this.http.put(url,clientDetails,options).map((response) => response);
//    return this.http.put('http://10.31.15.210:9000/acp/clients',clientDetails,options).map((response) => response);
  
  
  }

postClientDetails(valaues){

  let headers = new Headers();
  let authToken = 'ec99d004-58a3-38d3-953c-8e00f63ff0e7';
  // headers.append('Content-Type', 'application/json');
  // headers.append('Authorization', `Bearer ${authToken}`);
  headers.append('Authorization', 'Bearer ' + authToken);
  headers.append('Content-Type', 'application/json');
  headers.append("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE,delete");
  headers.append("Access-Control-Allow-Origin", "*");
  headers.append('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Z-Key,Authorization');
  let options = new RequestOptions({ headers: headers });
  return this.http.post('https://10.31.15.210:8243/ACP/1.0/acp/clients',valaues,options).map((response) => response);

}

DeleteClientDetails(clientId){

  //let url='https://10.31.15.210:8243/ACP/1.0/acp/clients/'+clientId;
  let url='http://10.31.15.210:9000/acp/clients/'+clientId;
  let headers = new Headers();
//  2ecef8ba-2c1d-3ca7-b4c9-643999837dba
  let authToken = 'ec99d004-58a3-38d3-953c-8e00f63ff0e7';

  headers.append('Content-Type', 'application/json');
    headers.append("Access-Control-Allow-Methods", "GET,PATCH, POST, OPTIONS, PUT, DELETE");
  headers.append("Access-Control-Allow-Origin", "*");
  headers.append('Authorization', 'Bearer ' + authToken);
  headers.append('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Z-Key,Authorization');
// headers.append('Authorization', `Bearer ${authToken}`);
 
  

  // 'Content-Type': 'application/json; charset=UTF-8',
  //                                    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
  //                                    'Access-Control-Allow-Origin': '*',
  //                                    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Z-Key'


  let options = new RequestOptions({ headers: headers });
  return this.http.delete(url,options).map((response) => response);



}

}
