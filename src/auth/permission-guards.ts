import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Permit } from 'permitio';

const permit = new Permit({
  pdp: 'https://cloudpdp.api.permit.io',
  token:
    'permit_key_nkGOVUo6zz2jikPn4peSe8r9BpanyjsjpmIG8SC6AFne57SaMKRRlA8Coei43RzdXNHPRjYacUxvhdan1vlsN7',
});

@Injectable()
export class PermissionsGuards implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // logica aqui
    const userHasPermission = await permit.check(
      'demo_user@gmail.com',
      'read',
      'protected_page',
    );

    if (!userHasPermission) {
      throw new UnauthorizedException('Você não tem permissão');
    }

    return true;
  }
}
