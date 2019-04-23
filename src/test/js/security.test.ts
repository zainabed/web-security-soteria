import { SecurityFactoryImpl } from "../../main/js/factory/security.factory.impl";
import { register } from "../../main/js/security";
import { Security } from "@zainabed/security";


jest.mock("../../main/js/factory/security.factory.impl");
jest.mock("@zainabed/security");

describe("Unit test for SecurityImpl class.", () => {
    
    test("register method should call registerSecurityFactory method of Security class.", () => {
        register();
        expect(Security.registerSecurityFactory).toHaveBeenCalled();
    });
});