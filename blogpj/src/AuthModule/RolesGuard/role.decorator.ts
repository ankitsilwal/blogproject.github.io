import { SetMetadata } from "@nestjs/common/decorators/core/set-metadata.decorator";
import { UserRole } from "src/AuthModule/Dto/createUserDto";
export const UserRoles = (...roles: UserRole[]) => SetMetadata("roles", roles);
