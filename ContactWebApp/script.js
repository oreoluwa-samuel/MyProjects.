let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
let editIndex = null;

const formDiv = document.getElementById("addContactForm");
const contactsDiv = document.getElementById("contactsDiv");

document.getElementById("addContactBtn").onclick = () => formDiv.style.display = "block";
document.getElementById("closeForm").onclick = () => formDiv.style.display = "none";

document.getElementById("submitContact").onclick = () => {
    const name = document.getElementById("contactName").value;
    const email = document.getElementById("contactEmail").value;
    const phone = document.getElementById("contactPhone").value;

    if (!name || !email || !phone) {
        alert("Fill all fields!");
        return;
    }

    if (editIndex !== null) {
        contacts[editIndex] = { name, email, phone };
        editIndex = null;
    } else {
        contacts.push({ name, email, phone });
    }

    document.getElementById("contactName").value = "";
    document.getElementById("contactEmail").value = "";
    document.getElementById("contactPhone").value = "";
    formDiv.style.display = "none";

    localStorage.setItem("contacts", JSON.stringify(contacts));
    renderContacts();
};

function renderContacts() {
    if (contacts.length === 0) {
        contactsDiv.innerHTML = "No contacts yet.";
        return;
    }

    contactsDiv.innerHTML = "";
    contacts.forEach((c, i) => {
        const card = document.createElement("div");
        card.className = "contact-card";

        const info = document.createElement("div");
        info.className = "contact-info";
        info.innerHTML = `<p><strong>${c.name}</strong></p>
                          <p>${c.email}</p>
                          <p>${c.phone}</p>`;

        const actions = document.createElement("div");
        actions.className = "contact-actions";
        actions.innerHTML = `<button onclick="editContact(${i})">Edit</button>
                             <button onclick="deleteContact(${i})">Delete</button>`;

        card.appendChild(info);
        card.appendChild(actions);

        contactsDiv.appendChild(card);
    });
}

function editContact(i) {
    editIndex = i;
    const c = contacts[i];
    document.getElementById("contactName").value = c.name;
    document.getElementById("contactEmail").value = c.email;
    document.getElementById("contactPhone").value = c.phone;
    formDiv.style.display = "block";
}

function deleteContact(i) {
    if (confirm("Delete this contact?")) {
        contacts.splice(i, 1);
        localStorage.setItem("contacts", JSON.stringify(contacts));
        renderContacts();
    }
}

// Initial render
renderContacts();
