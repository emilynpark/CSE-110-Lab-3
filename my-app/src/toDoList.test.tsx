import { render, screen, fireEvent } from "@testing-library/react";
import { ToDoList } from './toDoList';
import { dummyGroceryList } from './constants';

describe('ToDoList', () => {
    
    //Required test for ensuring that all the items contained in the
    //dummyGroceryList are displayed by ensuring that each item's name
    //appears in the document
    test("all items in list displayed on screen", () => {
        render(<ToDoList />)

        const items = dummyGroceryList.map(item => item.name);
        items.forEach(item => {
            expect(screen.getByText(item)).toBeInTheDocument();
        });
    });

    test("all items in list have a corresponding checkbox", () => {
        render(<ToDoList />);
    
        dummyGroceryList.forEach(item => {
            const checkbox = screen.getByTestId(`checkbox-${item.name}`);
            expect(checkbox).toBeInTheDocument();
            expect(checkbox).toHaveAttribute('name', item.name);
        });
    });

    test("displays correct number of checked items", () => {
        render(<ToDoList />);

        expect(screen.getByText("Items bought: 0")).toBeInTheDocument();

        const applesCheckbox = screen.getByTestId('checkbox-Apples');
        const bananasCheckbox = screen.getByTestId('checkbox-Bananas');
        
        fireEvent.click(applesCheckbox);
        expect(screen.getByText("Items bought: 1")).toBeInTheDocument();

        fireEvent.click(bananasCheckbox);
        expect(screen.getByText("Items bought: 2")).toBeInTheDocument();

        fireEvent.click(applesCheckbox);
        expect(screen.getByText("Items bought: 1")).toBeInTheDocument();

        fireEvent.click(bananasCheckbox);
        expect(screen.getByText("Items bought: 0")).toBeInTheDocument();
    }); 
});