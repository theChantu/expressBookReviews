async function fetchBooks() {
    return fetch("http://localhost:5000").then((resp) => resp.json());
}

async function fetchBookDetails(isbn) {
    return fetch(`http://localhost:5000/isbn/${isbn}`).then((resp) =>
        resp.json()
    );
}

async function fetchBookDetails(author) {
    return fetch(`http://localhost:5000/author/${author}`).then((resp) =>
        resp.json()
    );
}

async function fetchBookDetails(title) {
    return fetch(`http://localhost:5000/title/${title}`).then((resp) =>
        resp.json()
    );
}

(async () => {
    const books = await fetchBooks();

    console.log(books);
})();
