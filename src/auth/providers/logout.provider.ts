import { Injectable } from '@nestjs/common';

@Injectable()
export class LogoutProvider {
  public async logout(userId: number) {
    // In a stateless JWT implementation, the invalidation is often handled on the client side by removing the token.
    // However, if we implement token blacklisting or refresh token revocation in the future, it would go here.
    return { message: 'Logged out successfully' };
  }
}
