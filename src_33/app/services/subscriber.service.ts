import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import {Headers} from '@angular/http';

@Injectable()
export class SubscriberService {

  constructor(private http:Http) { }


  getSubscriberDetails(){
    let headers = new Headers();
    let authToken = 'ee085b2d-2a4f-335d-a4f0-2b4679825e25';
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + authToken);
    let options = new RequestOptions({ headers: headers });
    return this.http.get('https://10.31.15.210:8243/ACP/1.0/acp/subscribers',options).map((response) => response);
    
  }

  postBusinessDetailsDetails(valaues){

    let headers = new Headers();
    let authToken = 'ee085b2d-2a4f-335d-a4f0-2b4679825e25';
    headers.append('Authorization', 'Bearer ' + authToken);
    headers.append('Content-Type', 'application/json');
    headers.append("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE,delete");
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Z-Key,Authorization');
    let options = new RequestOptions({ headers: headers });
    return this.http.post('https://10.31.15.210:8243/ACP/1.0/acp/subscribers',valaues,options).map((response) => response);
    
    }
    


    DeleteBusinessDetails(subscriberID){

      let url='https://10.31.15.210:8243/ACP/1.0/acp/subscribers/'+subscriberID;
    
      let headers = new Headers();
    //  2ecef8ba-2c1d-3ca7-b4c9-643999837dba
      let authToken = 'ee085b2d-2a4f-335d-a4f0-2b4679825e25';
    
      headers.append('Content-Type', 'application/json');
        headers.append("Access-Control-Allow-Methods", "GET,PATCH, POST, OPTIONS, PUT, DELETE");
      headers.append("Access-Control-Allow-Origin", "*");
      headers.append('Authorization', 'Bearer ' + authToken);
      headers.append('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Z-Key,Authorization');
    
      let options = new RequestOptions({ headers: headers });
      return this.http.delete(url,options).map((response) => response);
    
    
    
    }
    
    

    UpdateSubscriberDetails(clientDetails,url){
      let headers = new Headers();
    let authToken = 'ee085b2d-2a4f-335d-a4f0-2b4679825e25';
    headers.append('Content-Type', 'application/json');
    headers.append("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE,delete");
    headers.append("Access-Control-Allow-Origin", "*");
  
  // headers.append('Authorization', 'Bearer ' + authToken);
    headers.append('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Z-Key,Authorization');
    let options = new RequestOptions({ headers: headers });
    return this.http.put(url,clientDetails,options).map((response) => response);
  
  }
  

}
