import { renderWithTheme, screen } from 'utils/tests/helpers';
import Availability from '.';

describe('<Availability/>', () => {
  it('should render with In stock <Chip/>', () => {
    const { container } = renderWithTheme(<Availability qty={3} />);

    // check if there's a <Chip/> with primary color
    const primary = container.getElementsByClassName('MuiChip-colorPrimary');
    expect(primary.length).toBe(1);

    expect(screen.getByText(/In stock/i)).toBeInTheDocument();
  });

  it('should render with Out of stock <Chip/>', () => {
    const { container } = renderWithTheme(<Availability qty={0} />);
    // check if there's a <Chip/> with primary color
    const error = container.getElementsByClassName('MuiChip-colorError');
    expect(error.length).toBe(1);

    expect(screen.getByText(/Out of stock/i)).toBeInTheDocument();
  });
});
