import {Component} from 'angular2/core';
import {MyAuthComponent} from './my-auth.component';

@Component({
	selector: 'my-app-component',
	template: '<my-auth-form></my-auth-form>',
	directives: [MyAuthComponent]
})

export class MyAppComponent{}