## Node.Js Restful API

-Middleware(name is decoder) for token resolution in this API linked to my another project; The "multer" file is used to upload images.


-Passwords are protected more securely thanks to bcryptjs, which makes passwords undecryptable in the database.

-Passwords are compared using the "compare" method on the login page where passwords must be entered.All requests use middleware. Without the token, the request cannot be made.


-In models, passwords are hidden by scope. It is possible to access passwords from another scope.

-If there is a file in the POST request, multer is used in that request. Incoming data is kept in "assets", never deleted.

-With jwt, id is converted to token on login.

-sqlite3 is used as database.

Created At 3 December 2022.
