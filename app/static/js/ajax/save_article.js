function sendArticleToServer(req_url, articleTitle, articleUrl, parentCollection) {
  const url = req_url;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ article_title: articleTitle, article_url: articleUrl, parent_collection: parentCollection }),
  };
  fetch(url, options)
    .then((response) => response.json())
    .then((responseData) => {
      if (responseData.success) {
        displayMessage(responseData.success, "success");
      } else {
        displayMessage(responseData.error, "error");
      }
    })
    .catch((error) => {
      displayMessage(error, "error");
    });
}

function saveArticleInReadLater() {
  const ReadLaterCollectionBtns = document.querySelectorAll(".read_later_collection");
  const tdContainingTitle = document.querySelectorAll(".td2");
  const aContainingUrl = document.querySelectorAll(".news_urls_a_tag");

  ReadLaterCollectionBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      var articleTitle = tdContainingTitle[index].textContent;
      var articleUrl = aContainingUrl[index].getAttribute("href");
      sendArticleToServer("/add_to_read_later", articleTitle, articleUrl, "Read Later");
    });
  });
}

// ------------ for saving article in different playlists, add_to_different_collections ----- //

function saveArticleInOtherCollections() {
  const ReadLaterCollectionBtns = document.querySelectorAll(".other_collections");
  const collectionsNameInputs = document.querySelectorAll(".collections_name_input");
  const tdContainingTitle = document.querySelectorAll(".td2");
  const aContainingUrl = document.querySelectorAll(".news_urls_a_tag");

  ReadLaterCollectionBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      var articleTitle = tdContainingTitle[index].textContent;
      var articleUrl = aContainingUrl[index].getAttribute("href");

      if (collectionsNameInputs.length === 0) {
        displayMessage("Please log in first to save articles", "error");
        return;
      }
      var collectionsInput = collectionsNameInputs[index];
      collectionsInput.style.display = "flex";
      // now wait for the option to be selected
      collectionsInput.addEventListener("change", () => {
        var parentCollection = collectionsInput.value;
        sendArticleToServer("/add_to_different_collections", articleTitle, articleUrl, parentCollection);
        collectionsInput.style.display = "none";
      });
    });
  });
}

saveArticleInReadLater();
saveArticleInOtherCollections();
