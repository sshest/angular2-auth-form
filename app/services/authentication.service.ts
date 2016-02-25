//load neccessary modules
import {Injectable}     from 'angular2/core';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';

import {Credentails} from '../credentials';

//decorator to descript module as service
@Injectable()

//exporting class description
export class AuthenticationService {
  
  constructor (private http: Http) {}

  //the URL of the authentication server
  private _authServerUrl = 'http://93.183.203.13:10443/login';

  //method returning "cold" Observable of http POST request
  //it'd be sent only when subsribed (in my-auth.component)
  Login (_credentials: Credentials) {
    
    //POST request constructing
    
    //request body
    let body = JSON.stringify( _credentials );
    //request headers
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'appication/json' });
    //request options
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this._authServerUrl, body, options)
                    .map(res => res.json())//extract data from observable and transfer it to json-object
                    .catch(this.handleError)
    
  }
  private handleError (error: Response) {
    // here we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}