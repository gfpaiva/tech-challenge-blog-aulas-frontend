import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Modal } from './Modal';

describe('Modal Component', () => {
  it('does not render when isOpen is false', () => {
    // Arrange & Act
    const { container } = render(
      <Modal isOpen={false} onClose={() => {}}>
        Test Content
      </Modal>
    );
    
    // Assert
    expect(container).toBeEmptyDOMElement();
  });

  it('renders content when isOpen is true', () => {
    // Arrange & Act
    render(
      <Modal isOpen={true} onClose={() => {}} title="Test Title" actions={<button>Action</button>}>
        Test Content
      </Modal>
    );
    
    // Assert
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    // Arrange
    const onCloseMock = vi.fn();
    render(
      <Modal isOpen={true} onClose={onCloseMock}>
        Content
      </Modal>
    );
    
    // Act
    const closeBtn = screen.getByLabelText('Close modal');
    fireEvent.click(closeBtn);
    
    // Assert
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('hides close button when hideCloseButton is true', () => {
    // Arrange & Act
    render(
      <Modal isOpen={true} onClose={() => {}} hideCloseButton>
        Content
      </Modal>
    );
    
    // Assert
    expect(screen.queryByLabelText('Close modal')).not.toBeInTheDocument();
  });

  it('calls onClose when clicking the backdrop', () => {
    // Arrange
    const onCloseMock = vi.fn();
    render(
      <Modal isOpen={true} onClose={onCloseMock}>
        Content
      </Modal>
    );
    
    // Act
    // The backdrop is typically implemented as a button with text "close" in this component
    const backdropBtn = screen.getByRole('button', { name: /^close$/i });
    fireEvent.click(backdropBtn);
    
    // Assert
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
