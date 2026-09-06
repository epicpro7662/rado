function searchRado() {
    let searchText = document.getElementById("searchBox").value;

    if (searchText === "") {
        alert("Type something to search!");
        return;
    }

    let url = "https://www.google.com/search?q=" + encodeURIComponent(searchText);

    window.open(url, "_blank");
}