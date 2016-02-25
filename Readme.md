# angular2-auth-form

Authentication form built using Angular2+TypeScript

(форма аутентификации, сконструированная с помощью фреймворка Angular 2.0 c использованием Type
Script)

To lunch the application after pulling the repo you should execute 2 commands from command line 
while being in the root directory of application:

1. npm install
2. npm start

All the dependencies loads, local server starts, and application launches in a browser.

Details:

1. In a case of successfull login auth-forms becomes hidden, Thw Logo and title changes;

2. Sumbit-button being replpaced onto "Pseudo-submit" button (with a cogged wheel inside) during data-loading;

3. The same button is shown during ban-period (if server respose's Auth field is equal to banned), 
   so the user is not able to resubmit the form;
   
4. If login process fails during second level of authentication (server respose's Auth field is equal to 'Hotp wrong code')
   primary form is shown;
   
5. In all cases of unsuccessfull authentication primary (with 2 fields) form is shown, with empty inputs and 'login' input
   recieves focus (as empty Input field is invalid - it's borders are red. 
   This allows user to assume that he made wrong input).