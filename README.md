# FinTrack – Personal Finance Manager

## 1. Project Overview

FinTrack is a browser-based personal finance management application developed to help individuals monitor and manage their income, expenses, and account balances.

The application provides a simple dashboard for recording financial transactions, monitoring financial activities, and viewing financial summaries through interactive charts.

FinTrack supports two independent account currencies: United States Dollar (USD) and Liberian Dollar (LRD). Users can manage transactions in both currencies simultaneously without automatic currency conversion.

The application uses browser LocalStorage to preserve financial records between sessions.

## 2. Features

### Financial Dashboard
- View total account balances.
- Monitor total income and expenses.
- View monthly savings.
- Display financial summaries separately for USD and LRD accounts.

### Transaction Management
- Add income and expense transactions.
- Edit existing transactions.
- Delete transactions.
- Assign descriptions, amounts, dates, and categories.
- Select the currency account associated with each transaction.

### Financial Visualization
- View monthly income and expense comparisons.
- View expense distribution by category.
- Switch between USD and LRD accounts when viewing charts.
- Visualize financial activities using Chart.js.

### Appearance Settings
- Light theme.
- Dark theme.
- System theme, which follows the device's appearance preference.

### Data Persistence
- Store transaction records in browser LocalStorage.
- Preserve records when the application is closed and reopened in the same browser.
- Store appearance preferences locally.

### Responsive Interface
- Adapt the dashboard to desktop, tablet, and mobile screens.
- Provide mobile navigation.
- Support horizontal scrolling within the transaction table on smaller screens.

## 3. Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Application structure and content |
| CSS3 | Styling, layout, themes, and responsiveness |
| JavaScript (ES6+) | Application logic and functionality |
| LocalStorage | Local data persistence |
| Chart.js | Financial charts and visualization |

## 4. Project Structure

```text
FinTrack/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── app.js
│   ├── storage.js
│   └── transactions.js
│
└── README.md
```

### File Descriptions

- **index.html:** Contains the application's structure and user interface.
- **style.css:** Defines the application's appearance, themes, and responsive layouts.
- **app.js:** Handles dashboard calculations, chart initialization, theme management, and application initialization.
- **storage.js:** Handles LocalStorage initialization and data persistence.
- **transactions.js:** Handles transaction creation, retrieval, updating, deletion, and display.
- **README.md:** Provides project information and usage instructions.

## 5. Installation and Setup

FinTrack does not require a backend server, database installation, or complex configuration.

### Requirements
- A modern web browser (Google Chrome, Microsoft Edge, Firefox, or equivalent).
- Visual Studio Code or another code editor.
- Live Server extension for Visual Studio Code (recommended).
- Internet connection for loading the Chart.js CDN library.

### Setup Instructions

1. Download or clone the project repository.
2. Open the project folder in Visual Studio Code.
3. Ensure the project files and folders follow the structure described above.
4. Open `index.html`.
5. Right-click inside the HTML editor and select **Open with Live Server**.
6. The application will open in your default browser.

Alternatively, open `index.html` directly in a modern browser.

## 6. How to Use FinTrack

### Managing Transactions

1. Open the dashboard.
2. Select **Add Transaction**.
3. Enter the transaction description and amount.
4. Select the appropriate account currency (USD or LRD).
5. Select whether the transaction represents income or an expense.
6. Choose a transaction category.
7. Select the transaction date.
8. Save the transaction.

Existing transactions can be edited or deleted using the corresponding actions in the transaction table.

### Managing Multiple Currencies

FinTrack supports separate USD and LRD accounts.

Each transaction belongs to one currency account. Financial summaries are calculated independently for each account.

The application does not automatically convert between USD and LRD.

### Viewing Financial Charts

Navigate to the Financial Overview section.

Use the account selector to switch between USD and LRD financial data.

The charts display:
- Monthly income compared with expenses.
- Expenses grouped by transaction category.

### Changing the Application Theme

Use the Appearance selector in the dashboard header.

Available options:
- System
- Light
- Dark

The selected preference is saved locally.

## 7. Data Storage

FinTrack uses the browser's LocalStorage API to store application data.

This means:
- Financial records are stored locally in the browser.
- No remote database or cloud storage is used.
- Data is associated with the browser and device where it was entered.
- Clearing browser storage or site data may permanently remove saved transactions.

Users should periodically maintain their own backups of important financial information.

## 8. Limitations

The current version of FinTrack has the following limitations:

- It is designed for individual, local use.
- It does not provide user registration or authentication.
- It does not synchronize financial records across devices.
- It does not use a remote database.
- It does not automatically convert between USD and LRD.
- It does not provide automated bank integration.
- Its data persistence depends on browser LocalStorage.
- It does not provide a dedicated cloud backup mechanism.

## 9. Future Improvements

Potential future enhancements include:

- Budget creation and monitoring.
- Advanced financial reporting.
- Transaction search and filtering.
- Custom transaction category management.
- CSV and PDF financial exports.
- Data backup and restoration.
- Secure cloud-based storage and synchronization.
- User authentication and multi-user support.

These are proposed enhancements and are not necessarily included in the current version.

## 10. Project Purpose

FinTrack was developed as an Advanced Web Development course project to demonstrate the practical application of HTML5, CSS3, JavaScript, browser storage, and data visualization technologies in building an interactive web application.

---

**Project:** FinTrack – Personal Finance Manager  
**Project Type:** Web Application  
**Development Approach:** Client-side application  
**Primary Technologies:** HTML5, CSS3, JavaScript  
**Data Storage:** Browser LocalStorage
