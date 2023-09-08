import 'dotenv/config';

export class Settings {
  private _host: string;
  private _port: number;
  private _jwtSecret: string;

  constructor() {
    this.host = process.env.HOST ?? 'localhost';
    this.port = Number(process.env.PORT) ?? 8080;
    this.jwtSecret = process.env.JWT_SECRET ?? '';
  }

  get host() {
    return this._host;
  }

  set host(value: string) {
    this._host = value;
  }

  get port() {
    return this._port;
  }

  set port(value: number) {
    this._port = value;
  }

  get jwtSecret() {
    return this._jwtSecret;
  }

  set jwtSecret(value: string) {
    this._jwtSecret = value;
  }
}
