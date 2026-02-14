let contacts = [];

async function loadContacts() {
  try {
    const response = await fetch("src/data/api.json");

    if (!response.ok) {
      throw new Error("JSON not found. Check file path.");
    }

    contacts = await response.json();
    renderContacts(contacts);
  } catch (error) {
    console.error("Error loading contacts:", error);
  }
}

function renderContacts(data) {
  const ul = document.getElementById("myUL");
  ul.innerHTML = "";

  data.forEach((person) => {
    const li = document.createElement("li");
    const a = document.createElement("a");

    a.href = "#";
    a.textContent = `${person.name.first} ${person.name.last}`;

    li.appendChild(a);
    ul.appendChild(li);
  });
}

// Search function (your version, just slightly cleaned)
function myFunction() {
  const input = document.getElementById("myInput");
  const filter = input.value.toUpperCase();
  const ul = document.getElementById("myUL");
  const li = ul.getElementsByTagName("li");

  for (let i = 0; i < li.length; i++) {
    const a = li[i].getElementsByTagName("a")[0];
    const txtValue = a.textContent || a.innerText;

    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

loadContacts();
