const form = document.querySelector("#watchlist-form");
const titleInput = document.querySelector("#title");
const typeInput = document.querySelector("#type");
const searchInput = document.querySelector("#search");
const watchlist = document.querySelector("#watchlist");
const filterAllButton = document.querySelector("#filter-all");
const filterWatchButton = document.querySelector("#filter-watch");
const filterWatchedButton = document.querySelector("#filter-watched");
const filterAllTypesButton = document.querySelector("#filter-all-types");
const filterMoviesButton = document.querySelector("#filter-movies");
const filterSeriesButton = document.querySelector("#filter-series");

let items = [];
let currentTypeFilter = "all";
let currentStatusFilter = "all";
let currentSearch = "";

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

filterAllTypesButton.addEventListener("click", function () {
  currentTypeFilter = "all";
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

searchInput.addEventListener("input", function () {
  currentSearch = searchInput.value.trim().toLowerCase();
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

  const visibleItems = items.filter(itemMatchesCurrentView);

  if (visibleItems.length === 0) {
    const emptyMessage = document.createElement("li");
    emptyMessage.className = "empty-message";
    emptyMessage.textContent = items.length === 0
      ? "Sua lista ainda está vazia. Adicione um filme ou série para começar."
      : "Nenhum título encontrado para os filtros selecionados.";
    watchlist.appendChild(emptyMessage);
    return;
  }

  items.forEach(function (savedItem, index) {
    if (itemMatchesCurrentView(savedItem) === false) {
      return;
    }

    if (currentSearch !== "" && savedItem.title.toLowerCase().includes(currentSearch) === false) {
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
    watchedButton.textContent = savedItem.watched === true
      ? "Marcar como quero assistir"
      : "Marcar como assistido";

    watchedButton.addEventListener("click", function () {
      savedItem.watched = !savedItem.watched;
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

    const editButton = document.createElement("button");
    editButton.textContent = "Editar";

    editButton.addEventListener("click", function () {
      const newTitle = prompt("Digite o novo título:", savedItem.title);

      if (newTitle === null) {
        return;
      }

      const trimmedTitle = newTitle.trim();

      if (trimmedTitle === "") {
        alert("Digite um título válido para editar");
        return;
      }

      const newType = prompt("Digite o novo tipo: filme ou serie.", savedItem.type);

      if (newType === null) {
        return;
      }

      const normalizedType = newType.trim().toLowerCase().replace("é", "e");

      if (normalizedType !== "filme" && normalizedType !== "serie") {
        alert("Digite um tipo válido: filme ou serie");
        return;
      }

      savedItem.title = trimmedTitle;
      savedItem.type = normalizedType;
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

    item.appendChild(watchedButton);
    item.appendChild(editButton);
    item.appendChild(removeButton);
    item.appendChild(ratingButton);
    watchlist.appendChild(item);
  });
}

function itemMatchesCurrentView(savedItem) {
  if (currentTypeFilter !== "all" && savedItem.type !== currentTypeFilter) {
    return false;
  }

  if (currentStatusFilter === "watch" && savedItem.watched === true) {
    return false;
  }

  if (currentStatusFilter === "watched" && savedItem.watched === false) {
    return false;
  }

  if (currentSearch !== "" && savedItem.title.toLowerCase().includes(currentSearch) === false) {
    return false;
  }

  return true;
}

function updateFilterButtons() {
  filterAllTypesButton.classList.toggle("active", currentTypeFilter === "all");
  filterMoviesButton.classList.toggle("active", currentTypeFilter === "filme");
  filterSeriesButton.classList.toggle("active", currentTypeFilter === "serie");
  filterAllButton.classList.toggle("active", currentStatusFilter === "all");
  filterWatchButton.classList.toggle("active", currentStatusFilter === "watch");
  filterWatchedButton.classList.toggle("active", currentStatusFilter === "watched");
}

loadItems();
renderItems();
