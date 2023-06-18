import { SetMetadata } from '@nestjs/common';

export const HasRoles = (...HasRoles) => {
  return SetMetadata('role', HasRoles);
};
