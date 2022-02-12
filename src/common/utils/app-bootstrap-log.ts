import chalk from 'chalk';
import { EnvironmentVariables } from '../../config/env.validation';

export class AppBootstrapLog {
  private startTime!: Date;

  constructor(private readonly envVars: EnvironmentVariables) {}

  begin() {
    this.startTime = new Date();
    this.log('Starting Nest application...');
  }

  end() {
    const timeDiff = new Date().getTime() - this.startTime.getTime();
    this.log('Nest application successfully started!', timeDiff);
  }

  private log(title: string, timeDiff?: number) {
    const { isDev, USE_FASTIFY, HOST, PORT, OPEN_API_ROUTE, LOG_LEVEL } = this.envVars;
    const address = `http://${HOST}:${PORT}`;

    const info = Object.entries({
      Time: new Date().toLocaleTimeString(),
      Mode: isDev ? 'development' : 'production',
      Engine: USE_FASTIFY ? 'Fastify' : 'Express',
      Address: address,
      OpenAPI: `${address}/${OPEN_API_ROUTE}`,
      'Max log level': LOG_LEVEL.toUpperCase(),
    })
      .map(([key, value]) => `  ${key.padEnd(16)} -> ${value}\n`)
      .join('');

    let colorize = USE_FASTIFY ? chalk.blueBright : chalk.magentaBright;
    if (!timeDiff) colorize = colorize.dim;
    process.stdout.write(`  ${colorize.inverse(`  ${title}  `)}\n${colorize(info)}`);
    process.stdout.write(
      timeDiff ? `  ${colorize.inverse(`  Bootstrap time span: ${timeDiff}ms  `)}\n\n` : '\n'
    );
  }
}
