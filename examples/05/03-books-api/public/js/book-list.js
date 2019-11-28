const setEditModal = (isbn) => {
    document.getElementById('old_isbn').value = isbn;

    // Get information about the book using isbn
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", `/book/${isbn}`, false);
    xhttp.send();

    const book = JSON.parse(xhttp.responseText);

    const {
        title,
        author,
        publisher,
        publish_date,
        numOfPages
    } = book;

    // Filling information about the book in the form inside the modal
    document.getElementById('isbn').value = isbn;
    document.getElementById('title').value = title;
    document.getElementById('author').value = author;
    document.getElementById('publisher').value = publisher;
    document.getElementById('publish_date').value = publish_date;
    document.getElementById('numOfPages').value = numOfPages;

    // Setting up the action url for the book
    document.getElementById('editForm').action = `/book/${isbn}`;
}

const updateBook = () => {
    const xhttp = new XMLHttpRequest();

    const isbn = document.getElementById('old_isbn').value;

    var data = new FormData();
    data.append('isbn', document.getElementById('isbn').value);
    data.append('title', document.getElementById('title').value);
    data.append('author', document.getElementById('author').value);
    data.append('publisher', document.getElementById('publisher').value);
    data.append('publish_date', document.getElementById('publish_date').value);
    data.append('numOfPages', document.getElementById('numOfPages').value);

    xhttp.open("PUT", `/book/${isbn}`, false);
    xhttp.send(data);

    // Reloading the page
    location.reload();
}

const deleteBook = (isbn) => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("DELETE", `/book/${isbn}`, false);
    xhttp.send();

    // Reloading the page
    location.reload();
}

const loadBooks = () => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", "/books", false);
    xhttp.send();

    const books = JSON.parse(xhttp.responseText);

    for (let book of books) {
        const x = `
            <div class="col-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${book.isbn}</h6>

                        <div>Author: ${book.author}</div>
                        <div>Publisher: ${book.publisher}</div>
                        <div>Number Of Pages: ${book.numOfPages}</div>

                        <hr>

                        <button type="button" class="btn btn-danger" onClick="deleteBook(${book.isbn})">Delete</button>
                        <button types="button" class="btn btn-primary" data-toggle="modal"
                            data-target="#editBookModal" onClick="setEditModal(${book.isbn})">
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        `

        document.getElementById('books').innerHTML = document.getElementById('books').innerHTML + x;
    }
}

loadBooks();

