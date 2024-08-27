import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt-payload';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private jwtService: JwtService,
  ){}

  async canActivate( context: ExecutionContext,): Promise<boolean>  {

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    // si no hay token arroja este error
    if (!token) {
      throw new UnauthorizedException('there is no token');
    }

    try {
      const payload = await this.jwtService.verifyAsync <JwtPayload> (
        token,
        {
          secret: process.env.JWT
        }
      );

      console.log({payload});
      
      request['user'] = payload.id;
      
    } catch (error) {
      throw new UnauthorizedException();
      
    }

    // 💡 We're assigning the payload to the request object here
    // so that we can access it in our route handlers

    return true;
  }


  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
