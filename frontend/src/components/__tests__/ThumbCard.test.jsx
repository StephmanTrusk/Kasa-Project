import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ThumbCard from '../ThumbCard';

// Wrapper pour les tests avec Router
const RouterWrapper = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('ThumbCard Component', () => {
  const mockAccommodation = {
    id: '1',
    title: 'Appartement de luxe',
    cover: 'https://example.com/image.jpg'
  };

  beforeEach(() => {
    // Mock pour les images
    Object.defineProperty(HTMLImageElement.prototype, 'src', {
      set() {
        this.onload && this.onload();
      }
    });
  });

  test('renders card with correct title', () => {
    render(
      <RouterWrapper>
        <ThumbCard
          id={mockAccommodation.id}
          title={mockAccommodation.title}
          imageUrl={mockAccommodation.cover}
        />
      </RouterWrapper>
    );

    expect(screen.getByText('Appartement de luxe')).toBeInTheDocument();
  });

  test('renders as a link to accommodation detail', () => {
    render(
      <RouterWrapper>
        <ThumbCard
          id={mockAccommodation.id}
          title={mockAccommodation.title}
          imageUrl={mockAccommodation.cover}
        />
      </RouterWrapper>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/accommodation/1');
  });

  test('applies correct CSS classes', () => {
    render(
      <RouterWrapper>
        <ThumbCard
          id={mockAccommodation.id}
          title={mockAccommodation.title}
          imageUrl={mockAccommodation.cover}
        />
      </RouterWrapper>
    );

    const card = screen.getByText('Appartement de luxe').closest('.thumb-card');
    expect(card).toBeInTheDocument();
  });

  test('handles click event', () => {
    render(
      <RouterWrapper>
        <ThumbCard
          id={mockAccommodation.id}
          title={mockAccommodation.title}
          imageUrl={mockAccommodation.cover}
        />
      </RouterWrapper>
    );

    const link = screen.getByRole('link');
    fireEvent.click(link);
    
    // Vérifier que la navigation fonctionne
    expect(link).toHaveAttribute('href', '/accommodation/1');
  });
});
