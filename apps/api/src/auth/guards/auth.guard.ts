import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.cookies.access_token) return false;

    return this.validateRequest(request.cookies.access_token);
  }

  async validateRequest(accessToken: string): Promise<boolean> {
    let tokenVerified = this.jwtService.verify(accessToken);

    if (tokenVerified.error) return false;

    try {
      // 3) Get user in the db
      const user = await this.prisma.user.findUnique({
        where: { id: tokenVerified.id },
      });

      if (!user) return false;

      return true;
    } catch (error) {
      return false;
    }
  }
}
