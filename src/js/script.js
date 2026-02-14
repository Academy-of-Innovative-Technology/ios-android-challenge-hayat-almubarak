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

function renderContacts() {
  const ul = document.getElementById("myUL");
  ul.innerHTML = "";

  contacts.forEach((person, index) => {
    const li = document.createElement("li");
    const a = document.createElement("a");

    a.href = "#";
    a.textContent = `${person.name.first} ${person.name.last}`;
    a.addEventListener("click", () => {
      showProfile(index);});

    li.appendChild(a);
    ul.appendChild(li);
  });
}

function showProfile(index) {
  const person = contacts[index];
  const phoneText = person.phone
  .map((p)=> `${p.type}: ${p.number}`)
  .join(" | ");

  document.getElementById("profileName").textContent = person.name.first + "" + person.name.last;
  document.getElementById("profileImg").src = person.profile;
document.getElementById("profileNote").textContent = person.note;
document.getElementById("profilePhone").textContent = phoneText;
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
