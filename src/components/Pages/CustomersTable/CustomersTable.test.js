import React, { useState } from 'react';
import { cleanup, render, screen, renderHook, fireEvent } from '@testing-library/react';
import { CustomersTable } from './CustomersTable';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

afterEach(cleanup);

describe('Customers Table', () => {
  it('Customers Table Rendering', () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <CustomersTable />
      </MemoryRouter>
    );

    expect(screen.getByText('Customers')).toBeInTheDocument();
  });
});