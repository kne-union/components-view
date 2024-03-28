import { createWithRemoteLoader } from '@kne/remote-loader';
import classnames from 'classnames';
import style from './style.module.scss';

const EventView = createWithRemoteLoader({
  modules: ['components-core:InfoPage']
})(({ remoteModules, className, ...props }) => {
  const [InfoPage] = remoteModules;
  return <InfoPage {...props} className={classnames(className, style['event-view'])} />;
});

EventView.Part = createWithRemoteLoader({
  modules: ['components-core:InfoPage']
})(({ remoteModules, className, ...props }) => {
  const [InfoPage] = remoteModules;
  return <InfoPage.Part {...props} className={classnames(className, style['event-part'])} />;
});

EventView.Collapse = createWithRemoteLoader({
  modules: ['components-core:InfoPage']
})(({ remoteModules, className, ...props }) => {
  const [InfoPage] = remoteModules;
  return <InfoPage.Collapse {...props} className={classnames(className, style['event-collapse'])} />;
});

export default EventView;
