// Listen for form submit
document.getElementById("myForm").addEventListener("submit", saveItemList);

// Run function to save Item List
function saveItemList(e) {
  // Get form values
  const itemName = document.getElementById("itemName").value;
  const itemUrl = document.getElementById("itemUrl").value;

  // Save as an JS array object to store in local storage
  let itemList = {
    name: itemName,
    url: itemUrl,
  };

  // Check if local itemList is in storage
  if (localStorage.getItem("itemLists") === null) {
    // Init an array
    let itemLists = [];
    // Push new item into the array
    itemLists.push(itemList);
    // Set to LocalStorage
    // itemLists is an array of objects, stringify coverts it to a JSON string
    localStorage.setItem("itemLists", JSON.stringify(itemLists));
  } else {
    // Get itemLists from Local Storage
    let itemLists = JSON.parse(localStorage.getItem("itemLists"));
  }

  // Prevent form from submitting
  e.preventDefault();
}
