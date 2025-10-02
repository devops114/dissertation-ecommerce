

// frontend/src/App.test.js
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders ecommerce store', () => {
  render(<App />);
  const storeElement = screen.getByText(/ecommerce store/i);
  expect(storeElement).toBeInTheDocument();
});
