import React, { useState } from 'react';
import { cleanup, render, screen, renderHook, fireEvent } from '@testing-library/react';
import { ModalConfirmationDialog } from './ModalConfirmationDialog';
import '@testing-library/jest-dom';

afterEach(cleanup);

describe('Modal Confirmation Dialog', () => {
  it('Open modal confirmation dialog', () => {
    render(
      <ModalConfirmationDialog
        title="Test Confirmation Dialog"
        open={true}
        handleCancel={() => { }}
        handleOk={() => { }}
        content="Testing is very helpful"
      />,
    );

    expect(screen.getByText('Test Confirmation Dialog')).toBeInTheDocument();
  });

  it('Close modal confirmation dialog', async () => {
    const [state, setState] = renderHook(() => useState(false)).result.current;
    render(
      <ModalConfirmationDialog
        title="Test Confirmation Dialog"
        open={state}
        setOpen={setState}
        handleOk={() => { }}
        content="Testing is very helpful"
      />,
    );

    expect(state).toBe(false);
    expect(screen.queryByText('Test Confirmation Dialog')).not.toBeInTheDocument();
  });
});