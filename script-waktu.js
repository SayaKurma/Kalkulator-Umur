document.getElementById('calculateTimeBtn').addEventListener('click', function() {
  const startTimeInput = document.getElementById('startTime').value;
  const endTimeInput = document.getElementById('endTime').value;
  const timeResultDiv = document.getElementById('timeResult');

  if (!startTimeInput || !endTimeInput) {
    timeResultDiv.textContent = "Silakan pilih kedua waktu terlebih dahulu.";
    return;
  }

  const baseDate = "1970-01-01T";
  const startDate = new Date(baseDate + startTimeInput + ":00");
  const endDate = new Date(baseDate + endTimeInput + ":00");

  if (endDate < startDate) {
      endDate.setDate(endDate.getDate() + 1);
  }

  const diffMs = endDate - startDate;
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  timeResultDiv.textContent = "Durasi: " + diffHours + " jam, " + diffMinutes + " menit.";
});
