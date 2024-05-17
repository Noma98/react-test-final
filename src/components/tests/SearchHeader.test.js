import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import { Route } from 'react-router-dom';

import { withRouter } from '../../tests/utils';
import SearchHeader from '../SearchHeader';

describe('SearchHeader', () => {
  it('renders correctly', () => {
    const component = renderer.create(
      withRouter(<Route path='/' element={<SearchHeader />} />)
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
  it('renders with keyword correctly', () => {
    render(
      withRouter(<Route path='/:keyword' element={<SearchHeader />} />, '/bts')
    );
    expect(screen.getByDisplayValue('bts')).toBeInTheDocument();
  });

  it('navigate to videos page with keyword when clicked', async () => {
    const searchKeyword = 'fake-keyword';

    render(
      withRouter(
        <>
          <Route path='/' element={<SearchHeader />} />
          <Route
            path={`/videos/${searchKeyword}`}
            element={<p>{`Search result for ${searchKeyword}`}</p>}
          />
        </>
      )
    );
    const searchButton = screen.getByRole('button');
    const searchInput = screen.getByRole('textbox');
    await userEvent.type(searchInput, searchKeyword);
    await userEvent.click(searchButton);

    expect(
      screen.getByText(`Search result for ${searchKeyword}`)
    ).toBeInTheDocument();
  });
});
