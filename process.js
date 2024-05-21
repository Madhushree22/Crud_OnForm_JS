let entries = [];
let serialNumber = 1;


function createEntry() {
    let name = document.getElementById("name").value;
    let age = parseInt(document.getElementById("age").value);
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;

    if (name == "" || age == "0" || age == "" || phone == "" || email == "") {
        alert("Please Fill Out The Details Before Creating...!");
    }

    else
        entries.push({ serial: serialNumber++, name, age, phone, email });
    displayEntries();
    resetForm();
}

function resetForm() {
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
}


function dropDown() {
    let dropdown = document.getElementById("filterDropdown");
    dropdown.classList.toggle("show");
}

window.onclick = function (event) {
    if (!event.target.matches('.filter-icon')) {
        let dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

function filterEntries(type) {
    let filteredEntries = [];
    if (type === 'all') {
        filteredEntries = entries;
    } else if (type === 'above') {
        filteredEntries = entries.filter(entry => entry.age > 18);
    }
    else if (type === 'excat') {
        filteredEntries = entries.filter(entry => entry.age == 18);
    } else if (type === 'below') {
        filteredEntries = entries.filter(entry => entry.age < 18);
    }
    displayEntries(filteredEntries);
}

function displayEntries(entriesList = entries) {
    let tableBody = document.getElementById("tableContent");
    tableBody.innerHTML = "";

    entriesList.forEach(entry => {
        let row = tableBody.insertRow();
        row.insertCell().textContent = entry.serial;
        row.insertCell().textContent = entry.name;
        row.insertCell().textContent = entry.age;
        row.insertCell().textContent = entry.phone;
        row.insertCell().textContent = entry.email;
        let actionsCell = row.insertCell();
        actionsCell.innerHTML = `<button onclick="editEntry(${entry.serial})">Edit</button> <button onclick="deleteEntry(${entry.serial})">Delete</button>`;
    });
}
function editEntry(serial) {
    let entry = entries.find(entry => entry.serial === serial);
    if (entry) {
        document.getElementById("name").value = entry.name;
        document.getElementById("age").value = entry.age;
        document.getElementById("phone").value = entry.phone;
        document.getElementById("email").value = entry.email;
        editConfirmation(serial);
    }
}

function deleteEntry(serial) {
    if (confirm("Do you want to delete this record?..")) {
        entries = entries.filter(entry => entry.serial !== serial);
        displayEntries();
    }

}

function editConfirmation(serial) {
    if (confirm("Do you want to edit this record?..")) {
        entries = entries.filter(entry => entry.serial !== serial);
        displayEntries();
    }

}

// Initial display of entries
displayEntries();