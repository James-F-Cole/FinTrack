const transactionDialog = document.getElementById("transaction-dialog");
const transactionForm = document.getElementById("transaction-form");
const transactionsList = document.getElementById("transactions-list");

const addTransactionBtn = document.getElementById("add-transaction-btn");
const cancelTransactionBtn = document.getElementById("cancel-transaction-btn");

const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const currencyInput = document.getElementById("currency");
const typeInput = document.getElementById("type");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");

let transactions = [];
let editingTransactionId = null;


function loadTransactions() {

    transactions = getData(STORAGE_KEYS.TRANSACTIONS);

    let updated = false;

    transactions = transactions.map(transaction => {

        if (!transaction.currency) {
            updated = true;

            return {
                ...transaction,
                currency: "USD"
            };
        }

        return transaction;
    });

    if (updated) {
        saveData(STORAGE_KEYS.TRANSACTIONS, transactions);
    }

    renderTransactions();
}


function renderTransactions() {

    transactionsList.innerHTML = "";

    transactions.forEach(transaction => {

        const currencySymbol = transaction.currency === "LRD" ? "L$" : "$";

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${transaction.date}</td>
            <td>${transaction.description}</td>
            <td>${transaction.category}</td>
            <td>${transaction.type}</td>
            <td>${currencySymbol}${transaction.amount.toFixed(2)}</td>
            <td>
                <button class="edit-btn" data-id="${transaction.id}">
                    Edit
                </button>

                <button class="delete-btn" data-id="${transaction.id}">
                    Delete
                </button>
            </td>
        `;

        transactionsList.appendChild(row);
    });
    updateDashboard();
}


function loadCategories() {

    const categories = getData(STORAGE_KEYS.CATEGORIES);
    const selectedType = typeInput.value;

    categoryInput.innerHTML = "";

    categories[selectedType].forEach(category => {

        const option = document.createElement("option");

        option.value = category;
        option.textContent = category;

        categoryInput.appendChild(option);
    });
}


function openTransactionForm(transaction = null) {

    transactionForm.reset();

    editingTransactionId = transaction ? transaction.id : null;

    document.getElementById("form-title").textContent =
        transaction ? "Edit Transaction" : "Add Transaction";

    if (transaction) {
        descriptionInput.value = transaction.description;
        amountInput.value = transaction.amount;
        typeInput.value = transaction.type;
        dateInput.value = transaction.date;
        currencyInput.value = transaction.currency || "USD";
    } else {
        dateInput.value = new Date().toISOString().slice(0, 10);
    }

    loadCategories();

    if (transaction) {
        categoryInput.value = transaction.category;
        
    }

    transactionDialog.showModal();
}


transactionForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const transaction = {
        id: editingTransactionId || crypto.randomUUID(),
        description: descriptionInput.value.trim(),
        amount: Number(amountInput.value),
        type: typeInput.value,
        currency: currencyInput.value,
        category: categoryInput.value,
        date: dateInput.value
    };

    if (
        !transaction.description ||
        !Number.isFinite(transaction.amount) ||
        transaction.amount <= 0 ||
        !transaction.date
    ) {
        alert("Please enter valid transaction details.");
        return;
    }

    if (editingTransactionId) {

        transactions = transactions.map(item =>
            item.id === editingTransactionId ? transaction : item
        );

    } else {

        transactions.push(transaction);
    }

    saveData(STORAGE_KEYS.TRANSACTIONS, transactions);

    renderTransactions();

    transactionDialog.close();
});


transactionsList.addEventListener("click", function (event) {

    const id = event.target.dataset.id;

    if (!id) return;

    if (event.target.classList.contains("edit-btn")) {

        const transaction = transactions.find(item => item.id === id);

        if (transaction) {
            openTransactionForm(transaction);
        }
    }

    if (event.target.classList.contains("delete-btn")) {

        if (!confirm("Delete this transaction?")) return;

        transactions = transactions.filter(item => item.id !== id);

        saveData(STORAGE_KEYS.TRANSACTIONS, transactions);

        renderTransactions();
    }
});


addTransactionBtn.addEventListener("click", () => {
    openTransactionForm();
});

cancelTransactionBtn.addEventListener("click", () => {
    transactionDialog.close();
});

typeInput.addEventListener("change", loadCategories);