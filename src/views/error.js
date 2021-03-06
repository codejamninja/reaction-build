import 'babel-polyfill';
import ignoreWarnings from 'ignore-warnings';
import log, { setLevel } from 'reaction-base/log';
import HotClient from '../hotClient';

window.document.title = window.reaction.config.title;
ignoreWarnings('react-error-overlay is not meant for use in production');

let hash = null;
const { config } = window.reaction;

if (
  config.options.verbose ||
  config.options.debug ||
  config.level === 'trace'
) {
  setLevel('trace');
} else if (config.env === 'development') {
  setLevel('debug');
} else {
  setLevel(config.level);
}

const {
  reportBuildError,
  startReportingRuntimeErrors
} = require('react-error-overlay');

log.error(window.reaction.errStack);

startReportingRuntimeErrors({});
reportBuildError(window.reaction.errStack);

log.trace('connecting . . .');
const client = new HotClient({ port: config.ports.dev });
client.onConnected = async () => {
  log.trace('connected');
};
client.onHash = async message => {
  log.trace('hash', hash);
  if (hash) windowReload();
  hash = message.data;
};
client.onContentChanged = () => {
  log.trace('content-changed');
  windowReload();
};
client.onClose = () => {
  log.trace('close');
  log.debug(
    'The development server has disconnected.\n' +
      'Refresh the page if necessary.'
  );
};

function windowReload() {
  if (config.options.debug) {
    log.trace('reloading window . . .');
  } else {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
}
