import { render, screen } from '@testing-library/react';
import SearchBar from '../components/Top-controls';

describe('Top-controls component', () => {
  it('Renders search input and search button', () => {
    render(<SearchBar />);

    const searchInput = screen.getByPlaceholderText(
      /Enter the Pokémon's name/i
    );
    expect(searchInput).toBeInTheDocument();
    const searchButton = screen.getByAltText(/search-icon/i);
    expect(searchButton).toBeInTheDocument();
  });
});
