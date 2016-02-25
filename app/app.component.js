System.register(['angular2/core', './my-auth.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, my_auth_component_1;
    var MyAppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (my_auth_component_1_1) {
                my_auth_component_1 = my_auth_component_1_1;
            }],
        execute: function() {
            MyAppComponent = (function () {
                function MyAppComponent() {
                }
                MyAppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app-component',
                        template: '<my-auth-form></my-auth-form>',
                        directives: [my_auth_component_1.MyAuthComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], MyAppComponent);
                return MyAppComponent;
            })();
            exports_1("MyAppComponent", MyAppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map