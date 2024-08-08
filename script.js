document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.querySelector("#work-hours-table tbody");
    const totalHoursDisplay = document.getElementById("total-hours-display");

    // Create 31 rows for each day
    for (let i = 1; i <= 31; i++) {
        const row = document.createElement("tr");

        const dayCell = document.createElement("td");
        dayCell.textContent = `اليوم ${i}`;
        row.appendChild(dayCell);

        const checkInCell = document.createElement("td");
        const checkInInput = document.createElement("input");
        checkInInput.type = "time";
        checkInCell.appendChild(checkInInput);
        row.appendChild(checkInCell);

        const checkOutCell = document.createElement("td");
        const checkOutInput = document.createElement("input");
        checkOutInput.type = "time";
        checkOutCell.appendChild(checkOutInput);
        row.appendChild(checkOutCell);

        const hoursCell = document.createElement("td");
        hoursCell.textContent = "00:00";
        row.appendChild(hoursCell);

        // Listen for time changes
        checkInInput.addEventListener("change", () => calculateHours(checkInInput, checkOutInput, hoursCell));
        checkOutInput.addEventListener("change", () => calculateHours(checkInInput, checkOutInput, hoursCell));

        tableBody.appendChild(row);
    }

    document.getElementById("calculate-total-hours").addEventListener("click", () => {
        let totalHours = 0;
        let totalMinutes = 0;

        document.querySelectorAll("#work-hours-table tbody tr").forEach(row => {
            const [hours, minutes] = row.cells[3].textContent.split(":").map(Number);
            totalHours += hours;
            totalMinutes += minutes;
        });

        // Convert excess minutes to hours
        totalHours += Math.floor(totalMinutes / 60);
        totalMinutes = totalMinutes % 60;

        totalHoursDisplay.textContent = `الإجمالي: ${totalHours} ساعات و ${totalMinutes} دقائق`;
    });

    document.getElementById("reset-data").addEventListener("click", () => {
        document.querySelectorAll("#work-hours-table tbody tr").forEach(row => {
            row.cells[1].querySelector("input").value = "";
            row.cells[2].querySelector("input").value = "";
            row.cells[3].textContent = "00:00";
        });
        totalHoursDisplay.textContent = "";
    });

    function calculateHours(checkInInput, checkOutInput, hoursCell) {
        const checkInTime = checkInInput.value.split(":").map(Number);
        const checkOutTime = checkOutInput.value.split(":").map(Number);

        if (checkInTime.length < 2 || checkOutTime.length < 2) {
            hoursCell.textContent = "00:00";
            return;
        }

        let hoursWorked = checkOutTime[0] - checkInTime[0];
        let minutesWorked = checkOutTime[1] - checkInTime[1];

        if (minutesWorked < 0) {
            minutesWorked += 60;
            hoursWorked -= 1;
        }

        if (hoursWorked < 0) {
            hoursWorked += 24;
        }

        hoursCell.textContent = `${String(hoursWorked).padStart(2, '0')}:${String(minutesWorked).padStart(2, '0')}`;
    }
});
