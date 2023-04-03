import { SetMetadata } from '@nestjs/common';

export const HasRoles = (...HasRoles) => SetMetadata('roles', HasRoles);
