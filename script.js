const form = document.querySelector("#watchlist-form");
const titleInput = document.querySelector("#title");
const typeInput = document.querySelector("#type");
const watchlist = document.querySelector("#watchlist");
const filterAllButton = document.querySelector("#filter-all");
const filterWatchButton = document.querySelector("#filter-watch");
const filterWatchedButton = document.querySelector("#filter-watched");
const filterMoviesButton = document.querySelector("#filter-movies");
const filterSeriesButton = document.querySelector("#filter-series");

let items = [];
let currentTypeFilter = "filme";
let currentStatusFilter = "all";

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = titleInput.value.trim();
  const type = typeInput.value;

  if (title === "") {
    alert("Digite um título para adicionar");
    return;
  }

  const newItem = {
    title: title,
    type: type,
    watched: false,
    rating: "sem nota"
  };

  items.push(newItem);
  saveItems();
  renderItems();

  titleInput.value = "";
  titleInput.focus();
});

filterAllButton.addEventListener("click", function () {
  currentStatusFilter = "all";
  renderItems();
});

filterWatchButton.addEventListener("click", function () {
  currentStatusFilter = "watch";
  renderItems();
});

filterWatchedButton.addEventListener("click", function () {
  currentStatusFilter = "watched";
  renderItems();
});

filterMoviesButton.addEventListener("click", function () {
  currentTypeFilter = "filme";
  renderItems();
});

filterSeriesButton.addEventListener("click", function () {
  currentTypeFilter = "serie";
  renderItems();
});

function saveItems() {
  localStorage.setItem("watchlist", JSON.stringify(items));
}

function loadItems() {
  const savedItems = localStorage.getItem("watchlist");

  if (savedItems !== null) {
    items = JSON.parse(savedItems);
  }
}

function renderItems() {
  watchlist.innerHTML = "";
  updateFilterButtons();

  items.forEach(function (savedItem, index) {
    if (savedItem.type !== currentTypeFilter) {
      return;
    }

    if (currentStatusFilter === "watch" && savedItem.watched === true) {
      return;
    }

    if (currentStatusFilter === "watched" && savedItem.watched === false) {
      return;
    }

    const item = document.createElement("li");
    item.dataset.watched = savedItem.watched;

    const itemText = document.createElement("span");
    let itemDescription = `${savedItem.title} - ${savedItem.type}`;

    if (savedItem.watched === true) {
      itemDescription = `${itemDescription} - assistido`;
    }

    if (savedItem.rating !== "sem nota") {
      itemDescription = `${itemDescription} - nota: ${savedItem.rating}`;
    }

    itemText.textContent = `${itemDescription} `;

    const watchedButton = document.createElement("button");
    watchedButton.textContent = "Marcar como assistido";

    watchedButton.addEventListener("click", function () {
      savedItem.watched = true;
      saveItems();
      renderItems();
    });

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remover";

    removeButton.addEventListener("click", function () {
      items.splice(index, 1);
      saveItems();
      renderItems();
    });

    const ratingButton = document.createElement("button");
    ratingButton.textContent = "Dar nota";

    ratingButton.addEventListener("click", function () {
      const newRating = prompt("Digite uma nota válida entre 0 e 10.");
      const ratingNumber = Number(newRating);

      if (newRating === null || newRating === "" || ratingNumber < 0 || ratingNumber > 10 || Number.isNaN(ratingNumber)) {
        alert("Digite uma nota válida entre 0 e 10");
        return;
      }

      savedItem.rating = ratingNumber;
      saveItems();
      renderItems();
    });

    item.appendChild(itemText);

    if (savedItem.watched === false) {
      item.appendChild(watchedButton);
    }

    item.appendChild(removeButton);
    item.appendChild(ratingButton);
    watchlist.appendChild(item);
  });
}

function updateFilterButtons() {
  filterMoviesButton.classList.toggle("active", currentTypeFilter === "filme");
  filterSeriesButton.classList.toggle("active", currentTypeFilter === "serie");
  filterAllButton.classList.toggle("active", currentStatusFilter === "all");
  filterWatchButton.classList.toggle("active", currentStatusFilter === "watch");
  filterWatchedButton.classList.toggle("active", currentStatusFilter === "watched");
}

loadItems();
renderItems();
