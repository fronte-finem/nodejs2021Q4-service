import chalk from 'chalk';
import { EnvConfig } from '../config';

export class AppBootstrapLog {
  private startTime!: Date;

  begin(config: typeof EnvConfig) {
    this.startTime = new Date();
    AppBootstrapLog.log(config, 'Starting Nest application...');
  }

  end(config: typeof EnvConfig) {
    const timeDiff = new Date().getTime() - this.startTime.getTime();
    AppBootstrapLog.log(config, 'Nest application successfully started!', timeDiff);
  }

  private static log(config: typeof EnvConfig, title: string, timeDiff?: number) {
    const { isDev, useFastify, host, port, openApiRoute, logLevel } = config;
    const address = `http://${host}:${port}`;

    const info = Object.entries({
      Time: new Date().toLocaleTimeString(),
      Mode: isDev ? 'development' : 'production',
      Engine: useFastify ? 'Fastify' : 'Express',
      Address: address,
      OpenAPI: `${address}/${openApiRoute}`,
      'Max log level': logLevel.toUpperCase(),
    })
      .map(([key, value]) => `  ${key.padEnd(16)} -> ${value}\n`)
      .join('');

    let colorize = useFastify ? chalk.blueBright : chalk.magentaBright;
    if (!timeDiff) colorize = colorize.dim;
    process.stdout.write(`  ${colorize.inverse(`  ${title}  `)}\n${colorize(info)}`);
    process.stdout.write(
      timeDiff ? `  ${colorize.inverse(`  Bootstrap time span: ${timeDiff}ms  `)}\n\n` : '\n'
    );
  }
}
