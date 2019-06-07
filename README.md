
# @zainabed/soteria

Single page application security, It reduces amount of HTTP server calls by providing client side authorization.
It provides APIs to validate user permissions against the secure area of application without consulting with server APIs.  
These validation can be performed on application routing or on REST API calls. 

It is an implementation of [@zainabed/security](https://github.com/zainabed/web-client-security) specification APIs.

[![Build Status](https://dev.azure.com/zainabed/web-security-soteria/_apis/build/status/zainabed.web-security-soteria?branchName=master)](https://dev.azure.com/zainabed/web-security-soteria/_build/latest?definitionId=3&branchName=master)

## Concept

Single page application requires authentication & authorization system to gaurd application and its components from unauthorized user.

Authentication validates user by verifings its identify and allow user to access secure area of application.
if verification fails then it rejects access to those secure area.
As authentication is concern of Server side script, on client side we need to maintain the reference of authenticated user object (Access Token).

On other hand authorization take action when user is authenticated and has granted permission to secure area of application.
Application can be divided into different areas according to different previlages like some area could be open to everyone and some could be secure for ADMIN user only. 
Authorization validates users permission against permission assign to different area of application.

Library provide two fundamental security interfaces, authentication & authorization managers.
And these interfaces can be obtain from `SecurityFactory` class.


```javascript

import { Security, SecurityFactory, AuthenticationManager, AuthorizationManager} from  "@zainabed/security";

let  secuirtyFactor: SecurityFactory = Security.getSecurityFactory();
let  authenticationManager: AuthenticationManager = securityFactory.getAuthenticationManager();
let  authorizationManager: AuthorizationManager = securityFactory.getAuthorizationManager();

```



## Installation

Run following command to install security inside your application.

```

npm install @zainabed/soteria

```

Then you need to register this service for your application.

```javascript

import { RegisterSecurity } from  "@zainabed/soteria";
RegisterSecurity();

```

>  **Note:** This is the only import coming from `@zainabed/soteria` all other import statement will be from `@zainabed/security` which is security specifications for single page application.




## Authentication

User authentication should happen at server side ( not inside client side ) and at client side you should capture the authenticated user object which you receive from server APIs. This authenticated object should contain user's assigned roles or permissions. 

Role of `AuthenticationManager` interface of `@zainabed/security` is to maintain the reference of authenticated user object.
It can be done by creating a class which implements `AuthUser` interface.

```javascript

import { AuthUser } from "@zainabed/security";

class User implements AuthUser {

  // implements abastract methods.

  // create a constructor to access authentication response and set
  // username, credentails, authorization roles and account validity factores. 
}

```
when authenticated user object is received from server API ( as JWT token ) convert it into `AuthUser` object.

```javascript
// sample authentication api success call

onSuccessfulAuthentication( response : any ) {
    let user: AuthUser = new User(response);

    // store this user inside authentication manager.
    let  secuirtyFactor: SecurityFactory = Security.getSecurityFactory();
    let  authenticationManager: AuthenticationManager = securityFactory.getAuthenticationManager();
    authenticationManager.set(user);
}

```  

>  **Note:** `AuthUser` help us to fetch usefull information about authenticated user like its username, credentails, authorization roles/permissions and account validity factores.

Once you set `AuthUser` inside authentication manager, you can access it from any part of you application.

```javascript

    let user: AuthUser = authenticationManager.get();

```

and call `reset` method to remove authenticated user referencec from autnetication manager. 
usually you would do it when you perform logout operation.

```javascript
    authenticationManager.reset();
```


## Authorization

Authorization is key feature of this library. once user is authenticated then libaray gaurd application component using
user credentials & roles.

first get instance of `AuthorizationManager` as

```javascript
    let  secuirtyFactor: SecurityFactory = Security.getSecurityFactory();
    let  authorizationManager: AuthorizationManager = securityFactory.getAuthorizationManager();
```

Then formart set of authorization operations as

**1.** User logged in or not

```javascript
    if( authorizationManager.isLogged() ) {
        // do stuff
    } else {
        // notify user 
    }
```

**2.** If user as has single role as `USER` verify it as

```javascript
    if( authorizationManager.hasRole('USER') ) {
        // do stuff
    } else {
        // notify user 
    }
```
>  **Note:** **`AuthorizationManager` interface access these roles from `AuthUser` class using `getRoles` method. 
make sure that you need to set user roles when you instantiate `AuthUser` class.**


**3.** If user as has set of roles as `USER` & `ADMIN` verify it as

```javascript
    let roles : Set<string> = new Set(['USER', 'ADMIN']);

    if( authorizationManager.hasRoles(roles) ) {
        // do stuff
    } else {
        // notify user 
    }
```

**4.** If user as has any of given roles as `USER` & `ADMIN` verify it as

```javascript
    let roles : Set<string> = new Set(['USER', 'ADMIN']);

    if( authorizationManager.hasAnyRoles(roles) ) {
        // do stuff
    } else {
        // notify user 
    }
```
>  **Note:** Role names are case sensitive, `USER` will not match with `user` or `User`.

