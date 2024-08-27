import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt-payload';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private jwtService: JwtService,
    private authService:AuthService,
  ){}

  async canActivate( context: ExecutionContext,): Promise<boolean>  {

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    // si no hay token arroja este error
    if (!token) {
      throw new UnauthorizedException('there is no barer token');
    }

    try {
      const payload = await this.jwtService.verifyAsync <JwtPayload> (
        token,{ secret: process.env.JWT }
      );

      const user = await this.authService.findUserById( payload.id );
      if ( !user ) throw new UnauthorizedException('User does not exists');
      
      request['user'] = user;
      
    } catch (error) {
      throw new UnauthorizedException();
      
    }

    return true;
  }


  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
