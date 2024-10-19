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

    //Additional test case to ensure that each item in the grocery list
    //has a checkbox that also corresponds with the appropriate name attribute.
    test("all items in list have a corresponding checkbox", () => {
        render(<ToDoList />);
    
        dummyGroceryList.forEach(item => {
            const checkbox = screen.getByTestId(`checkbox-${item.name}`);
            expect(checkbox).toBeInTheDocument();
            expect(checkbox).toHaveAttribute('name', item.name);
        });
    });

    //Required test for ensuring that the number of checked items from
    //the dummyGroceryList is accurately reflected by the component.
    //Initially, no items are checked and this test confirms that the count
    //is 0 at the start. The test proceeds to check if the displayed count
    //of checked items updates correctly when items are checked/unchecked.
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