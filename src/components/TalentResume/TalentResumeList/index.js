import { createWithRemoteLoader } from '@kne/remote-loader';
import classnames from 'classnames';
import { withFetch } from '@kne/react-fetch';
import get from 'lodash/get';

import style from './style.module.scss';
import TalentResumeCard from '../TalentResumeCard';

const TalentResumeList = createWithRemoteLoader({
  modules: ['Highlight@HighlightProvider']
})(
  withFetch(({ remoteModules, data, keywords }) => {
    const [HighlightProvider] = remoteModules;

    return (
      <div className={classnames(style['resume-list'], 'resume-list')}>
        <HighlightProvider list={keywords || []}>
          {get(data, 'pageData', []).map((item, index) => (
            <div className={style['resume-card-wrap']} key={`card-${index}`}>
              <TalentResumeCard item={item} />
            </div>
          ))}
        </HighlightProvider>
      </div>
    );
  })
);

export default TalentResumeList;
