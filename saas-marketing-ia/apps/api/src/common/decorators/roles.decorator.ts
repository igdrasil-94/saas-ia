import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';

export const ROLES_KEY = 'roles';

/**
 * Décorateur pour restreindre l'accès à certains rôles
 * @example
 * @Roles(Role.ADMIN)
 * @Get('admin')
 */
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
