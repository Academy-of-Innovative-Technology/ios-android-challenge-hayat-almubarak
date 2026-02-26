/*Turns the json into javascript */
let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
if (contacts.length === 0){
    fetch( "src/data/api.json")
.then(response => response.json())
.then(data => {
  contacts = data;
  localStorage.setItem("contacts", JSON.stringify(contacts));
  displayContacts(contacts);
});
} else{
    displayContacts(contacts);
}

/*Displays the contacts on the page */
function displayContacts(list) {
    const ul = document.getElementById("myUL");
    ul.innerHTML = "";
    list.forEach(contact => {
        const li = document.createElement("li");
        li.textContent = contact.name;
        ul.appendChild(li);
    });
}

function myFunction(){
    const input = document.getElementById("myInput").value.toLowerCase();

    const filteredContacts = contacts.filter(contact => 
        contact.name.toLowerCase().includes(input)
    );

    displayContacts(filteredContacts);
}

/*New contacts*/
function saveContact() {
    const name = document.getElementById("newContactInput").value;
    const phone = document.getElementById("newContactPhone").value;
    const category = document.querySelector('input[name="contactType"]:checked').value;

    const newContact = {
        id : Date.now(),
        name: name,
        phone: phone,
        category: category
    }

    contacts.push(newContact);
    localStorage.setItem("contacts", JSON.stringify(contacts));
    displayContacts(contacts);
}   