import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Permit } from 'permitio';
import { typePolicy } from './politica-permission';
import { config } from 'dotenv';
config();

const permit = new Permit({
  pdp: process.env.URL_PERMIT_IO,
  token: process.env.TOKEN_PERMIT_IO,
});

@Injectable()
export class PermissionsGuards implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const userHasPermission = await permit.check(
      typePolicy.user,
      typePolicy.tipoAcesso,
      typePolicy.rule,
    );

    if (!userHasPermission) {
      throw new ForbiddenException('Você não tem permissão');
    }

    return true;
  }
}
