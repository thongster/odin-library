const myLibrary = [];

const display = document.querySelector(".display");
const newBook = document.querySelector(".newBook");
const bookForm = document.querySelector(".bookForm");

let count = 2;

// book object constructor
function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.Title = title;
  this.Author = author;
  this.Pages = pages;
  this.Read = read;
  this.id = crypto.randomUUID();
  this.info = function() {
    return `${title} by ${author}, ${pages} pages, ${read}`;
  };
  return;
};

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
};

function displayLibrary(myLibrary) {
    // loop through library array
    myLibrary.forEach(function(item) {
        const card = document.createElement("div");
        card.classList.add("card");

        // loop through each key value pair and display if not id or info statement
        for (let prop in item) {
            if (prop != "id" && prop != "info") {
                const bookProp = document.createElement("p");
                card.append(bookProp);
                bookProp.textContent = `${prop}: ${item[prop]}`;
            };
        };
        const removeBook = document.createElement("button");
        removeBook.classList.add("removeBook");
        card.append(removeBook);
        removeBook.textContent = "Remove Book";
        display.append(card);
    });
};

// add new book to the display
function displayNewBook() {
    const card = document.createElement("div");
    card.classList.add("card");
    // last item in the myLibrary array
    let newItem = myLibrary[myLibrary.length - 1];
    for (let prop in newItem) {
            if (prop != "id" && prop != "info") {
                const bookProp = document.createElement("p");
                card.append(bookProp);
                bookProp.textContent = `${prop}: ${newItem[prop]}`;
            };
        };
    display.append(card);
};

// show / hide form on click
newBook.addEventListener("click", function() {
    if (count % 2 === 1) {
        bookForm.classList.add("bookShow")
    };
    
    if (count % 2 === 0) {
        bookForm.classList.remove("bookShow")
    };    
    count++;
});


bookForm.addEventListener("submit", function(e) {
    let title;
    let author;
    let pages;
    let read;
    e.preventDefault();
    const formData = new FormData(bookForm);
    for (const [key, value] of formData) {
        if (key === "title") {
            title = value;
        } else if (key === "author") {
            author = value;
        } else if (key === "pages") {
            pages = value;
        } else if (key === "read") {
            read = value;
        }
    };
    addBookToLibrary(title, author, pages, read);
    displayNewBook();
});



addBookToLibrary("the war of art", "some guy", "100", "read");
addBookToLibrary("All I Do Is Win", "T Pain", "12", "not read")
addBookToLibrary("Atomic Habits", "James Clear", "320", "read");
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", "310", "not read");
addBookToLibrary("The Subtle Art of Not Giving a F*ck", "Mark Manson", "224", "not read");

displayLibrary(myLibrary)