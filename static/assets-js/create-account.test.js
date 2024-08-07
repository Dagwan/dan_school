import { screen, fireEvent } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect'; // Import this to enhance expect assertions
import { validateForm } from './create-account.js'; // Adjust the import path

describe('validateForm function', () => {
  it('displays error message if any field is empty', () => {
    document.body.innerHTML = `
      ${require('./create-account.html')}
    `;
    
    const result = validateForm();
    const errorMessage = screen.getByTestId('error-message'); // Adjust the test ID
    
    expect(result).toBe(false);
    expect(errorMessage).toBeInTheDocument();
  });

  it('displays error message if email and retypeEmail do not match', () => {
    document.body.innerHTML = `
      ${require('./create-account.html')}
      <input id="email" value="test@example.com" />
      <input id="retypeEmail" value="mismatch@example.com" />
      <!-- Add other necessary fields -->
    `;
    
    const result = validateForm();
    const errorMessage = screen.getByTestId('error-message'); // Adjust the test ID
    
    expect(result).toBe(false);
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent('Email and Retype Email, Password and Retype Password must match.');
  });

  it('submits the form when all fields are valid', () => {
    document.body.innerHTML = `
      ${require('./create-account.html')}
      <input id="email" value="test@example.com" />
      <input id="retypeEmail" value="test@example.com" />
      <input id="password" value="password" />
      <input id="retypePassword" value="password" />
      <!-- Add other necessary fields -->
    `;
    
    const result = validateForm();
    
    expect(result).toBe(true);
  });
});
