import { SetMetadata } from "@nestjs/common/decorators/core/set-metadata.decorator";
import { UserRole } from "src/UserModule/dto/createUserDto";
export const UserRoles = (...roles: UserRole[])=> SetMetadata("roles", roles)