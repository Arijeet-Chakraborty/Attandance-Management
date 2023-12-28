let startRollNo;
let totalStudents;
let holidays = [];

function generateTable() {
    startRollNo = parseInt(document.getElementById('startRollNo').value);
    totalStudents = parseInt(document.getElementById('totalStudents').value);

    const isHoliday = checkHoliday(); // Check if today is a holiday

    if (isHoliday) {
        const confirmAttendance = confirm("Today is a holiday. Do you still want to take attendance?");
        if (!confirmAttendance) return;
    }

    let tableHTML = '<table class="table table-striped"><thead><tr><th>Roll No</th><th>Attendance</th><th>Action</th></tr></thead><tbody>';

    for (let i = 0; i < totalStudents; i++) {
        const rollNo = startRollNo + i;
        tableHTML += `<tr><td>${rollNo}</td><td><input type="checkbox" id="attendance_${rollNo}" name="attendance_${rollNo}"></td><td><button onclick="deleteRow(this)">Delete</button></td></tr>`;
    }

    tableHTML += '<tr><td colspan="3"><button onclick="addRow()">Add Row</button></td></tr>';
    tableHTML += '</tbody></table>';

    const tableData = { startRollNo, totalStudents };
    saveTableData(tableData);

    document.getElementById('attendanceTable').innerHTML = tableHTML;
    document.getElementById('attendanceForm').style.display = 'none';
}

function deleteRow(btn) {
    const row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function addRow() {
    const table = document.querySelector('.table tbody');
    const lastRollNo = startRollNo + totalStudents - 1;
    const newRow = document.createElement('tr');
    newRow.innerHTML = `<td>${lastRollNo + 1}</td><td><input type="checkbox" id="attendance_${lastRollNo + 1}" name="attendance_${lastRollNo + 1}"></td><td><button onclick="deleteRow(this)">Delete</button></td>`;

    table.insertBefore(newRow, document.querySelector('.table tbody tr:last-child'));
    totalStudents++;

    // Reorder the "Add Row" button to be at the end
    table.appendChild(document.querySelector('.table tbody tr:last-child'));
}

function checkHoliday() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    const currentDate = `${year}-${month}-${day}`;
    
    return holidays.includes(currentDate);
}

function addHoliday() {
    const inputDate = document.getElementById('holidayDate').value.trim();
    if (inputDate) {
        holidays.push(inputDate);
        saveHoliday(inputDate);
        alert(`Holiday on ${inputDate} added successfully!`);
    } else {
        alert("Please enter a valid date in YYYY-MM-DD format.");
    }
}
function saveTableData(tableData) {
    axios.post('http://localhost:5501/api/table', tableData)
    .then((response) => {
        console.log(response.data);
        // Optionally, perform additional actions after saving table data
        })
        .catch((error) => {
            console.error(error);
        });
}
function saveHoliday(date) {
    axios.post('http://localhost:5501/api/holiday', { date })
        .then((response) => {
            console.log(response.data);
            // Optionally, perform additional actions after saving holiday
        })
        .catch((error) => {
            console.error(error);
        });
}

function fetchTableData() {
    axios.get('http://localhost:5501/api/table')
        .then((response) => {
        const tables = response.data;
        // Assuming tables is an array of table objects received from the server
        const tableHTML = '<table><thead><tr><th>Roll No</th><th>Attandance</th></tr></thead><tbody>';
        tables.forEach((table) => {
            tableHTML += `<tr><td>${table.startRollNo}</td><td>${table.totalStudents}</td></tr>`;
          // Replace column1, column2 with your table object keys
        });
        tableHTML += '</tbody></table>';

        document.getElementById('attendanceTable').innerHTML = tableHTML;
        })
        .catch((error) => {
        console.error(error);
        });
}