import pino from 'pino';
import 'pino-pretty';

export const logger = pino({ prettyPrint: { translateTime: true, colorize: true } });
