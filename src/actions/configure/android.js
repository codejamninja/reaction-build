import ora from 'ora';
import { log } from 'reaction-base';
import clean from '../clean';
import createConfig, { saveConfig } from '../../createConfig';

export default async function configureAndroid(options, config) {
  if (!config) {
    config = await createConfig({
      action: 'build',
      defaultEnv: 'production',
      options
    });
    log.debug('options', options);
    log.debug('config', config);
  }
  const spinner = ora('configuring android\n').start();
  if (options.clean) await clean(options, config);
  await saveConfig('android', config);
  spinner.succeed('configured android');
}
