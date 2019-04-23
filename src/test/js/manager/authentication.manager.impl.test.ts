import { AuthenticationManager, AuthUser } from "@zainabed/security";
import { AuthenticationManagerImpl } from "../../../main/js/manager/authentication.manager.impl";
jest.mock("@zainabed/security");


describe("Unit test for AuthenticationManagerImpl class", () => {
    let manager: AuthenticationManager;
    let authUser: AuthUser;

    beforeEach(() => {
        manager = new AuthenticationManagerImpl();
        AuthUser.mockClear();
    });

    afterEach(() => {
        manager = null;
        authUser = AuthUser;
    });

    test("Should be able to instantiate class object.", () => {
        expect(manager).toBeDefined();
    });

    test("setter and getter should work.\n", () => {
        manager.set(authUser);
        expect(manager.get()).toEqual(authUser);
    });

    test("reset method set null value inside field variable of manager.",() => {
        manager.set(authUser);
        expect(manager.get()).toEqual(authUser);
        manager.reset();
        expect(manager.get()).toBe(null);
   
    });
});