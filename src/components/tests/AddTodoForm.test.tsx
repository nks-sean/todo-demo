import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import AddTodoForm from '../AddTodoForm';

describe('AddTodoForm', () => {
    it('should submit the form when a valid todo is entered', async () => {
        const onSubmit = vi.fn();
        const user = userEvent.setup();

        render(<AddTodoForm onSubmit={onSubmit} />);

        const input = screen.getByPlaceholderText("What needs to be done?");

        await user.type(input, "Buy Coffee");

        const button = screen.getByRole('button', { name: /addbutton/i });
        await user.click(button);

        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit).toHaveBeenCalledWith("Buy Coffee");
        expect(input).toHaveValue("");
    });
    
    it('should NOT submit when input is empty', async () => {
        const onSubmit = vi.fn();
        const user = userEvent.setup();
        render(<AddTodoForm onSubmit={onSubmit} />);
        // Click Add without typing anything
        const button = screen.getByRole('button', { name: /add/i });
        await user.click(button);
        // Ensure onSubmit was NEVER called
        expect(onSubmit).not.toHaveBeenCalled();
    });
});