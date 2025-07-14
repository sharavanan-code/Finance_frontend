let savings = [];

function addSavings() {
  const type = document.getElementById('savingsType').value;
  const amount = parseFloat(document.getElementById('savingsAmount').value);
  const desc = document.getElementById('savingsDesc').value;

  if (!amount || !desc) {
    alert("Fill all fields");
    return;
  }

  savings.push({ type, amount, desc });
  updateSavings();
}

function updateSavings() {
  let total = 0;
  const list = document.getElementById('savingsList');
  list.innerHTML = '';

  savings.forEach(s => {
    total += s.amount;
    const li = document.createElement('li');
    li.textContent = `${s.type.toUpperCase()}: ₹${s.amount} (${s.desc})`;
    list.appendChild(li);
  });

  document.getElementById('totalSavings').textContent = total;
  updateSavingsChart();
}

function updateSavingsChart() {
  const ctx = document.getElementById('savingsChart').getContext('2d');

  const labels = savings.map(s => s.type);
  const data = savings.map(s => s.amount);

  if (window.savingsChart) window.savingsChart.destroy();

  window.savingsChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Savings',
        data,
        backgroundColor: ['#2D9CDB', '#27AE60', '#F2C94C'],
      }]
    }
  });
}

function downloadSavingsPDF() {
  alert("Savings PDF download handled in backend.");
}
