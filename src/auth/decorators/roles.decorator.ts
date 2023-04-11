import { SetMetadata } from '@nestjs/common';

export const HasRoles = (...HasRoles) => {
  console.log(HasRoles);
  return SetMetadata('role', HasRoles);
};
