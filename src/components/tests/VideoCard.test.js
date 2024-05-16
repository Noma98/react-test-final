import { Route, useLocation } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { formatAgo } from '../../util/date';
import VideoCard from '../VideoCard';
import { fakeVideo as video } from '../../tests/videos';
import { withRouter } from '../../tests/utils';

describe('VideoCard', () => {
  const { title, channelTitle, publishedAt, thumbnails } = video.snippet;

  //[타입별 UI 테스트]
  //1) 직접 작성
  it('renders grid type correctly', () => {
    render(
      withRouter(<Route path='/' element={<VideoCard video={video} />} />)
    );

    const image = screen.getByRole('img');
    expect(image.src).toBe(thumbnails.medium.url);
    expect(image.alt).toBe(title);
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(channelTitle)).toBeInTheDocument();
    expect(screen.getByText(formatAgo(publishedAt))).toBeInTheDocument();
  });

  //2) 스냅샷 테스트로 작성
  it('renders list type correctly', () => {
    const component = renderer.create(
      withRouter(
        <Route path='/' element={<VideoCard video={video} type='list' />} />
      )
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('navigate to detailed video page with video state when clicked', async () => {
    function LocationStateDisplay() {
      return <pre>{JSON.stringify(useLocation().state)}</pre>;
    }
    render(
      withRouter(
        <>
          <Route path='/' element={<VideoCard video={video} />} />
          <Route
            path={`/videos/watch/${video.id}`}
            element={<LocationStateDisplay />}
          />
        </>
      )
    );
    const card = screen.getByRole('listitem');
    await userEvent.click(card);
    expect(screen.getByText(JSON.stringify({ video }))).toBeInTheDocument();
  });
});
