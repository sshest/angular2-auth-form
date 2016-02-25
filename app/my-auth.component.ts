//Load neccessary modules
import {Component} from 'angular2/core';
import {NgForm}    from 'angular2/common';
import {Observable}     from 'rxjs/Observable';
import {Credentials} from './credentials'

//load rxjs commands to operate 'Observables'
import 'rxjs/Rx';

//load Http-providers wich let us use http services (post) in child components
import {HTTP_PROVIDERS}    from 'angular2/http';

//load Services
import {AuthenticationService} from './services/authentication.service';
import {SomeAuthApplyingService} from './services/some-ext.service';

//Component decorator
@Component ({
	selector: 'my-auth-form',
	templateUrl: '../templates/my-auth.html',
	// list of service providers
	providers: [HTTP_PROVIDERS, AuthenticationService, SomeAuthApplyingService] 
})

export class MyAuthComponent {
	
	// instaniate services in a class constructor
	constructor (private _AuthenticationService: AuthenticationService, private _SomeAuthApplyingService: SomeAuthApplyingService) {
	// initial state of variables that defines an appearance of the login form
		logged = false;
		banned = false;
		denied = false;
		hotp = false;
	}

	//variables that are bound to inputs values
	name: string;
	password: string;

	//object with user data to be conveyed to _AuthenticationService 
	credentials = {};
	credentials.login: string;
	credentials.password: string;
	
	//an indicator of data transfer by _AuthenticationService
	dataLoading = false;

	//a metod that retrieves a link to 'login' input's DOM element from an 'Input' event
	getInputEl(ev) {
		this.loginEl = ev.target;
	}

	//method - handler of login's form submit event, it recieves an object with values of all form fields and save it in a local variable 'userData'   
	login(userData) {
		
		//return all variables to initial state
		this.logged = this.banned = this.denied = this.hotp = false;
		
		//save login and password into the credentials object to pass it to _AuthenticationService
		//and into name and password variables that are bound to form fields
		//this also let us to reuse the credentials in case of two-step authentication
		this.name = this.credentials.login = userData.login;  
		this.password = this.credentials.password = userData.firstPass;
		
		//if the form data contains 'hotp' field, then it's second step of authentication,
		// therefore credentials already filled with login/password data
		//and hotp field will be added
		(userData.hotp) => this.credentials.hotp = userData.secondPass;

		//an indicator of authentication process beggining
		this.dataLoading = true;

		//_AuthenticationService's Login method call with credential object as an argument
		this._AuthenticationService.Login(this.credentials: Credentials)
			
			//as _AuthenticationService.Login returns an Observable it must be submitted to lunch
			// 'POST' request
			.subscribe(
				response  => {

					//when the response is recieved an indicator of authentication process set to 'false'
					this.dataLoading = false;
					
					//analyse the response's 'Auth' field and conduct the crews depending on 'Auth' meaning
					switch (response.Auth){
						
						case 'Logged':
							this.logged = true;
							
							//authentiction is successfull and the response data could be transfered
							//to some outer service
							this._SomeAuthApplyingService.ApplyAuth(this.credentials.login, response.data.Theme, response.data.Language);
							
							//also some else activity could be anticipated here, like navigation to another URL
							
							break;
						
						case 'Denied':
							
							//set the denied variable to true to mark logging falture
							this.denied=true;
							break;
						
						case 'Banned':
							
							//set the banned variable to true
							//to mark a prohibition of logging for some period
							//this aslo hides submit button and show 'wheeled' button
							//to exress impossibility of new submitting
							this.banned=true;
							
							//setTimeout function changes the value of 'banned' and 'denied' variables
							// after expireing the 'ban time' (signed in a 'Time' field of authentication
							// response). This also make submit button visible.
							setTimeout(()=> {
								this.banned = false;
								this.denied = true;
							}, response.Time);
							break;

						case 'Hotp':
							
							//set the 'hotp' variable to true: hide 'name' and 'password' form fields
							//show a field for entering hotp-(second step authentication password) 
							this.hotp=true;
							break;
						
						case 'HOTP wrong code':

							//set the 'hotp' variable to false: show 'name' and 'password' form fields
							//and hide a field for entering hotp
							this.hotp = false;
							this.denied = true;
							break;

						default:
							break;
					}
					
					//clear the name and password variables and bounded form fields
					this.name = '';
					this.password = '';
					
					//set focus on 'login' input
					this.loginEl.focus();
				},

                error =>  {
                	this.dataLoading = false;
                	this.errorMessage = error;
                }
            );
		
	};
};