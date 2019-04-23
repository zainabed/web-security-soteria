import { AuthorizationManager, Security, SecurityFactory, AuthenticationManager, AuthUser } from "@zainabed/security";



/**
 * @license MIT
 * @author Zainul Shaikh
 * @class 
 * 
 * @description
 * An implementation of `UserSecurity` interface. this class is designed to facilitate User's
 * authentication and authorization mechanism.
 * Class perform all these operations on `UserDetails` object via `UserDetailsService` service.
 * 
 * It is highly recommended to implement server side authentication and authorization system as
 * client side applications are vulnerable to security attacks.
 * 
 * These class provides better user experience to user and avoid unnecessary round trip to server 
 * for unauthorized request.  
 */
export class AuthorizationManagerImpl implements AuthorizationManager {

    private authenticationManager: AuthenticationManager;

    /**
     * @function
     * @description
     * Constructor method
     * 
     * @param {UserDetailsService} userDetailsService service object for `UserDetails` 
     */
    constructor() {
        let securityFactory: SecurityFactory = Security.getSecurityFactory();
        this.authenticationManager = securityFactory.getAuthenticationManager();
    }

    /*getAuthenticationManager(){
        return this.authenticationManager;
    }

    setAuthenticationManger(authenticationManager: AuthenticationManager){
        this.authenticationManager = authenticationManager;
    }*/

    /**
     * @access private
     * @function
     * @description
     * Helper method to fetch `GrantedRole` array from `UserDetailsService` object.
     * 
     * @returns {Set<string>}
     */
    private getRoles(): Set<string> {
        let authUser: AuthUser = this.authenticationManager.get();

        if (authUser) {
            return authUser.getRoles();
        }
        return new Set<string>();
    }

    /**
     * @function
     * @access public
     * @description
     * Verify if given role is assigned to current User or not.
     * If given role is present in `UserDetails` object then it should 
     * return true otherwise false.
     * 
     * @param {GrantedRole} role given `GrantedRole` object 
     * @returns {boolea}
     */
    public hasRole(role: string): boolean {
        if (!role) {
            throw new Error("Role can not be null");
        }

        return this.getRoles().has(role);
    }

    /**
     * @function
     * @access public
     * @description
     * Verify if all given roles are assigned to current User or not.
     * Method compares all given roles with `UserDetails` object's assigned roles.
     * if single role failed to match then method returns false.
     * 
     * @param {GrantedRole[]} roles Granted roles
     * @returns {boolean} 
     */
    public hasRoles(roles: Set<string>): boolean {
        if (!roles) {
            throw Error("Roles can not be null");
        }

        let userRoles: Set<string> = this.getRoles();
        let status = true;

        roles.forEach(role => {
            if (!userRoles.has(role)) {
                status = false;
                return;
            }
        });
        return status;
    }

    /**
     * @function
     * @description
     * Verify if any of given roles is assigned to current User or not.
     * Method compares given roles with  `UserDetails` object's assigned roles.
     * if it founds one of them then method returns true.
     * 
     * @param {Set<string>} roles Granted roles
     * @returns {boolean}  
     */
    public hasAnyRoles(roles: Set<string>): boolean {

        if (!roles) {
            throw Error("Roles can not be null");
        }

        let userRoles: Set<string> = this.getRoles();

        let status = false;
        roles.forEach(role => {
            if (userRoles.has(role)) {
                status = true;
                return;
            }
        });
        return status;
    }

    /**
     * @function
     * @description
     * Verify is current User is logged in or not
     * 
     * @returns {boolean} 
     */
    public isLogged(): boolean {
        let authUser: AuthUser = this.authenticationManager.get();

        if (authUser != null && !authUser.isAccountBlocked() && !authUser.isAccountExpired()) {
            return true;
        }
        return false;
    }



}