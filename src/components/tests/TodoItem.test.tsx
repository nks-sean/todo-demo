import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import TodoItem from '../TodoItem';
import type { Todo } from '../../types/todo'; // Import the real type

describe('TodoItem Component', () => {
    // Define reusable mock data
    const mockTodo: Todo = {
        id: 1,
        title: "Test Todo",
        completed: true,
    };

    it('renders the todo content correctly', () => {
        render(
            <TodoItem
                todo={mockTodo}
                onCompletedChanged={vi.fn()}
                onDelete={vi.fn()}
            />
        );

        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeInTheDocument();

        if(mockTodo.completed){
            expect(checkbox).toBeChecked();
        }
        else{
            expect(checkbox).not.toBeChecked();
        }

        // Check for the text
        expect(screen.getByText(mockTodo.title)).toBeInTheDocument();
        // Check for the delete button (using aria-label for robustness)
        expect(screen.getByRole('button', { name: /deletebutton/i })).toBeInTheDocument();
    });
    
    it('applies completed styles when todo is completed', () => {
        // Create a completed version of the todo
        const completedTodo = { ...mockTodo, completed: true };
        render(
            <TodoItem
                todo={completedTodo}
                onCompletedChanged={vi.fn()}
                onDelete={vi.fn()}
            />
        );
        // Check checkbox is checked
        expect(screen.getByRole('checkbox')).toBeChecked();
        // Check strikethrough style
        expect(screen.getByText(mockTodo.title)).toHaveClass('line-through');
    });

    it('calls onCompletedChanged when checkbox is toggled', async () => {
        const onCompletedChanged = vi.fn();
        const user = userEvent.setup();
        const expectedBool = mockTodo.completed ? false : true;
        
        render(
            <TodoItem
                todo={mockTodo}
                onCompletedChanged={onCompletedChanged}
                onDelete={vi.fn()}
            />
        );
        // Simulate user clicking the checkbox
        await user.click(screen.getByRole('checkbox'));
 
        // Expect function to be called with ID and NEW status (true)
        expect(onCompletedChanged).toHaveBeenCalledTimes(1);
        expect(onCompletedChanged).toHaveBeenCalledWith(mockTodo.id, expectedBool);
    });

    it('calls onDelete when delete button is clicked', async () => {
        const onDelete = vi.fn();
        const user = userEvent.setup();
        render(
            <TodoItem
                todo={mockTodo}
                onCompletedChanged={vi.fn()}
                onDelete={onDelete}
            />
        );
        // Simulate user clicking the delete button
        await user.click(screen.getByRole('button', { name: /delete/i }));
        expect(onDelete).toHaveBeenCalledTimes(1);
        expect(onDelete).toHaveBeenCalledWith(mockTodo.id);
    });
});