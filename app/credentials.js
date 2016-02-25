System.register([], function(exports_1) {
    var Credentials;
    return {
        setters:[],
        execute: function() {
            //custom data type "Credentials" declaration
            Credentials = (function () {
                function Credentials(login, password, hotp) {
                }
                return Credentials;
            })();
            exports_1("Credentials", Credentials);
        }
    }
});
//# sourceMappingURL=credentials.js.map