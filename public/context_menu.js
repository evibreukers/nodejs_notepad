document.querySelectorAll(".folder-square").forEach((this_folder) => {
  this_folder.addEventListener("dblclick", () => {
    const endpoint = `/select/${this_folder.dataset.idcode}`;
    fetch(endpoint, { method: "GET" })
      .then((response) => response.json())
      .then((data) => (window.location.href = data.redirect))
      .catch((err) => console.log(err));
  });
});

document.querySelectorAll(".folder-square").forEach((this_folder) => {
  let this_context = document.querySelector(".context-menu").cloneNode(true);
  this_context.id = this_folder.dataset.idcode;
  document.querySelector(".context-menu-box").appendChild(this_context);

  /* change color of folder */
  this_context.querySelectorAll(".color").forEach((this_color) => {
    this_color.addEventListener("click", () => {
      this_folder.style.backgroundColor = this_color.style.backgroundColor;
    });
  });

  /* delete folder */
  const folderID = this_folder.dataset.idcode;
  this_context.querySelector(".delete").addEventListener("click", () => {
    console.log("delete");
    const endpoint = `/folder/${folderID}`;
    fetch(endpoint, { method: "DELETE" })
      .then((response) => response.json())
      .then((data) => (window.location.href = data.redirect))
      .catch((err) => {
        console.log(err);
      });
  });

  this_folder.addEventListener(
    "contextmenu",
    (e) => {
      e.preventDefault();
      document.querySelectorAll(".context-menu").forEach((menu) => {
        menu.classList.remove("active");
      });
      let context = document.getElementById(this_folder.dataset.idcode);
      let xMouse = e.clientX;
      let yMouse = e.clientY;
      context.style.top = yMouse + 20 + "px";
      context.style.left = xMouse + 20 + "px";
      context.classList.add("active");
      return false;
    },
    false
  );
});

window.addEventListener("click", function () {
  document.querySelectorAll(".context-menu").forEach((menu) => {
    menu.classList.remove("active");
  });
});

document.querySelectorAll(".color");
