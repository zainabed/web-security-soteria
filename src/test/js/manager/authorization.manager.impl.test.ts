import { AuthorizationManager, SecurityFactory } from "@zainabed/security";
import { AuthorizationManagerImpl } from "../../../main/js/manager/authorization.manager.impl";
import { Security, AuthenticationManager, AuthUser } from "@zainabed/security";
import { Mock } from "../lib/mock";

jest.mock("@zainabed/security");


describe("Unit test for AuthorizationManagerImpl.", () => {
    let manager: AuthorizationManagerImpl;
    let roles: Set<string>;

    let authUser;
    let authenticationManager;
    let securityFactory;
    let testRole;

    beforeEach(() => {
        testRole = "test";
        roles = new Set<string>();
        roles.add(testRole);
        roles.add("admin");
        roles.add("user");
        authUser = Mock.create("AuthUser", ["getRoles", "isAccountBlocked", "isAccountExpired"]);
        authenticationManager = Mock.create("AuthenticationManager", ["get"]);
        securityFactory = Mock.create("SecurityFactory", ["getAuthenticationManager"]);
        authUser.getRoles.mockReturnValue(roles);
        authenticationManager.get.mockReturnValue(authUser);
        securityFactory.getAuthenticationManager.mockReturnValue(authenticationManager);
        Security.getSecurityFactory.mockReturnValue(securityFactory);
        manager = new AuthorizationManagerImpl();
    });

    afterEach(() => {
        manager = null;
    });

    test("Should be able to instantiate class object.", () => {
        expect(manager).toBeDefined();
    });



    describe("Unit test for user authorization.", () => {

        let testRoles;
        beforeEach(() => {
            testRoles = new Set<string>();
            roles.forEach(role => {
                testRoles.add(role);
            });
        });

        test("hasRole should return true for existing user role.", () => {
            expect(manager.hasRole(testRole)).toEqual(true);
        });

        test("hasRole should return false for non existing user role.", () => {
            expect(manager.hasRole(testRole + "$")).toEqual(false);
        });

        test("hasRole method return false if current AuthUser is empty.", () => {
            authenticationManager.get.mockReturnValue(null);
            expect(manager.hasRole(testRole)).toEqual(false);
        });

       test("hasRole method should throw error when given roles is empty.", () => {
            expect(() => {manager.hasRole(null)}).toThrow(Error);
        });

        test("hasRoles method should return true for given exsiting roles of AuthUser.", () => {
            expect(manager.hasRoles(testRoles)).toEqual(true);
        });

        test("hasRoles method should return false for given non exsiting single role of AuthUser.", () => {
            testRoles.add("non-exist-role");
            expect(manager.hasRoles(testRoles)).toEqual(false);
        });

        test("hasRoles method should throw error when given roles is empty.", () => {
            expect(() => {manager.hasRoles(null)}).toThrow(Error);
        });

        test("hasAnyRole method shoud return true for existing roles of AuthUser.", () => {
            expect(manager.hasAnyRoles(testRoles)).toEqual(true);
        });

        test("hasAnyRoles method should return false if non of roles is match.", () => {
            let singleRole = new Set<string>();
            singleRole.add(testRole + "$");
            singleRole.add(testRole + "%");
            expect(manager.hasAnyRoles(singleRole)).toEqual(false);
        });

        test("hasAnyRoles method should throw error when given roles is empty.", () => {
            expect(() => {manager.hasAnyRoles(null)}).toThrow(Error);
        });

        describe("Test suite for isLogged method.", () => {
            beforeEach(() => {
                authUser.isAccountExpired.mockReturnValue(false);
                authUser.isAccountBlocked.mockReturnValue(false);
            });

            test("method should return true for authenicated user.", () => {
                expect(manager.isLogged()).toEqual(true);
            });

            test("method should return false is user is blocked.", () => {
                authUser.isAccountBlocked.mockReturnValue(true);
                expect(manager.isLogged()).toEqual(false);
            });

            test("method should return false is user account is expired.", () => {
                authUser.isAccountExpired.mockReturnValue(true);
                expect(manager.isLogged()).toEqual(false);
            });

            test("is given AuthUser is empty then method should return false.", () => {
                authenticationManager.get.mockReturnValue(null);
                expect(manager.isLogged()).toEqual(false);
            });
        });

    });

});
