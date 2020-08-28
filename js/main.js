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
    // itemLists is an array of objects, stringify converts it to a JSON string
    localStorage.setItem("itemLists", JSON.stringify(itemLists));
  } else {
    // Get itemLists from Local Storage and convert it to a JS array object
    let itemLists = JSON.parse(localStorage.getItem("itemLists"));
    // Add itemList to array
    itemLists.push(itemList);
  }

  // Prevent form from submitting
  e.preventDefault();
}
