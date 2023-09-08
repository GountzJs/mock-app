import { Request, Response } from 'express';
import { HttpResponse } from '../../shared/utils/httpResponse';
import { AuthService } from '../services/auth.service';

export class AuthController {
  constructor(private readonly authService: AuthService = new AuthService()) {}

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body.auth;
    try {
      const user = await this.authService.findByEmail(email);
      if (user.password !== password)
        return HttpResponse.conflic(
          res,
          'Wrong credentials',
          'Email or password incorrect'
        );
      HttpResponse.ok(res, { token: `${email}-${user.id}` });
    } catch (err) {
      if (String(err).includes('Wrong credentials')) {
        return HttpResponse.conflic(
          res,
          'Wrong credentials',
          'Email or password incorrect'
        );
      }
      return HttpResponse.internalError(res);
    }
  };

  register = async (req: Request, res: Response) => {
    const { email, username } = req.body.auth;
    try {
      if (await this.authService.emailExist(email)) {
        return HttpResponse.notAceptable(
          res,
          'Field duplicate',
          'El correo ya se encuentra en uso'
        );
      }
      if (await this.authService.usernameExist(username))
        return HttpResponse.notAceptable(
          res,
          'Field duplicate',
          'El nombre de usuario ya se encuentra en uso'
        );
      HttpResponse.created(res, null);
    } catch {
      return HttpResponse.internalError(res);
    }
  };
}
