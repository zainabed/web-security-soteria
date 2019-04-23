import { SecurityFactoryImpl } from "./factory/security.factory.impl";
import { Security, SecurityFactory } from "@zainabed/security";

export function register() {
    let securityFactory: SecurityFactory = new SecurityFactoryImpl();
    Security.registerSecurityFactory(securityFactory);
}
