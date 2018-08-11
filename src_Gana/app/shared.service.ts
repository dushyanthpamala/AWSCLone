import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SharedService {

  OptionSelected="ManageClient";

  public OptionSelectedtest: Subject<string> = new Subject<string>();
  constructor() { }



}
