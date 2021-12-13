let booksArray = [];

if (localStorage.getItem("books") !== null)
  booksArray = JSON.parse(localStorage.getItem("books"));

const addBookToTable = (book) => {
  const row = document.createElement("tr");
  document.querySelector(".table").appendChild(row);

  let keys = ["id", ...Object.keys(book)];

  keys.forEach((item) => {
    const td = document.createElement("td");
    if (item === "id")
      td.textContent = booksArray.findIndex((item) => item === book) + 1;
    else td.textContent = book[item];
    row.appendChild(td);
  });
};

booksArray.forEach((item) => {
  addBookToTable(item);
});

const addBook = () => {
  let bookState = {
    name: "",
    author: "",
    priority: 3,
    category: "",
  };

  let initialtate = { ...bookState };

  let inputs = [...document.querySelectorAll(".row input")];
  inputs = [...inputs, document.querySelector(".row select")];

  const formButton = document.querySelector(".btn");

  inputs.forEach((item) => {
    item.addEventListener("change", (e) => {
      let value = e.target.value;
      let name = e.target.name;
      if (name === "priority") {
        document.querySelector(".range-value").textContent = e.target.value;
      }

      let bookStateCopy = { ...bookState };

      bookStateCopy = { ...bookStateCopy, [name]: value };

      bookState = { ...bookStateCopy };
    });
  });

  const validation = (bookState) => {
    let name, author, priority, category, success;

    if (bookState.name.length >= 1) name = false;
    else name = true;

    if (bookState.author.length >= 3) author = false;
    else author = true;

    if (bookState.priority >= 1 && bookState.priority <= 5) priority = false;
    else priority = true;

    if (bookState.category.length > 0) category = false;
    else category = true;

    if (name || author || priority || category)
      return { name, author, priority, category, success: false };
    else return { name, author, priority, category, success: true };
  };

  const init = (e) => {
    e.preventDefault();

    const results = validation(bookState);

    if (results.success) {
      const data = [...document.querySelectorAll(`.validation-result`)];

      data.forEach((item) => {
        item.style.opacity = 0;
      });

      inputs.forEach((item, id) => {
        item.value = initialtate[item.name];
      });

      booksArray = [...booksArray, bookState];

      localStorage.setItem("books", JSON.stringify(booksArray));

      addBookToTable(bookState);

      bookState = initialtate;
    } else {
      let info = [];
      let keys = Object.keys(results);
      keys.pop();

      for (let i = 0; i < keys.length; i++) {
        if (results[keys[i]]) {
          info = [...info, i];
        }
      }

      [...document.querySelectorAll(`.validation-result`)].forEach((item) => {
        item.style.opacity = 0;
      });

      info.forEach((item) => {
        let k = (document.querySelector(
          `.row:nth-of-type(${item + 1}) .validation-result`
        ).style.opacity = 1);
      });
    }
  };

  formButton.addEventListener("click", init);
};

addBook();
