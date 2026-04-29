import { SetMetadata } from '@nestjs/common';

export const EXCLUDE_FROM_ROLES_KEY = 'excludeFromRoles';

/**
 * Décorateur pour exclure une route de l'authentification
 * @example
 * @Public()
 * @Get('health')
 */
export const Public = () => SetMetadata(EXCLUDE_FROM_ROLES_KEY, true);
