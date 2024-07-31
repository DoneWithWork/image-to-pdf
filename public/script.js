var el = document.getElementById("items");
var sortable = new Sortable(el, {
  animation: 150,
  ghostClass: "blue-background-class",
});
document
  .getElementById("uploadForm")
  .addEventListener("submit", function (event) {
    const fileInput = document.getElementById("fileInput");
    const maxFiles = 10; // Set your desired file limit

    if (fileInput.files.length > maxFiles) {
      event.preventDefault(); // Prevent form submission
      alert(`You can only upload a maximum of ${maxFiles} files.`);
    }
  });

let convertButton = document.getElementById("convertButton");
let downloadButton = document.getElementById("downloadButton");
convertButton.addEventListener("click", async () => {
  let imgNames = [];
  let images = document.getElementsByName("convertImages");
  console.log(images);

  // Convert NodeList to Array and then use forEach
  Array.from(images).forEach((img) => {
    imgNames.push(img.dataset.name);
  });
  if (imgNames.length === 0) {
    alert("Please upload some images first");
    return;
  }
  console.log(imgNames);
  fetch("/convert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(imgNames),
  })
    .then((resp) => {
      return resp.text();
    })
    .then((data) => {
      // //stop the loading animation
      // loader.style.display = "none";

      // //display the convert and download button
      // convertText.style.display = "inline-block";
      downloadButton.style.display = "inline-block";

      //attach the address to the download button
      downloadButton.href = data;
    })
    .catch((error) => {
      console.error(error.message);
    });
});
