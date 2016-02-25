import {Injectable}     from 'angular2/core';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';

import {User} from '../user';

@Injectable()

export class AuthenticationService {
  constructor (private http: Http) {}

  private _authServerUrl = 'https://93.183.203.13:10443';

  Login (name:string, pass:string, hotp:string) {
    let user = new User (name, pass, hotp);
    let body = JSON.stringify({ user });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this._authServerUrl, body, options)
                    .map(res => res.json().data)
                    .catch(this.handleError)
    
  }
  private handleError (error: Response) {
    // here we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}