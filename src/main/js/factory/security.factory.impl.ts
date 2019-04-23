import { AuthenticationManager, SecurityFactory, AuthorizationManager } from "@zainabed/security";
import { AuthorizationManagerImpl } from "../manager/authorization.manager.impl"
import { AuthenticationManagerImpl } from "../manager/authentication.manager.impl";

export class SecurityFactoryImpl implements SecurityFactory {


    private authenticationManager: AuthenticationManager;
    private authorizationManager: AuthorizationManager;

    constructor() {
        this.authenticationManager = null;
        this.authorizationManager = null;
    }

    /**
     * 
     */
    public getAuthenticationManager(): AuthenticationManager {
        /* istanbul ignore else */
        if (this.authenticationManager == null) {
            this.authenticationManager = new AuthenticationManagerImpl();
        }
        return this.authenticationManager;
    }

    /**
     * 
     */
    public getAuthorizationManager(): AuthorizationManager {
        /* istanbul ignore else */
        if (this.authorizationManager == null) {
            this.authorizationManager = new AuthorizationManagerImpl();
        }
        return this.authorizationManager;
    }

}