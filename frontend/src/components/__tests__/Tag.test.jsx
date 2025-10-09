import React from 'react';
import { render, screen } from '@testing-library/react';
import Tag from '../Tag';

describe('Tag Component', () => {
  test('renders tag with correct text', () => {
    render(<Tag tagName="WiFi" />);
    expect(screen.getByText('WiFi')).toBeInTheDocument();
  });

  test('applies correct CSS classes', () => {
    render(<Tag tagName="Climatisation" />);
    const tag = screen.getByText('Climatisation').closest('.tag');
    expect(tag).toBeInTheDocument();
  });

  test('handles long tag names', () => {
    const longTagName = 'Équipement très long qui pourrait déborder';
    render(<Tag tagName={longTagName} />);
    expect(screen.getByText(longTagName)).toBeInTheDocument();
  });

  test('renders multiple tags correctly', () => {
    const tags = ['WiFi', 'Climatisation', 'Piscine'];
    
    tags.forEach(tagName => {
      const { unmount } = render(<Tag tagName={tagName} />);
      expect(screen.getByText(tagName)).toBeInTheDocument();
      unmount();
    });
  });
});
