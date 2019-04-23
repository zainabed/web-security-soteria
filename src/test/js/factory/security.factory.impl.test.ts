import { SecurityFactory, AuthorizationManager, AuthenticationManager } from "@zainabed/security";
import { SecurityFactoryImpl } from "../../../main/js/factory/security.factory.impl";
import { AuthorizationManagerImpl } from "../../../main/js/manager/authorization.manager.impl";
import { AuthenticationManagerImpl } from "../../../main/js/manager/authentication.manager.impl";

jest.mock("../../../main/js/manager/authorization.manager.impl");
jest.mock("../../../main/js/manager/authentication.manager.impl");

describe("Unit test for SecurityManagerFactory class.", () => {
    let factory: SecurityFactory;

    beforeEach(() => {
        factory = new SecurityFactoryImpl();
    });

    afterEach(() => {
        factory = null;
    });

    test("Factory class should be defined.", () => {
        expect(factory).toBeTruthy();
    });

    test("getAuthorizationManager should return object of type AuthorizationManager.", () => {
        let authorizationManager: AuthorizationManager = factory.getAuthorizationManager();
        expect(authorizationManager).toBeTruthy();
    });

    test("getAuthorizationManager should return object of type AuthorizationManager.", () => {
        let authenticationManager: AuthenticationManager = factory.getAuthenticationManager();
        expect(authenticationManager).toBeTruthy();
    });
});