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

// function displayLibrary(myLibrary) {
//     // loop through library array
//     myLibrary.forEach(function(item) {

//         // loop through each key value pair and display if not id or info statement
//         for (let prop in item) {
//             if (prop != "id" && prop != "info") {
//                 const bookProp = document.createElement("p");
//                 card.append(bookProp);
//                 bookProp.textContent = `${prop}: ${item[prop]}`;
//             };
//         };
//         const removeBook = document.createElement("button");
//         removeBook.classList.add("removeBook");
//         card.append(removeBook);
//         removeBook.textContent = "Remove Book";
//         display.append(card);
//     });
// };

// add new book to the display
function displayNewBook() {
    const card = document.createElement("div");
    card.classList.add("card");
    // last item in the myLibrary array
    let newItem = myLibrary[myLibrary.length - 1];
    // loop through all keys in new book
    for (let prop in newItem) {
            if (prop != "id" && prop != "info") {
                const bookProp = document.createElement("p");
                bookProp.textContent = `${prop}: ${newItem[prop]}`;
                card.append(bookProp);

                if (prop === "Read") {
                bookProp.textContent = `Read Status: ${newItem[prop]}`;
                card.append(bookProp);
                }
            };
        };
    // set html data-id attribute to reference on remove
    card.setAttribute("data-id", newItem.id); 

    // display read button
    const readButton = document.createElement("button");
    readButton.textContent = "Read Status";
    readButton.classList.add("readButton");
    
    // display remove button
    const removeBook = document.createElement("button");
    removeBook.textContent = "Remove Book";
    removeBook.classList.add("removeBook");

    display.append(card);
    card.append(readButton);
    card.append(removeBook);

    readButton.addEventListener("click", function() {
        // select the appropriate "card" div
        let parent = readButton.parentElement;

        // find index of matching id's
        let index = myLibrary.findIndex(function(book) {
            return book.id === parent.dataset.id;
        });

        // find index of read key/value according to matching id
        // change to Not Read / Read by find the correct p tag in the DOM
        if (myLibrary[index].Read === "Read") {
            myLibrary[index].Read = "Not Read";
            parent.querySelectorAll("p")[3].textContent = `Read Status: ${myLibrary[index].Read}`;
        } else {
            myLibrary[index].Read = "Read";
            parent.querySelectorAll("p")[3].textContent = `Read Status: ${myLibrary[index].Read}`
        };
    });

    removeBook.addEventListener("click", function() {
        // select the appropriate "card" div
        let parent = removeBook.parentElement;

        // find index of matching id's
        let index = myLibrary.findIndex(function(book) {
            return book.id === parent.dataset.id;
        });

        // remove according to index
        myLibrary.splice(index, 1);

        // remove card from DOM
        parent.remove();
    });


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

// add book form listener
bookForm.addEventListener("submit", function(e) {
    let title;
    let author;
    let pages;
    let read;
    e.preventDefault();
    // grab form data and loop through to get book info
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

