let debts = [];

function addDebt() {
  const name = document.getElementById('emiName').value;
  const amount = parseFloat(document.getElementById('emiAmount').value);
  const due = document.getElementById('dueDate').value;

  if (!name || !amount || !due) {
    alert("All fields required");
    return;
  }

  debts.push({ name, amount, due });
  updateDebt();
}

function updateDebt() {
  let total = 0;
  const list = document.getElementById('debtList');
  list.innerHTML = '';

  debts.forEach(d => {
    total += d.amount;
    const li = document.createElement('li');
    li.textContent = `${d.name}: ₹${d.amount} (Due: ${d.due})`;
    list.appendChild(li);
  });

  document.getElementById('totalDebt').textContent = total;
  updateDebtChart();
}

function updateDebtChart() {
  const ctx = document.getElementById('debtChart').getContext('2d');

  const labels = debts.map(d => d.name);
  const data = debts.map(d => d.amount);

  if (window.debtChart) window.debtChart.destroy();

  window.debtChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Debts',
        data,
        backgroundColor: '#EB5757',
      }]
    }
  });
}

function downloadDebtPDF() {
  alert("Debt PDF download handled in backend.");
}

