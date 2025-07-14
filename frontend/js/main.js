// =====================
// js/main.js
// =====================

window.addEventListener('DOMContentLoaded', () => {
  loadTransactions(); // Load saved data on page load
});

// ========== Data ==========
let transactions = [];

// ========== Add ==========
function addTransaction() {
  const type = document.getElementById('type').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const description = document.getElementById('description').value;
  const date = document.getElementById('date').value;

  if (!type || isNaN(amount) || !description || !date) {
    alert("Please fill all fields correctly.");
    return;
  }

  const newTransaction = { type, amount, description, date };
  transactions.push(newTransaction);

  saveTransactions();
  updateSummary();
  updateTable();
  updateChart();

  // Clear inputs
  document.getElementById('amount').value = '';
  document.getElementById('description').value = '';
  document.getElementById('date').value = '';
}

// ========== Reset ==========
function resetData() {
  if (!confirm("Are you sure you want to reset all data?")) return;
  transactions = [];
  localStorage.removeItem("transactions");
  updateSummary();
  updateTable();
  updateChart();
}

// ========== Summary ==========
function updateSummary() {
  let income = 0, expense = 0;
  transactions.forEach(t => {
    if (t.type === 'income') income += t.amount;
    else if (t.type === 'expense') expense += t.amount;
  });

  document.getElementById('totalIncome').textContent = income.toFixed(2);
  document.getElementById('totalExpense').textContent = expense.toFixed(2);
  document.getElementById('balance').textContent = (income - expense).toFixed(2);
}

// ========== Table ==========
function updateTable() {
  const tbody = document.getElementById('transactionBody');
  tbody.innerHTML = '';
  transactions.forEach(t => {
    const row = `<tr>
      <td>${t.type}</td>
      <td>₹${t.amount.toFixed(2)}</td>
      <td>${t.description}</td>
      <td>${t.date}</td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

// ========== Chart ==========
function updateChart() {
  const ctx = document.getElementById('expenseChart').getContext('2d');
  const categoryTotals = {};

  transactions.filter(t => t.type === 'expense').forEach(t => {
    if (!categoryTotals[t.description]) categoryTotals[t.description] = 0;
    categoryTotals[t.description] += t.amount;
  });

  const labels = Object.keys(categoryTotals);
  const data = Object.values(categoryTotals);

  if (window.expenseChart) window.expenseChart.destroy();

  window.expenseChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels,
      datasets: [{
        label: 'Expenses',
        data,
        backgroundColor: ['#EB5757', '#F2994A', '#27AE60', '#2D9CDB', '#BB6BD9'],
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom' }
      }
    }
  });
}

// ========== Local Storage ==========
function saveTransactions() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function loadTransactions() {
  const saved = localStorage.getItem('transactions');
  transactions = saved ? JSON.parse(saved) : [];
  updateSummary();
  updateTable();
  updateChart();
}

// ========== PDF ==========
function downloadPDF() {
  alert("PDF generation is handled by the backend.");
}
