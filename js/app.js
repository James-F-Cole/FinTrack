// Theme management

const themeSelect = document.getElementById("theme-select");

const systemPreference = window.matchMedia("(prefers-color-scheme: dark)");

function applyTheme(preference) {

    let theme;

    if (preference === "system") {
        theme = systemPreference.matches ? "dark" : "light";
    } else {
        theme = preference;
    }

    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme;
}

function initializeTheme() {

    const savedTheme = localStorage.getItem("fintrack-theme");

    const validThemes = ["light", "dark", "system"];

    const preference = validThemes.includes(savedTheme)
        ? savedTheme
        : "system";

    themeSelect.value = preference;

    applyTheme(preference);

    themeSelect.addEventListener("change", function () {

        const selectedTheme = themeSelect.value;

        localStorage.setItem("fintrack-theme", selectedTheme);

        applyTheme(selectedTheme);
    });

    systemPreference.addEventListener("change", function () {

        if (themeSelect.value === "system") {
            applyTheme("system");
        }

    });
}


const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.querySelector(".sidebar");

menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("open");
});

// Format amounts using the appropriate currency.
function formatCurrency(amount, currency) {

    return new Intl.NumberFormat(
        currency === "USD" ? "en-US" : "en-LR",
        {
            style: "currency",
            currency: currency
        }
    ).format(amount);
}


// Calculate financial figures for one account.
function calculateAccountSummary(currency) {

    const accountTransactions = transactions.filter(
        transaction => transaction.currency === currency
    );

    const income = accountTransactions
        .filter(transaction => transaction.type === "income")
        .reduce((total, transaction) => total + transaction.amount, 0);

    const expenses = accountTransactions
        .filter(transaction => transaction.type === "expense")
        .reduce((total, transaction) => total + transaction.amount, 0);

    const balance = income - expenses;


    // Calculate current month's income and expenses.
    const today = new Date();

    const monthlyTransactions = accountTransactions.filter(transaction => {

        const transactionDate = new Date(transaction.date + "T00:00:00");

        return transactionDate.getMonth() === today.getMonth() &&
               transactionDate.getFullYear() === today.getFullYear();
    });

    const monthlyIncome = monthlyTransactions
        .filter(transaction => transaction.type === "income")
        .reduce((total, transaction) => total + transaction.amount, 0);

    const monthlyExpenses = monthlyTransactions
        .filter(transaction => transaction.type === "expense")
        .reduce((total, transaction) => total + transaction.amount, 0);

    const monthlySavings = monthlyIncome - monthlyExpenses;


    return {
        income,
        expenses,
        balance,
        monthlySavings
    };
}


// Update both account summaries.
function updateDashboard() {

    const usd = calculateAccountSummary("USD");
    const lrd = calculateAccountSummary("LRD");


    // USD account
    document.getElementById("total-balance-usd").textContent =
        formatCurrency(usd.balance, "USD") == null ? '' : formatCurrency(usd.balance, "USD");

    document.getElementById("total-income-usd").textContent =
        formatCurrency(usd.income, "USD");

    document.getElementById("total-expenses-usd").textContent =
        formatCurrency(usd.expenses, "USD");

    document.getElementById("monthly-savings-usd").textContent =
        formatCurrency(usd.monthlySavings, "USD");


    // LRD account
    document.getElementById("total-balance-lrd").textContent =
        formatCurrency(lrd.balance, "LRD");

    document.getElementById("total-income-lrd").textContent =
        formatCurrency(lrd.income, "LRD");

    document.getElementById("total-expenses-lrd").textContent =
        formatCurrency(lrd.expenses, "LRD");

    document.getElementById("monthly-savings-lrd").textContent =
        formatCurrency(lrd.monthlySavings, "LRD");

    updateCharts();
}


// Calculate monthly income and expenses for the current year.
function getMonthlyFinancialData(currency) {

    const currentYear = new Date().getFullYear();

    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const income = Array(12).fill(0);
    const expenses = Array(12).fill(0);

    transactions
        .filter(item => item.currency === currency)
        .forEach(item => {

            const date = new Date(item.date + "T00:00:00");

            if (date.getFullYear() !== currentYear) return;

            const month = date.getMonth();

            if (item.type === "income") {
                income[month] += item.amount;
            } else {
                expenses[month] += item.amount;
            }
        });

    return { months, income, expenses };
}


// Prepare expense totals by category.
function getCategoryExpenseData(currency) {

    const categoryTotals = {};

    transactions
        .filter(item =>
            item.currency === currency &&
            item.type === "expense"
        )
        .forEach(item => {

            if (!categoryTotals[item.category]) {
                categoryTotals[item.category] = 0;
            }

            categoryTotals[item.category] += item.amount;
        });

    return categoryTotals;
}


// Initialize both charts.
const chartCurrency = document.getElementById("chart-currency");

let incomeExpenseChart = null;
let categoryExpenseChart = null;


function initializeCharts() {

    const monthlyData = getMonthlyFinancialData("USD");

    incomeExpenseChart = new Chart(
        document.getElementById("income-expense-chart"),
        {
            type: "bar",

            data: {
                labels: monthlyData.months,

                datasets: [
                    {
                        label: "Income",
                        data: monthlyData.income,
                        backgroundColor: "#16a34a"
                    },
                    {
                        label: "Expenses",
                        data: monthlyData.expenses,
                        backgroundColor: "#dc2626"
                    }
                ]
            },

            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: "bottom"
                    }
                }
            }
        }
    );


    categoryExpenseChart = new Chart(
        document.getElementById("category-expense-chart"),
        {
            type: "doughnut",

            data: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: [
                        "#0f766e",
                        "#2563eb",
                        "#f59e0b",
                        "#dc2626",
                        "#9333ea",
                        "#0891b2",
                        "#64748b"
                    ]
                }]
            },

            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: "bottom"
                    }
                }
            }
        }
    );

    updateCharts();
}


function updateCharts() {

    if (!incomeExpenseChart || !categoryExpenseChart) return;

    const currency = chartCurrency.value;

    const monthlyData = getMonthlyFinancialData(currency);

    incomeExpenseChart.data.datasets[0].data =
        monthlyData.income;

    incomeExpenseChart.data.datasets[1].data =
        monthlyData.expenses;

    incomeExpenseChart.data.datasets[0].label = `Income (${currency})`;
    incomeExpenseChart.data.datasets[1].label = `Expenses (${currency})`;

    incomeExpenseChart.update();


    const categoryData = getCategoryExpenseData(currency);

    categoryExpenseChart.data.labels =
        Object.keys(categoryData);

    categoryExpenseChart.data.datasets[0].data =
        Object.values(categoryData);

    categoryExpenseChart.update();

}

chartCurrency.addEventListener("change", updateCharts);

initializeTheme();
initializeStorage();
initializeCharts();
loadTransactions();