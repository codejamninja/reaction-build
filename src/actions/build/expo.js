import easycp from 'easycp';
import createConfig from '../../createConfig';
import log from '../../log';

export default async function buildExpo(options, config) {
  if (!config) {
    config = createConfig({ defaultEnv: 'production' });
    log.debug('options', options);
    log.debug('config', config);
  }
  await easycp('exp build:android');
  switch (options.expoPlatform) {
    case 'android':
      await easycp('exp build:android');
      break;
    case 'ios':
      await easycp('exp build:ios');
      break;
    default:
      await easycp('exp build:android');
      await easycp('exp build:ios');
      break;
  }
}