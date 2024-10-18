import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";
import { Label } from "./types";

describe("Create StickyNote", () => {
    test("renders create note form", () => {
      render(<StickyNotes />);
   
      const createNoteButton = screen.getByText("Create Note");
      expect(createNoteButton).toBeInTheDocument();
    });
   
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

      test("form submission creates a note with correct title, content, and label", () => {
        render(<StickyNotes />);

        const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
        const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
        const createNoteButton = screen.getByText("Create Note");

        const noteTitle = "Test Note Title";
        const noteContent = "Test Note Content.";

        fireEvent.change(createNoteTitleInput, { target: { value: noteTitle } });
        fireEvent.change(createNoteContentTextarea, { target: { value: noteContent } });

        fireEvent.click(createNoteButton);

        expect(screen.getByText(noteTitle)).toBeInTheDocument();
        expect(screen.getByText(noteContent)).toBeInTheDocument();
 
    });
});   