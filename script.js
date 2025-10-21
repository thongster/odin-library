const myLibrary = [];

const display = document.querySelector(".display");
const newBook = document.querySelector(".newBook");
const formSection = document.querySelector(".formsection");
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
  return console.log(this.info());
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
        display.append(card);
    });
};


newBook.addEventListener("click", function() {
    if (count % 2 === 1) {
        bookForm.classList.add("bookShow")
    };
    
    if (count % 2 === 0) {
        bookForm.classList.remove("bookShow")
    };    
    count++;
});

addBookToLibrary("the war of art", "some guy", "100", "has been read");
addBookToLibrary("All I Do Is Win", "T Pain", "12", "has not been read")
addBookToLibrary("Atomic Habits", "James Clear", "320", "has been read");
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", "310", "has been read");
addBookToLibrary("The Subtle Art of Not Giving a F*ck", "Mark Manson", "224", "has been read");

// displayLibrary(myLibrary)