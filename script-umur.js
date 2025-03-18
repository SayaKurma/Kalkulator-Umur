document.addEventListener('DOMContentLoaded', function() {
  const birthdateInput = document.getElementById('birthdate');
  const calculateAgeBtn = document.getElementById('calculateAgeBtn');
  const resultDiv = document.getElementById('result');

  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();
  
  if (mm < 10) mm = '0' + mm;
  if (dd < 10) dd = '0' + dd;
  
  const formattedToday = yyyy + '-' + mm + '-' + dd;
  birthdateInput.setAttribute('max', formattedToday);

  calculateAgeBtn.addEventListener('click', function() {
    if (!birthdateInput.value) {
      showResult("Silakan pilih tanggal lahir terlebih dahulu.", "error");
      return;
    }

    const birthDate = new Date(birthdateInput.value);
    const today = new Date();
    
    let years = today.getFullYear() - birthDate.getFullYear();
    
    let months = today.getMonth() - birthDate.getMonth();
    if (months < 0) {
      years--;
      months += 12;
    }
    
    let days = today.getDate() - birthDate.getDate();
    if (days < 0) {
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
      months--;
      if (months < 0) {
        years--;
        months += 12;
      }
    }
    
    const htmlResult = `
      <div class="math-result">
        <div class="math-age-years">${years} <span>tahun</span></div>
        <div class="math-age-detail">${months} bulan, ${days} hari</div>
        <div class="math-age-total">≈ ${Math.floor(years + months/12 + days/365)} tahun</div>
      </div>
    `;
    
    showResult(htmlResult);
    
    resultDiv.classList.add('result-animated');
    setTimeout(() => {
      resultDiv.classList.remove('result-animated');
    }, 1000);
  });

  function showResult(content, type = 'success') {
    resultDiv.innerHTML = content;
    resultDiv.className = 'result ' + (type === 'error' ? 'result-error' : '');
  }
  
  const style = document.createElement('style');
  style.textContent = `
    .math-result {
      text-align: center;
    }
    .math-age-years {
      font-size: 36px;
      font-weight: bold;
      color: var(--color-primary-dark);
    }
    .math-age-years span {
      font-size: 18px;
      font-weight: normal;
    }
    .math-age-detail {
      font-size: 16px;
      margin: 5px 0;
      color: var(--color-text);
    }
    .math-age-total {
      font-size: 14px;
      color: var(--color-text-light);
      font-style: italic;
      margin-top: 5px;
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
