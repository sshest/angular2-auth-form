System.register(['angular2/core', './credentials', 'rxjs/Rx', 'angular2/http', './services/authentication.service', './services/some-ext.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, credentials_1, http_1, authentication_service_1, some_ext_service_1;
    var MyAuthComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (credentials_1_1) {
                credentials_1 = credentials_1_1;
            },
            function (_1) {},
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            },
            function (some_ext_service_1_1) {
                some_ext_service_1 = some_ext_service_1_1;
            }],
        execute: function() {
            //Component decorator
            MyAuthComponent = (function () {
                // instaniate services in a class constructor
                function MyAuthComponent(_AuthenticationService, _SomeAuthApplyingService) {
                    this._AuthenticationService = _AuthenticationService;
                    this._SomeAuthApplyingService = _SomeAuthApplyingService;
                    //object with user data to be conveyed to _AuthenticationService 
                    this.credentials = {};
                    //an indicator of data transfer by _AuthenticationService
                    this.dataLoading = false;
                    // initial state of variables that defines an appearance of the login form
                    logged = false;
                    banned = false;
                    denied = false;
                    hotp = false;
                }
                //a metod that retrieves a link to 'login' input's DOM element from an 'Input' event
                MyAuthComponent.prototype.getInputEl = function (ev) {
                    this.loginEl = ev.target;
                };
                //method - handler of login's form submit event, it recieves an object with values of all form fields and save it in a local variable 'userData'   
                MyAuthComponent.prototype.login = function (userData) {
                    var _this = this;
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
                    (function (userData, hotp) { return _this.credentials.hotp = userData.secondPass; });
                    //an indicator of authentication process beggining
                    this.dataLoading = true;
                    //_AuthenticationService's Login method call with credential object as an argument
                    this._AuthenticationService.Login(this.credentials, credentials_1.Credentials)
                        .subscribe(function (response) {
                        //when the response is recieved an indicator of authentication process set to 'false'
                        _this.dataLoading = false;
                        //analyse the response's 'Auth' field and conduct the crews depending on 'Auth' meaning
                        switch (response.Auth) {
                            case 'Logged':
                                _this.logged = true;
                                //authentiction is successfull and the response data could be transfered
                                //to some outer service
                                _this._SomeAuthApplyingService.ApplyAuth(_this.credentials.login, response.data.Theme, response.data.Language);
                                //also some else activity could be anticipated here, like navigation to another URL
                                break;
                            case 'Denied':
                                //set the denied variable to true to mark logging falture
                                _this.denied = true;
                                break;
                            case 'Banned':
                                //set the banned variable to true
                                //to mark a prohibition of logging for some period
                                //this aslo hides submit button and show 'wheeled' button
                                //to exress impossibility of new submitting
                                _this.banned = true;
                                //setTimeout function changes the value of 'banned' and 'denied' variables
                                // after expireing the 'ban time' (signed in a 'Time' field of authentication
                                // response). This also make submit button visible.
                                setTimeout(function () {
                                    _this.banned = false;
                                    _this.denied = true;
                                }, response.Time);
                                break;
                            case 'Hotp':
                                //set the 'hotp' variable to true: hide 'name' and 'password' form fields
                                //show a field for entering hotp-(second step authentication password) 
                                _this.hotp = true;
                                break;
                            case 'HOTP wrong code':
                                //set the 'hotp' variable to false: show 'name' and 'password' form fields
                                //and hide a field for entering hotp
                                _this.hotp = false;
                                _this.denied = true;
                                break;
                            default:
                                break;
                        }
                        //clear the name and password variables and bounded form fields
                        _this.name = '';
                        _this.password = '';
                        //set focus on 'login' input
                        _this.loginEl.focus();
                    }, function (error) {
                        _this.dataLoading = false;
                        _this.errorMessage = error;
                    });
                };
                ;
                MyAuthComponent = __decorate([
                    core_1.Component({
                        selector: 'my-auth-form',
                        templateUrl: '../templates/my-auth.html',
                        // list of service providers
                        providers: [http_1.HTTP_PROVIDERS, authentication_service_1.AuthenticationService, some_ext_service_1.SomeAuthApplyingService]
                    }), 
                    __metadata('design:paramtypes', [authentication_service_1.AuthenticationService, some_ext_service_1.SomeAuthApplyingService])
                ], MyAuthComponent);
                return MyAuthComponent;
            })();
            exports_1("MyAuthComponent", MyAuthComponent);
            ;
        }
    }
});
//# sourceMappingURL=my-auth.component.js.map