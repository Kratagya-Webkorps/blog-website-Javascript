let profile = () => {
  window.location.href = "/profile.html";
};

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

searchInput.addEventListener(
  "keyup",
  debounce(() => {
    if (searchInput !== "") {
      while (cardBlock1.firstChild) {
        cardBlock1.removeChild(cardBlock1.firstChild);
      }
      let storedData = localStorage.getItem("blogDetails");
      let parsedData = JSON.parse(storedData);
      const searchTerm = searchInput.value.toLowerCase();
      const matchingUsers = parsedData.users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm)
      );
      matchingUsers.map((e) => {
        createCard(e.name, e.title, e.body, e.tags, e.likes);
      });
    }
  }, 300)
);

signOut.addEventListener("click", () => {
  localStorage.removeItem("loginDetails");
  window.location.href = "index.html";
});
const createCard = (name, title, body, tags, likes, key) => {
  let newCard = document.createElement("div");
  let cardBody = document.createElement("div");
  let cardText = document.createElement("p");
  let cardSubtitle = document.createElement("h6");
  let cardTitle = document.createElement("h5");
  let cardTags = document.createElement("p");
  let likeBtn = document.createElement("button");
  let commentBtn = document.createElement("button");
  let cardBlock1 = document.getElementById("cardBlock1");
  // let deleteBtn = document.getElementById("deleteBlog");
  // Create delete button element
  const deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("type", "button");
  deleteBtn.setAttribute("id", "deleteBlog");
  deleteBtn.classList.add("btn", "btn-sm", "btn-danger");

  deleteBtn.textContent = "Delete";

  newCard.className = "card mx-5 mt-4 mb-3";
  newCard.style.width = "18rem";
  newCard.id = `element-${key}`;

  cardBody.className = "card-body";
  cardTitle.id = "card-title";
  cardTitle.className = "card-title";
  cardTitle.textContent = `${title}`;

  cardSubtitle.className = "card-subtitle mb-2 text-muted";
  cardSubtitle.id = "card-subtitle";
  cardSubtitle.textContent = `${body}`;

  cardText.className = "card-text";
  cardText.id = "card-text";
  cardText.textContent = `${tags}`;

  cardTags.className = "card-text";
  cardTags.id = "card-link";
  cardTags.textContent = `${name}`;

  likeBtn.className = "btn btn-sm btn-danger mx-2 myClass";
  likeBtn.id = "likeBlog";
  likeBtn.innerHTML = `&#9829; ${likes}`;
  likeBtn.addEventListener("click", () => {
    let storedData = localStorage.getItem("blogDetails");
    let parsedData = JSON.parse(storedData);
    parsedData.users[key].likes++;
    let updatedData = JSON.stringify(parsedData);
    localStorage.setItem("blogDetails", updatedData);
    likeBtn.innerHTML = `&#9829; ${parsedData.users[key].likes}`;
  });

  const cloneCard = (originalCard) => {
    let clonedCard = originalCard.cloneNode(true);
    return clonedCard;
  };

  commentBtn.className = "btn btn-sm btn-danger mx-2 ";
  commentBtn.id = "commentBlog";
  commentBtn.textContent = "comment";
  commentBtn.addEventListener("click", function () {
    let parentCard = this.parentNode.parentNode;
    let clonedCard = cloneCard(parentCard);
    let commentSection = document.createElement("div");
    let commentArea = document.createElement("div");
    let commentInput = document.createElement("textarea");
    let submitCommentBtn = document.createElement("button");
    let closeCommentBtn = document.createElement("button");
    commentArea.id = "commentArea";
    commentArea.style.display = "flex";
    commentSection.id = "commentSection";
    commentSection.className = "comment-section input-group mt-3";

    commentInput.className = "comment-input";
    commentSection.style.height = "50px";
    commentSection.style.display = "flex";
    commentInput.placeholder = "Write your comment here...";

    submitCommentBtn.className = "btn btn-primary submit-comment-btn";
    submitCommentBtn.textContent = "Submit";
    closeCommentBtn.className = "btn btn-dark submit-comment-btn";
    closeCommentBtn.textContent = "Close";

    submitCommentBtn.addEventListener("click", function () {
      let commentText = commentInput.value;
      let storedData = localStorage.getItem("blogDetails");
      let parsedData = JSON.parse(storedData);
      let parsedLogin = JSON.parse(localStorage.getItem("loginDetails"));
      let newComment = null;
      console.log("first");
      if (commentText !== "") {
        console.log("second");
        newComment = {
          viewerName: parsedLogin[0].name,
          comments: [commentText],
        };
        parsedData.users[key].comment.push(newComment);
      }

      let updatedData = JSON.stringify(parsedData);
      localStorage.setItem("blogDetails", updatedData);
      commentInput.value = "";
      while (commentContent.firstChild) {
        commentContent.removeChild(commentContent.firstChild);
      }
      parsedData.users[key].comment.forEach((comment) => {
        let singleComment = document.createElement("div");
        singleComment.id = "oldComments";
        if (commentText !== "") {
          singleComment.innerHTML = `Name:- ${comment.viewerName} and Comment:- ${comment.comments}`;
          commentContent.appendChild(singleComment);
        } else {
          console.log("third");
          commentContent.innerHTML = "Invalid Comment Detected";
          setTimeout(() => {
            commentContent.innerHTML = "";
            parsedData.users[key].comment.forEach((comment) => {
              let singleComment = document.createElement("div");
              singleComment.id = "oldComments";
              singleComment.innerHTML = `Name:- ${comment.viewerName} and Comment:- ${comment.comments}`;
              commentContent.appendChild(singleComment);
            });
          }, 2000);
        }
      });
    });

    closeCommentBtn.addEventListener("click", function () {
      commentArea.remove();
      cardBlock1.style.display = "flex";
    });
    commentSection.appendChild(commentInput);
    commentSection.appendChild(submitCommentBtn);
    commentSection.appendChild(closeCommentBtn);

    let storedData = localStorage.getItem("blogDetails");
    let parsedData = JSON.parse(storedData);
    let comments = parsedData.users[key].comment;
    let commentsDiv = document.createElement("div");
    let commentHeading = document.createElement("h2");
    commentHeading.innerHTML = "Comments";
    let commentContent = document.createElement("div");
    commentContent.id = "commentContent";
    commentContent.className = "my-3";

    comments.forEach((comment) => {
      let singleComment = document.createElement("div");
      singleComment.id = "oldComments";
      singleComment.innerHTML = `Name:- ${comment.viewerName} and Comment:- ${comment.comments}`;
      commentContent.appendChild(singleComment);
    });

    commentArea.appendChild(clonedCard);
    commentsDiv.appendChild(commentHeading);
    commentsDiv.appendChild(commentSection);
    commentsDiv.appendChild(commentContent);
    commentArea.appendChild(commentsDiv);

    landingPage.append(commentArea);
    cardBlock1.style.display = "none";
  });

  deleteBtn.addEventListener("click", function () {
    let deleteCard = this.closest("div.card");

    let storedData = localStorage.getItem("blogDetails");
    let parsedData = JSON.parse(storedData);
    let myModal = document.createElement("div");
    let myModalMainHeading = document.createElement("h1");
    let myModalInput = document.createElement("input");
    let myModalConfirmBtn = document.createElement("button");
    let myModalCloseBtn = document.createElement("button");
    let myModalHeading = document.createElement("span");
    let cardBlock = document.getElementById("cardBlock");
    myModal.id = "myModal"
    myModalInput.className = "form-control my-2";
    myModalInput.id = "myModalInput"
    myModalInput.style.width = "45%";
    myModalMainHeading.textContent = `Delete The Card "${parsedData.users[key].title}"`
    myModalHeading.textContent = `Type "${parsedData.users[key].title}" to delete your card`;
    myModalCloseBtn.textContent = "Close";
    myModalCloseBtn.className = "btn btn-dark mx-2";
    myModalConfirmBtn.textContent = "Confirm";
    myModalConfirmBtn.className = "btn btn-primary";
    myModalConfirmBtn.setAttribute("disabled", "true");

    myModal.appendChild(myModalMainHeading);
    myModal.appendChild(myModalHeading);
    myModal.appendChild(myModalInput);
    myModal.appendChild(myModalConfirmBtn);
    myModal.appendChild(myModalCloseBtn);
    cardBlock.appendChild(myModal);
    cardBlock1.style.display = "none";
    myModalInput.addEventListener("keyup", function () {
      console.log(myModalInput.value);
      console.log(parsedData.users[key].title);
      if (myModalInput.value != "") {
        if (myModalInput.value === parsedData.users[key].title) {
          myModalConfirmBtn.removeAttribute("disabled");
        } else {
          myModalConfirmBtn.setAttribute("disabled", "true");
        }
      }
    });

    myModalConfirmBtn.addEventListener("click", function () {
      cardBlock.removeChild(myModal);
      cardBlock1.style.display = "flex";
      let storedData = localStorage.getItem("blogDetails");
      let parsedData = JSON.parse(storedData);
      let cardIndex = Array.from(deleteCard.parentElement.children).indexOf(
        deleteCard
      );
      parsedData.users.splice(cardIndex, 1);
      localStorage.setItem("blogDetails", JSON.stringify(parsedData));
      deleteCard.style.display = "none";
    });

    
    myModalCloseBtn.addEventListener("click",function(){
      myModalInput.value = ""
      myModal.style.display = "none"
    cardBlock1.style.display = "flex";


    })
  });

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardSubtitle);
  cardBody.appendChild(cardText);
  cardBody.appendChild(cardTags);
  cardBody.appendChild(likeBtn);
  cardBody.appendChild(commentBtn);
  cardBody.style.height = "400px";

  let storedLoginDetails = localStorage.getItem("loginDetails");
  let parsedLoginDetails = JSON.parse(storedLoginDetails);

  if (name === parsedLoginDetails[0].name) {
    cardBody.appendChild(deleteBtn);
  }

  newCard.appendChild(cardBody);
  cardBlock1.appendChild(newCard);
};

const addBlogFromJson = async () => {
  let userBlogs = await fetch("./blogDetails.json");
  let response = await userBlogs.json();
  let dataExists = localStorage.getItem("blogDetails") !== null;

  if (!dataExists) {
    let blogDetails = response;
    let jsonData = JSON.stringify(blogDetails);
    localStorage.setItem("blogDetails", jsonData);
  }

  let storedData = localStorage.getItem("blogDetails");
  const parsedData = JSON.parse(storedData);
  let storedInJson = parsedData.users;
  let key = 0;

  storedInJson.forEach((e) => {
    createCard(e.name, e.title, e.body, e.tags, e.likes, key);
    key++;
  });
};

addBlogFromJson();

document.getElementById("addYourBlog").addEventListener("click", function () {
  let updatedData = localStorage.getItem("loginDetails");
  const parsedData = JSON.parse(updatedData);
  publisherName.value = `${parsedData[0].name}`;
  exploreBlock.style.display = "none";
  cardBlock.style.display = "none";
  addNewBlog.style.display = "block";
  if (document.getElementById("commentArea")) {
    commentArea.style.display = "none";
  }
});

cancelBlogSubmit.addEventListener("click", function () {
  document.getElementById("publisherTitle").value = "";
  document.getElementById("publisherBody").value = "";
  document.getElementById("publisherTags").value = "";
  exploreBlock.style.display = "block";
  addNewBlog.style.display = "none";
  cardBlock.style.display = "block";
  if (document.getElementById("commentArea")) {
    commentArea.style.display = "flex";
  }
});

confirmBlogSubmit.addEventListener("click", function () {
  let pName = document.getElementById("publisherName").value;
  let pTitle = document.getElementById("publisherTitle").value;
  let pBody = document.getElementById("publisherBody").value;
  let pTags = document.getElementById("publisherTags").value;
  let getData = null;
  if (pName !== "" && pTitle !== "" && pBody !== "" && pTags !== "") {
    getData = {
      name: pName,
      title: pTitle,
      body: pBody,
      tags: pTags,
      likes: 0,
      comment: [],
    };
  } else {
    errorInAddNewBlog.innerHTML = "Please fill in the details properly";
    setTimeout(() => {
      errorInAddNewBlog.innerHTML = "";
    }, 2000);
    return;
  }

  let updatedData = localStorage.getItem("blogDetails");
  const parsedData = JSON.parse(updatedData);
  let storedInJson = parsedData.users;
  storedInJson.push(getData);
  localStorage.setItem("blogDetails", JSON.stringify(parsedData));
  document.getElementById("publisherName").value = "";
  document.getElementById("publisherTitle").value = "";
  document.getElementById("publisherBody").value = "";
  document.getElementById("publisherTags").value = "";
  exploreBlock.style.display = "block";
  addNewBlog.style.display = "none";
  cardBlock.style.display = "flex";

  let parentElement = document.getElementById("cardBlock1");
  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.firstChild);
  }

  let key = 0;
  storedInJson.forEach((e) => {
    createCard(e.name, e.title, e.body, e.tags, e.likes, key);
    key++;
  });
});
