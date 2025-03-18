document.getElementById('calculateBtn').addEventListener('click', function() {
  const birthdateInput = document.getElementById('birthdate').value;
  const resultDiv = document.getElementById('result');

  if (!birthdateInput) {
    resultDiv.textContent = "Silakan pilih tanggal lahir terlebih dahulu.";
    return;
  }

  const today = new Date();
  const birthDate = new Date(birthdateInput);
  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  resultDiv.textContent = "Umur Anda: " + age + " tahun.";
});
