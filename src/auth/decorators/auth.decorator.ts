import { SetMetadata, UseGuards } from '@nestjs/common';
import { AUTH_TYPE_KEY } from '../constants/auth.constants';
import { AuthType } from '../enums/auth-type.enum';
import { BearerGuard } from '../guards/bearer.guard';


// Auth is a decorator which takes authTypes as an argument, and assign those metadat to the excution context
export const Auth = (...authTypes: AuthType[]) => {
  UseGuards(BearerGuard);
  return SetMetadata(AUTH_TYPE_KEY, authTypes);
};
