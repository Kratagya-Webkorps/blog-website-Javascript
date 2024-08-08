let submitLoginPage = document.getElementById("submitLoginPage");
let signinPage = document.getElementById("signinPage");
let loginPage = document.getElementById("loginPage");
let landingPage = document.getElementById("landingPage");
let exploreBlock = document.getElementById("exploreBlock");
let exampleInputEmail1 = document.getElementById("exampleInputEmail1");
let exampleInputPassword1 = document.getElementById("exampleInputPassword1");
let signinPageBlock = document.getElementById("signinPageBlock");
let cancelSignin = document.getElementById("cancelSignin");
let confirmSignin = document.getElementById("confirmSignin");
let clearLocalData = document.getElementById("clearLocalData");

exampleInputEmail1.addEventListener("keyup", function () {
  if (exampleInputEmail1.value === "") {
    exampleInputEmail1.classList.add("is-invalid");
  } else {
    exampleInputEmail1.classList.remove("is-invalid");
  }
});
exampleInputPassword1.addEventListener("keyup", function () {
  if (exampleInputEmail1.value === "") {
    exampleInputPassword1.classList.add("is-invalid");
  } else {
    exampleInputPassword1.classList.remove("is-invalid");
  }
});
newUserName.addEventListener("keyup", function () {
  if (newUserName.value === "") {
    newUserName.classList.add("is-invalid");
  } else {
    newUserName.classList.remove("is-invalid");
  }
});
newUserEmailId.addEventListener("keyup", function () {
  if (newUserEmailId.value === "") {
    newUserEmailId.classList.add("is-invalid");
  } else {
    newUserEmailId.classList.remove("is-invalid");
  }
});
newUserPassword1.addEventListener("keyup", function () {
  if (newUserPassword1.value === "") {
    newUserPassword1.classList.add("is-invalid");
  } else {
    newUserPassword1.classList.remove("is-invalid");
  }
});
clearLocalData.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

window.onload = async function () {
  let myData = await fetch("./data.json");
  let response = await myData.json();
  let dataExists = localStorage.getItem("addLoginDetails") !== null;
  
  console.log("myData" , response)

  if (!dataExists) {
    let blogDetails = response;
    let jsonData = JSON.stringify(blogDetails);
    localStorage.setItem("addLoginDetails", jsonData);
  }
};
confirmSignin.addEventListener("click", function () {
  let newUserEmailId = document.getElementById("newUserEmailId");
  let newUserPassword1 = document.getElementById("newUserPassword1");
  let newUserName = document.getElementById("newUserName");
  
  if (
    newUserEmailId.value !== "" &&
    newUserPassword1.value !== "" &&
    newUserName.value !== ""
  ) {
    let storedData = localStorage.getItem("addLoginDetails");

    const parsedData = JSON.parse(storedData);
    let storedInJson = parsedData;

    let newUser = {
      email: `${newUserEmailId.value}`,
      password: `${newUserPassword1.value}`,
      name: `${newUserName.value}`,
    };
    storedInJson[0].otherUsers.push(newUser);
    localStorage.setItem("addLoginDetails", JSON.stringify(parsedData));

    loginPage.style.display = "block";
    signinPageBlock.style.display = "none";
    document.getElementById("newUserEmailId").value = "";
    document.getElementById("newUserPassword1").value = "";
    document.getElementById("newUserName").value = "";
  } else {
    let signinDetails = document.getElementById("signinDetails");
    let errorMsg = document.createElement("p");

    errorMsg.innerHTML = "Please Enter Valid Details";
    signinDetails.appendChild(errorMsg);
    newUserName.classList.add("is-invalid");
    newUserEmailId.classList.add("is-invalid");
    newUserPassword1.classList.add("is-invalid");

    setTimeout(() => {
      errorMsg.innerHTML = "";
      signinDetails.appendChild(errorMsg);
    }, 2000);
  }
});
if (submitLoginPage) {
  submitLoginPage.addEventListener("click", async function () {
    let result = await checkIfAdmin();

    if (result === 1) {
      window.location.href = "user.html";
    } else {
      exampleInputEmail1.classList.add("is-invalid")
      exampleInputPassword1.classList.add("is-invalid")

    }
  });
}

const checkIfAdmin = async () => {
  let storedData = localStorage.getItem("addLoginDetails");
  const parsedData = JSON.parse(storedData);
  return check(parsedData);
};

const check = (storedInJson) => {
  let inputEmail = exampleInputEmail1.value;
  let inputPass = exampleInputPassword1.value;
  let dataExists = localStorage.getItem("loginDetails") !== null;
  if (!dataExists) {
    localStorage.setItem("loginDetails", JSON.stringify([]));
  }
  let flag = 0;
  var otherUsers = storedInJson[0]["otherUsers"];
  for (var j = 0; j < otherUsers.length; j++) {
    var user = otherUsers[j];

    if (user.email === inputEmail && user.password === inputPass) {
      let defaultLoginDetails = [{ name: user.name, email: user.email }];
      let jsonData = JSON.stringify(defaultLoginDetails);
      localStorage.setItem("loginDetails", jsonData);
      flag = 1;
      return flag;
    } else {
      validationText.innerHTML = "EmailId or password is not valid";
      setTimeout(() => {
        validationText.innerHTML = "";
      }, 2000);
    }
  }
};

signinPage.addEventListener("click", function () {
  loginPage.style.display = "none";
  signinPageBlock.style.display = "block";
});
cancelSignin.addEventListener("click", function () {
  loginPage.style.display = "block";
  signinPageBlock.style.display = "none";
});
