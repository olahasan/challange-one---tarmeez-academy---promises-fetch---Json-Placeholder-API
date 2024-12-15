///////////////////////////////////////////-----------promises/fetch----------/////////////////////////////////////////////
// start get elements from DOM
let theposts = document.getElementsByClassName("posts")[0];
let theUsers = document.getElementsByClassName("users")[0];
// end get elements from DOM

// start getAllPosts request
function getAllPosts() {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        reject("Error in getAllPosts");
      }
    })
    .then((json) => {
      //   console.log(json);
      for (post of json) {
        // console.log("the post is : ", post);
        showOnScreen(post, "post", theposts);
      }
    });
}
getAllPosts();
// end getAllPosts request

// start getAllUsers request
function getAllUsers() {
  return new Promise(function (resolve, reject) {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          reject("Error in getAllUsers");
        }
      })
      .then((json) => {
        //   console.log(json);
        for (user of json) {
          // console.log("the user is : ", user);
          showOnScreen(user, "user", theUsers);
        }
      });
  });
}
getAllUsers()
  .then(() => {
    // getAllPosts();
  })
  .catch((err) => console.log("error"));
// end getAllUsers request

// start getAllPostsForSpecificUser request
function getAllPostsForSpecificUser(userId) {
  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        reject("error in get All Posts For Specific User");
      }
    })
    .then((json) => {
      //   console.log(json);
      for (post of json) {
        // console.log("the post is : ", post);
        showOnScreen(post, "post", theposts);
      }
    });
}
// getAllPostsForSpecificUser(userId);
// end getAllPostsForSpacificUser request

// start global functions
// show posts and users On Screen function
function showOnScreen(item, parentClass, containerList) {
  let childOneClass = "",
    childTwoClass = "";

  if (parentClass === "post") {
    childOneClass = "title";
    childTwoClass = "body";
  } else if (parentClass === "user") {
    childOneClass = "name";
    childTwoClass = "email";
  }

  // create parent for post / user
  let parentItem = createElement("div", parentClass, null, containerList);

  let textChildOne, textChildTwo;

  if (parentClass === "post") {
    textChildOne = item.title;
    textChildTwo = item.body;
  } else {
    textChildOne = item.name;
    textChildTwo = item.email;

    let userId = item.id;
    // console.log(userId);
    handleUserSelected(parentItem, userId);
  }

  // create first child of parent for post / user
  let childOneparentItem = createElement(
    "div",
    childOneClass,
    textChildOne,
    parentItem
  );

  // create second child of parent for post / user
  let childTwoparentItem = createElement(
    "div",
    childTwoClass,
    textChildTwo,
    parentItem
  );
}

// handleUserSelected element/user
function handleUserSelected(parentItem, userId) {
  parentItem.addEventListener("click", function () {
    // console.log(parentItem);
    // console.log(userId);

    // Remove previous selection
    let selectedUsers = document.getElementsByClassName("selected");
    for (let user of selectedUsers) {
      user.classList.remove("selected");
    }

    // Highlight the selected user
    parentItem.classList.add("selected");

    // Clear previous/existing posts
    theposts.innerHTML = "";

    // call function
    getAllPostsForSpecificUser(userId);
  });
}

// createElement function
function createElement(tag, className, textcontent, parent) {
  let element = document.createElement(tag);
  if (className) element.className = className;
  if (textcontent) element.textContent = textcontent;
  if (parent) parent.appendChild(element);
  return element;
}
// end global functions
