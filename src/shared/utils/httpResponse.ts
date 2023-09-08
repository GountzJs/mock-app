import { Response } from 'express';
import { HttpStatus } from '../models/enums/httpStatus.enum';

export class HttpResponse {
  static ok(res: Response, data?: unknown) {
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      description: 'OK',
      data,
    });
  }

  static created(res: Response, data?: unknown) {
    res.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      description: 'CREATED',
      data,
    });
  }

  static notAceptable(res: Response, description: string, error?: string) {
    res.status(HttpStatus.NOT_ACEPTABLE).json({
      status: HttpStatus.NOT_ACEPTABLE,
      description,
      error,
    });
  }

  static conflic(res: Response, description: string, error?: string) {
    res.status(HttpStatus.CONFLIC).json({
      status: HttpStatus.CONFLIC,
      description,
      error,
    });
  }

  static internalError(res: Response) {
    res.status(HttpStatus.INTERNAL_ERROR).json({
      status: HttpStatus.INTERNAL_ERROR,
      description: 'Server error',
      error: 'Generic error',
    });
  }

  static gatewayTimeout(res: Response) {
    res.status(HttpStatus.GATEWAY_TIMEOUT).json({
      status: HttpStatus.GATEWAY_TIMEOUT,
      description: 'Server error',
      error: 'Timeout over',
    });
  }
}
