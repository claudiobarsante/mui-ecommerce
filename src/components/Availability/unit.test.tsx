import { renderWithTheme, screen } from 'utils/tests/helpers';
import { render, RenderResult } from '@testing-library/react';
import Availability from '.';

describe('<Availability/>', () => {
  it('should render with In stocj <Chip/>', () => {
    const { debug, container } = renderWithTheme(<Availability qty={3} />);
    debug(container);
    expect(screen.getByText(/In stock/i)).toBeInTheDocument();
  });
});
