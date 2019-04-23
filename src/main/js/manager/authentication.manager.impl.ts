import { AuthenticationManager, AuthUser } from "@zainabed/security";


/**
 * @license MIT
 * @author Zainul Shaikh
 * 
 * @class
 * @description
 * This is an abstract class design to provide service to handle `AuthUser` interface object.
 * There are four abstract methods, each one allow implementation to design strategy to update 
 * `UserDetail` interface object.
 * Idea behind this abstract class is to delegate all concrete operation related to `AuthUser`
 * object to implementation and delegate them throw class's setter and getter methods.  
 */
export class AuthenticationManagerImpl extends AuthenticationManager {

    private _data: AuthUser;

    constructor() {
        super();
    }


    get(): AuthUser {
        return this._data;
    }


    /**
     * @function
     * @description
     * Setter method to build `AuthUser` object from given input and set it into storage
     * system.
     * Method uses abstract method to set string representation of `AuthUser` object into storage system.
     * 
     * @param {any} response object
     */
    set(AuthUser: AuthUser) {
        this._data = AuthUser;
    }

    /**
     * @function
     * @description
     * Method is designed to resent the `AuthUser` object from storage.
     * method invoke abstract method to remove `AuthUser` object.
     */
    reset() {
        this._data = null;
    }
}