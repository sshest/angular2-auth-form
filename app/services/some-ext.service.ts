//load 'Injectable' module to construct a service
import {Injectable}     from 'angular2/core';

//decorator
@Injectable()

//exporting class description
export class SomeAuthApplyingService {
  
  //method for authentication data usage
  ApplyAuth(name, theme, language) {

  };
  /*
  	following authentication data processing, transfering to other components and services 
    can be provided by this service 
    данный сервис может предназначаться для дальнейшей обработки данных аутентификации, 
    для передачи данных другим компонентам и сервисам
  */
}