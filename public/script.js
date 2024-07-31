var el = document.getElementById("items");
var sortable = new Sortable(el, {
  animation: 150,
  ghostClass: "blue-background-class",
});
document
  .getElementById("uploadForm")
  .addEventListener("submit", function (event) {
    const fileInput = document.getElementById("fileInput");
    const maxFiles = 3; // Set your desired file limit

    if (fileInput.files.length > maxFiles) {
      event.preventDefault(); // Prevent form submission
      alert(`You can only upload a maximum of ${maxFiles} files.`);
    }
  });
