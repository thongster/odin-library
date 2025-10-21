const myLibrary = [];

const display = document.querySelector(".display");


// book object constructor
function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
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

addBookToLibrary("the war of art", "some guy", "100", "has been read");
addBookToLibrary("All I Do Is Win", "T Pain", "12", "has not been read")

// displayLibrary(myLibrary)