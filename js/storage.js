const STORAGE_KEYS = {
    TRANSACTIONS: "fintrack-transactions",
    CATEGORIES: "fintrack-categories",
    SETTINGS: "fintrack-settings"
};

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

function initializeStorage() {

    if (!localStorage.getItem(STORAGE_KEYS.TRANSACTIONS)) {
        saveData(STORAGE_KEYS.TRANSACTIONS, []);
    }

    if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {

        const defaultCategories = {
            income: ["Salary", "Business", "Investment", "Other"],
            expense: [
                "Food",
                "Transportation",
                "Housing",
                "Education",
                "Healthcare",
                "Entertainment",
                "Other"
            ]
        };

        saveData(STORAGE_KEYS.CATEGORIES, defaultCategories);
    }
}

