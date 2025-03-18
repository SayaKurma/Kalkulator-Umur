document.addEventListener('DOMContentLoaded', function() {
  const startTimeInput = document.getElementById('startTime');
  const endTimeInput = document.getElementById('endTime');
  const calculateTimeBtn = document.getElementById('calculateTimeBtn');
  const timeResultDiv = document.getElementById('timeResult');

  calculateTimeBtn.addEventListener('click', function() {
    if (!startTimeInput.value || !endTimeInput.value) {
      showResult("Silakan pilih kedua waktu terlebih dahulu.", "error");
      return;
    }

    const baseDate = "1970-01-01T";
    let startDate = new Date(baseDate + startTimeInput.value + ":00");
    let endDate = new Date(baseDate + endTimeInput.value + ":00");

    if (endDate < startDate) {
      endDate.setDate(endDate.getDate() + 1);
    }

    const diffMs = endDate - startDate;
    
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const diffSeconds = Math.floor((diffMs % (1000 * 60)) / 1000);
    
    const totalMinutes = diffMs / (1000 * 60);
    const totalHours = diffMs / (1000 * 60 * 60);
    
    const htmlResult = `
      <div class="math-result">
        <div class="math-time-main">${formatTimeString(diffHours, diffMinutes, diffSeconds)}</div>
        <div class="math-time-details">
          <div class="math-time-detail">
            <span class="math-time-label">Total jam:</span> 
            <span class="math-time-value">${totalHours.toFixed(2)} jam</span>
          </div>
          <div class="math-time-detail">
            <span class="math-time-label">Total menit:</span> 
            <span class="math-time-value">${totalMinutes.toFixed(1)} menit</span>
          </div>
        </div>
      </div>
    `;
    
    showResult(htmlResult);
    
    timeResultDiv.classList.add('result-animated');
    setTimeout(() => {
      timeResultDiv.classList.remove('result-animated');
    }, 1000);
  });

  function formatTimeString(hours, minutes, seconds) {
    let timeString = "";
    
    if (hours > 0) {
      timeString += `<span class="time-unit">${hours}</span> <span class="time-label">jam</span> `;
    }
    
    if (minutes > 0 || hours > 0) {
      timeString += `<span class="time-unit">${minutes}</span> <span class="time-label">menit</span> `;
    }
    
    timeString += `<span class="time-unit">${seconds}</span> <span class="time-label">detik</span>`;
    
    return timeString;
  }

  function showResult(content, type = 'success') {
    timeResultDiv.innerHTML = content;
    timeResultDiv.className = 'result ' + (type === 'error' ? 'result-error' : '');
  }
  
  const style = document.createElement('style');
  style.textContent = `
    .math-result {
      text-align: center;
    }
    .math-time-main {
      font-size: 22px;
      color: var(--color-primary-dark);
      margin-bottom: 12px;
    }
    .time-unit {
      font-weight: bold;
      font-size: 26px;
    }
    .time-label {
      font-size: 16px;
    }
    .math-time-details {
      display: flex;
      flex-direction: column;
      gap: 5px;
      margin-top: 10px;
      font-size: 14px;
      color: var(--color-text);
      background-color: rgba(63, 81, 181, 0.05);
      padding: 10px;
      border-radius: 4px;
    }
    .math-time-detail {
      display: flex;
      justify-content: space-between;
    }
    .math-time-label {
      color: var(--color-text-light);
    }
    .math-time-value {
      font-family: 'Roboto Mono', monospace;
    }
    .result-error {
      color: #d32f2f;
      font-style: italic;
    }
    .result-animated {
      animation: pop 0.5s ease-out;
    }
    @keyframes pop {
      0% { transform: scale(0.95); opacity: 0.8; }
      70% { transform: scale(1.05); }
      100% { transform: scale(1); opacity: 1; }
    }
  `;
  document.head.appendChild(style);
});
