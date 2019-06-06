import { SecurityFactoryImpl } from "./factory/security.factory.impl";
import { Security, SecurityFactory } from "@zainabed/security";

export function RegisterSecurity() {
    let securityFactory: SecurityFactory = new SecurityFactoryImpl();
    Security.registerSecurityFactory(securityFactory);
}
