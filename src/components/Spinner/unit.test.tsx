import { screen, renderWithTheme } from 'utils/tests/helpers';
import Spinner from '.';

describe('<Spinner/>', () => {
  it('should render <Spinner/>', () => {
    renderWithTheme(<Spinner />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
