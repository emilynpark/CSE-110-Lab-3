import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";
import { Label } from "./types";

describe("Create StickyNote", () => {
    //Test case to ensure that the "Create Note" button is being
    //rendered properly in the StickyNotes component
    test("renders create note form", () => {
      render(<StickyNotes />);
   
      const createNoteButton = screen.getByText("Create Note");
      expect(createNoteButton).toBeInTheDocument();
    });
   
    //Test case to ensure that a new note is created properly when the
    //user inputs the title and content and clicks on the "Create Note" button
    test("creates a new note", () => {
      render(<StickyNotes />);

      const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
      const createNoteContentTextarea =
        screen.getByPlaceholderText("Note Content");
      const createNoteButton = screen.getByText("Create Note");
   
      fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
      fireEvent.change(createNoteContentTextarea, {
        target: { value: "Note content" },
      });
      fireEvent.click(createNoteButton);
   
      const newNoteTitle = screen.getByText("New Note");
      const newNoteContent = screen.getByText("Note content");
   
      expect(newNoteTitle).toBeInTheDocument();
      expect(newNoteContent).toBeInTheDocument();
    });

    //This required test verifies that all of the notes that are created are
    //dislayed on the page. This test provides input for the note title and
    //content of 2 notes, and then clicks on the "Create Note" button. It then
    //checks to ensure that both notes have been rendered on the screen.
    test("reads and displays all created notes", () => {
        render(<StickyNotes />);
        
        const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
        const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
        const createNoteButton = screen.getByText("Create Note");
  
        fireEvent.change(createNoteTitleInput, { target: { value: "First Note" } });
        fireEvent.change(createNoteContentTextarea, { target: { value: "First Note Content" } });
        fireEvent.click(createNoteButton);
  
        fireEvent.change(createNoteTitleInput, { target: { value: "Second Note" } });
        fireEvent.change(createNoteContentTextarea, { target: { value: "Second Note Content" } });
        fireEvent.click(createNoteButton);
  
        expect(screen.getByText("First Note")).toBeInTheDocument();
        expect(screen.getByText("First Note Content")).toBeInTheDocument();
        expect(screen.getByText("Second Note")).toBeInTheDocument();
        expect(screen.getByText("Second Note Content")).toBeInTheDocument();
      });
  
      //This required test ensures that the document object value updates properly
      //when the content of a note is changed. This test updates the 'innerHTML' of
      //the note and saves changes accordingly.
      test("document object value updating", () => {
          render(<StickyNotes />);
  
          const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
          const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
          const createNoteButton = screen.getByText("Create Note");
  
          fireEvent.change(createNoteTitleInput, { target: { value: "Title 1" } });
          fireEvent.change(createNoteContentTextarea, { target: { value: "Content 1" } });
          fireEvent.click(createNoteButton);
  
          expect(screen.getByText("Title 1")).toBeInTheDocument();
          expect(screen.getByText("Content 1")).toBeInTheDocument();
  
          const noteTitle = screen.getByText("Title 1");
          const noteContent = screen.getByText("Content 1");
  
          fireEvent.focus(noteTitle);
          fireEvent.change(noteTitle, { target: { innerHTML: "Updated Title 1" } });
          fireEvent.blur(noteTitle);
  
          fireEvent.focus(noteContent);
          fireEvent.change(noteContent, { target: { innerHTML: "Updated Content 1" } });
          fireEvent.blur(noteContent);
  
          expect(screen.getByText("Updated Title 1")).toBeInTheDocument();
          expect(screen.getByText("Updated Content 1")).toBeInTheDocument();
      });
  
      //This required test verifies that a note gets deleted/filtered out when the "x"
      //button is pressed. A note is created for the purpose of testing, and the test uses
      //a specific ID to identify the delete button. The delete button is clicked on, and the
      //test confirms that the note was deleted by ensuring that the content of the deleted note
      //isn't present on the screen.
      test("deletes a note", () => {
          render(<StickyNotes />);
        
          const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
          const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
          const createNoteButton = screen.getByText("Create Note");
        
          fireEvent.change(createNoteTitleInput, { target: { value: "Delete Note" } });
          fireEvent.change(createNoteContentTextarea, { target: { value: "Delete Note Content" } });
          fireEvent.click(createNoteButton);
        
          expect(screen.getByText("Delete Note")).toBeInTheDocument();
        
          const deleteButton = screen.getByTestId("delete-note-7");
          fireEvent.click(deleteButton);
        
          expect(screen.queryByText("Delete Note")).not.toBeInTheDocument();
          expect(screen.queryByText("Delete Note Content")).not.toBeInTheDocument();
      });

      //This edge case test ensures that the title and content submitted to the form match
      //the title and content displayed on the corresponding note by using the variables
      //'noteTitle' and 'noteContent'.
      test("title and content inputted in form match title and content displayed on note", () => {
        render(<StickyNotes />);

        const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
        const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
        const createNoteButton = screen.getByText("Create Note");

        const noteTitle = "Test Note Title";
        const noteContent = "Test Note Content";

        fireEvent.change(createNoteTitleInput, { target: { value: noteTitle } });
        fireEvent.change(createNoteContentTextarea, { target: { value: noteContent } });

        fireEvent.click(createNoteButton);

        expect(screen.getByText(noteTitle)).toBeInTheDocument();
        expect(screen.getByText(noteContent)).toBeInTheDocument();
    });
});   