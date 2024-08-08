let storedBlogDetails = localStorage.getItem("blogDetails");
let parsedBlogDetails= JSON.parse(storedBlogDetails);
let storedLoginDetails = localStorage.getItem("loginDetails");
let parsedLoginDetails= JSON.parse(storedLoginDetails);

console.log(parsedBlogDetails.users)
// console.log(parsedLoginDetails)
const createCard = (...args)=>{
    console.log(args[5])
    let newCard = document.createElement("div");
  let cardBody = document.createElement("div");
  let cardText = document.createElement("p");
  let cardSubtitle = document.createElement("h6");
  let cardTitle = document.createElement("h5");
  let cardTags = document.createElement("p");
  let deleteBtn = document.createElement("button");
  let likeBtn = document.createElement("button");
  let commentBtn = document.createElement("button");
  let cardBlock1 = document.getElementById("userCards");
  newCard.className = "card mx-5 mt-4 mb-3";
  newCard.style.width = "18rem";

  cardBody.className = "card-body";
  cardTitle.id = "card-title";
  cardTitle.className = "card-title";
  cardTitle.textContent = `${args[1]}`;

  cardSubtitle.className = "card-subtitle mb-2 text-muted";
  cardSubtitle.id = "card-subtitle";
  cardSubtitle.textContent = `${args[2]}`;

  cardText.className = "card-text";
  cardText.id = "card-text";
  cardText.textContent = `${args[3]}`;

  cardTags.className = "card-text";
  cardTags.id = "card-link";
  cardTags.textContent = `${args[0]}`;

  likeBtn.className = "btn btn-sm btn-danger mx-2 myClass";
  likeBtn.id = "likeBlog";
  likeBtn.innerHTML = `&#9829; ${args[4]}`;

  commentBtn.className = "btn btn-sm btn-danger mx-2 ";
  commentBtn.id = "commentBlog";
  commentBtn.textContent = "comment";

  deleteBtn.id = "deleteBlog";
  deleteBtn.className = "btn btn-sm btn-danger mx-1";
  deleteBtn.textContent = "delete";

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardSubtitle);
  cardBody.appendChild(cardText);
  cardBody.appendChild(cardTags);
  cardBody.appendChild(likeBtn);
  cardBody.appendChild(commentBtn);
  cardBody.style.height = "400px";
  newCard.appendChild(cardBody);
  cardBlock1.appendChild(newCard);

}

parsedBlogDetails.users.map((e)=>{
    if(e.name === parsedLoginDetails[0].name){
        // console.log(e)
        createCard(e.name, e.title, e.body, e.tags, e.likes)
    }
})

let userDetails = document.getElementById("userDetails")
let userName = document.createElement("li")
let userEmail = document.createElement("li")
let goBAckLi= document.createElement("li")
let goBAckBtn= document.createElement("button")
userName.className = "list-group-item";
userEmail.className = "list-group-item";
userName.innerHTML = `User Name :- ${parsedLoginDetails[0].name}`
userEmail.innerHTML = `Email :- ${parsedLoginDetails[0].email}`
goBAckBtn.innerHTML = "Go Back"
goBAckBtn.className = "btn btn-dark"
goBAckBtn.style.marginLeft = "30%"
goBAckLi.style.listStyle ="none"

goBAckBtn.addEventListener("click",function(){
    window.location.href ="/user.html" 


})
userDetails.appendChild(userName)
userDetails.appendChild(userEmail)
goBAckLi.appendChild(goBAckBtn)
userDetails.appendChild(goBAckLi)

