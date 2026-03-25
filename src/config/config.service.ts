import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class ConfigService {
  get(key: string): string {
    const value = process.env[key];
    if (value === undefined) {
      throw new Error(`Config key "${key}" is not set`);
    }
    return value;
  }
}
