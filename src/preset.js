import React from 'react';
import { preset as fetchPreset } from '@kne/react-fetch';
import { Spin, Empty, message } from 'antd';
import axios from 'axios';
import { preset as remoteLoaderPreset } from '@kne/remote-loader';
import omit from 'lodash/omit';

window.PUBLIC_URL = process.env.PUBLIC_URL;

const registry = {
  url: 'https://uc.fatalent.cn',
  tpl: '{{url}}/packages/@kne-components/{{remote}}/{{version}}/build'
};

const componentsCoreRemote = {
  ...registry,
  remote: 'components-core',
  defaultVersion: '0.2.24'
};

remoteLoaderPreset({
  remotes: {
    default: componentsCoreRemote,
    'components-core': componentsCoreRemote,
    'components-iconfont': {
      ...registry,
      remote: 'components-iconfont',
      defaultVersion: '0.1.10'
    },
    'components-widget': {
      ...registry,
      remote: 'components-widget',
      defaultVersion: '0.1.0'
    },
    'components-view':
      process.env.NODE_ENV === 'development'
        ? {
            remote: 'components-view',
            url: '/',
            tpl: '{{url}}'
          }
        : {
            ...registry,
            remote: 'components-view',
            defaultVersion: process.env.DEFAULT_VERSION
          }
  }
});

export const ajax = (() => {
  const instance = axios.create({
    validateStatus: function () {
      return true;
    }
  });

  return params => {
    if (params.hasOwnProperty('loader') && typeof params.loader === 'function') {
      return Promise.resolve(params.loader(omit(params, ['loader'])))
        .then(data => ({
          data: {
            code: 0,
            data
          }
        }))
        .catch(err => {
          message.error(err.message || '请求发生错误');
          return { data: { code: 500, msg: err.message } };
        });
    }
    return instance(params);
  };
})();

fetchPreset({
  ajax,
  loading: <Spin delay={500} style={{ position: 'absolute', left: '50%', padding: '10px', transform: 'translateX(-50%)' }} />,
  error: null,
  empty: <Empty />,
  transformResponse: response => {
    const { data } = response;
    response.data = {
      code: data.code === 0 ? 200 : data.code,
      msg: data.msg,
      results: data.data
    };
    return response;
  }
});
