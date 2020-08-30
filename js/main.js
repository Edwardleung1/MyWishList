// Listen for form submit
document.getElementById("myForm").addEventListener("submit", saveItemList);

// Run function to save Item List
function saveItemList(e) {
  // Get form values
  const itemName = document.getElementById("itemName").value;
  const itemUrl = document.getElementById("itemUrl").value;

  if (!validateForm(itemName, itemUrl)) {
    return false;
  }

  // Save as an JS array object to store in local storage
  let itemList = {
    name: itemName,
    url: itemUrl,
  };

  // check if URL already exists'
  for (let i = 0; i < itemList.length; i++) {
    if (itemList[i].url === itemUrl) {
      alert("URL site already exists");
      return false;
    }
  }

  // Check if local itemList is in storage
  if (localStorage.getItem("itemLists") === null) {
    // Init an array
    let itemLists = [];
    // Push new item into the array
    itemLists.push(itemList);
    // Set to LocalStorage
    // itemLists is an array of objects, stringify converts it to a JSON string
    localStorage.setItem("itemLists", JSON.stringify(itemLists));
  } else {
    // Get itemLists from Local Storage and convert it to a JS array object
    let itemLists = JSON.parse(localStorage.getItem("itemLists"));
    // Add itemList to array
    itemLists.push(itemList);
    // Reset it back to local storage with added new itemList
    localStorage.setItem("itemLists", JSON.stringify(itemLists));
  }

  // Clear form
  document.getElementById("myForm").reset();

  // Re-fetch itemLists
  fetchItemLists();

  // Prevent form from submitting
  e.preventDefault();
}

// Delete itemList function by passing url
function deleteItemList(url) {
  // Get itemList from local storage and convert it into a JSON
  let itemLists = JSON.parse(localStorage.getItem("itemLists"));
  // Loop through itemLists
  for (let i = 0; i < itemLists.length; i++) {
    if (itemLists[i].url == url) {
      // Remove from array
      itemLists.splice(i, 1);
    }
  }
  // Reset it back to local storage with added new itemList
  localStorage.setItem("itemLists", JSON.stringify(itemLists));

  // Re-fetch itemLists
  fetchItemLists();
}

// Fetch itemLists from local storage
function fetchItemLists() {
  // Get itemLists from Local Storage and convert it into a JSON
  let itemLists = JSON.parse(localStorage.getItem("itemLists"));

  // Output results to UI by grabbing ID
  let itemListsResults = document.getElementById("wishListResults");

  // Build output from ID spot
  itemListsResults.innerHTML = "";

  // Loop through itemLists from local storage and output them in a div
  for (let i = 0; i < itemLists.length; i++) {
    // Now we have the name and url for each itemList in Local Storage
    let name = itemLists[i].name;
    let url = itemLists[i].url;

    // Build the output by Appending
    itemListsResults.innerHTML +=
      '<div class="card bg-light text-dark card-body">' +
      "<h3>" +
      name +
      ' <a class="btn btn-primary" target="_blank" href="' +
      addHTTP(url) +
      '">Visit</a> ' +
      " <a onclick=\"deleteItemList('" +
      url +
      '\')" class="btn btn-danger" href="#">Delete</a>' +
      "</h3>" +
      "</div>";
  }
}

// Form validation
function validateForm(itemName, itemUrl) {
  // Check validation on form values
  if (!itemName || !itemUrl) {
    alert("Please fill in the form");
    return false;
  }

  // Check URL site
  let expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  let regex = new RegExp(expression);

  // If it doesn't match
  if (!itemUrl.match(regex)) {
    alert("Please use a valid URL");
    return false;
  }
  // If it gets to the end pass true
  return true;
}

function addHTTP(url) {
  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
    url = "http://" + url;
  }
  return url;
}
