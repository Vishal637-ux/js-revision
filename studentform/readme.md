# Student Registration Form

A simple student registration project built with HTML, CSS, and JavaScript.

## Features

- Add student details
- Show students in a table
- Delete student records
- Search students by name or email
- Count total students
- Save data in `localStorage`

## Files

- `index.html` - creates the form and table structure
- `style.css` - styles the page, form, buttons, and table
- `script.js` - handles form submit, student data, search, delete, and storage

## First Principles Idea

The project is built from 4 basic steps:

1. Get data from input fields.
2. Store the data in an array.
3. Show the data on the screen.
4. Update the screen when data changes.

## How It Works

When the user fills the form and clicks **Register Student**, JavaScript stops the page from reloading. Then it reads the name, email, and phone number from the inputs.

The app creates a student object like this:

```js
{
  id: Date.now(),
  name: "Student Name",
  email: "student@email.com",
  phone: "1234567890"
}
```

That object is added to the `students` array. After that, the table is refreshed and the new student appears on the screen.

## JavaScript Concepts Used

- `querySelector`
- `addEventListener`
- `preventDefault`
- Arrays
- Objects
- Functions
- `forEach`
- `filter`
- DOM manipulation
- `localStorage`
- `JSON.stringify`
- `JSON.parse`

## How To Run

Open `index.html` in the browser.

Then you can:

1. Enter student name, email, and phone number.
2. Click **Register Student**.
3. Search students using the search box.
4. Delete a student using the **Delete** button.

## Learning Goal

This project helps you understand how form data moves through a JavaScript app:

Input -> Data -> Display -> Update
