import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navigation from '../Navigation';

// Wrapper pour les tests avec Router
const RouterWrapper = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('Navigation Component', () => {
  test('renders navigation links', () => {
    render(
      <RouterWrapper>
        <Navigation />
      </RouterWrapper>
    );
    
    expect(screen.getByText('Accueil')).toBeInTheDocument();
    expect(screen.getByText('A Propos')).toBeInTheDocument();
  });

  test('renders logo as clickable link', () => {
    render(
      <RouterWrapper>
        <Navigation />
      </RouterWrapper>
    );
    
    const logoLink = screen.getByRole('link', { name: '' });
    expect(logoLink).toHaveAttribute('href', '/');
  });

  test('navigation links have correct href attributes', () => {
    render(
      <RouterWrapper>
        <Navigation />
      </RouterWrapper>
    );
    
    const accueilLink = screen.getByRole('link', { name: 'Accueil' });
    const aproposLink = screen.getByRole('link', { name: 'A Propos' });
    
    expect(accueilLink).toHaveAttribute('href', '/');
    expect(aproposLink).toHaveAttribute('href', '/about');
  });

  test('applies correct CSS classes', () => {
    render(
      <RouterWrapper>
        <Navigation />
      </RouterWrapper>
    );
    
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('header');
    
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('header-nav');
  });
});
