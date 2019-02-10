import { AddressInfo } from 'net';
import * as config from '../config';
import app from './app';
import { logger } from './common/logger';

void (async function bootstrap() {
  const server = app.listen(config.server.port, () => {
    const { address, port } = server.address() as AddressInfo;
    logger.info(
      `listening at http://${address === '::' ? 'localhost' : address}:${port}`,
    );
  });
})();
