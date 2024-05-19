import { Route } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import ChannelInfo from '../../components/ChannelInfo';
import RelatedVideos from '../../components/RelatedVideos';
import { withRouter } from '../../tests/utils';
import VideoDetail from '../VideoDetail';
import { fakeVideo } from '../../tests/videos';

jest.mock('../../components/ChannelInfo');
jest.mock('../../components/RelatedVideos');

describe('VideoDetail', () => {
  afterEach(() => {
    ChannelInfo.mockReset();
    RelatedVideos.mockReset();
  });
  it('renders corretly', () => {
    render(
      withRouter(<Route path='/' element={<VideoDetail />} />, {
        pathname: '/',
        state: {
          video: fakeVideo,
        },
        key: 'fake-key',
      })
    );
    const { title, channelId, channelTitle } = fakeVideo.snippet;
    expect(screen.getByTitle(title)).toBeInTheDocument(); //이 라인은 스냅샷 테스트로 대체 가능
    expect(RelatedVideos.mock.calls[0][0]).toStrictEqual({ id: fakeVideo.id });
    expect(ChannelInfo.mock.calls[0][0]).toStrictEqual({
      id: channelId,
      name: channelTitle,
    });
  });
});
