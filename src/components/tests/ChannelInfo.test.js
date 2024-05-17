import { render, screen, waitFor } from '@testing-library/react';
import { Route } from 'react-router-dom';

import { withAllContexts, withRouter } from '../../tests/utils';
import ChannelInfo from '../ChannelInfo';

describe('ChannelInfo', () => {
  const fakeYoutube = {
    channelImageUrl: jest.fn(),
  };
  afterEach(() => fakeYoutube.channelImageUrl.mockReset());

  it('renders corretly', async () => {
    fakeYoutube.channelImageUrl.mockImplementation(() => 'url');
    render(
      withAllContexts(
        withRouter(
          <Route path='/' element={<ChannelInfo id='id' name='channel' />} />
        )
      )
    );
    await waitFor(() => screen.getByText('channel'));
  });
});
