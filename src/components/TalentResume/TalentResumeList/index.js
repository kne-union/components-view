import { createWithRemoteLoader } from '@kne/remote-loader';
import classnames from 'classnames';
import get from 'lodash/get';

import style from './style.module.scss';
import TalentResumeCard from '../TalentResumeCard';

const TalentResumeList = createWithRemoteLoader({
  modules: ['Highlight@HighlightProvider']
})(({ remoteModules, data, keywords, ...props }) => {
  const [HighlightProvider] = remoteModules;

  return (
    <div className={classnames(style['resume-list'], 'resume-list')}>
      <HighlightProvider list={keywords || []}>
        {get(data, 'pageData', []).map((item, index) => (
          <div className={style['resume-card-wrap']} key={`card-${index}`}>
            <TalentResumeCard item={item} {...props} />
          </div>
        ))}
      </HighlightProvider>
    </div>
  );
});

export default TalentResumeList;
