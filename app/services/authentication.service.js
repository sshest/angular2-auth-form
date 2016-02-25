System.register(['angular2/core', 'angular2/http', 'rxjs/Observable'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, Observable_1;
    var AuthenticationService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            //decorator to descript module as service
            AuthenticationService = (function () {
                function AuthenticationService(http) {
                    this.http = http;
                    //the URL of the authentication server
                    this._authServerUrl = 'http://93.183.203.13:10443/login';
                }
                //method returning "cold" Observable of http POST request
                //it'd be sent only when subsribed (in my-auth.component)
                AuthenticationService.prototype.Login = function (_credentials) {
                    //POST request constructing
                    //request body
                    var body = JSON.stringify(_credentials);
                    //request headers
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'Accept': 'appication/json' });
                    //request options
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.post(this._authServerUrl, body, options)
                        .map(function (res) { return res.json(); }) //extract data from observable and transfer it to json-object
                        .catch(this.handleError);
                };
                AuthenticationService.prototype.handleError = function (error) {
                    // here we may send the server to some remote logging infrastructure
                    // instead of just logging it to the console
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                AuthenticationService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], AuthenticationService);
                return AuthenticationService;
            })();
            exports_1("AuthenticationService", AuthenticationService);
        }
    }
});
//# sourceMappingURL=authentication.service.js.map