function editRow(button) {
    const row = button.parentNode.parentNode;
    const configValueCell = row.querySelector('td:nth-child(3)');

    if (button.textContent === 'Edit') {
        configValueCell.contentEditable = true;
        button.textContent = 'Save';
        row.classList.add('editing'); // Add the editing class

        // Add an event listener to the "Save" button
        button.addEventListener('click', function () {
            saveRow(row);
        });
    } else {
        configValueCell.contentEditable = false;
        button.textContent = 'Edit';
        row.classList.remove('editing'); // Remove the editing class

        // Remove the event listener from the "Save" button
        button.removeEventListener('click', saveRow);
    }
}
// Select the tbody element
var tbody = document.querySelector('table tbody');

// Count the number of rows in the tbody
var rowCount = tbody.children.length;
document.getElementById('rowCount').innerHTML = 'Row Count: ' + rowCount;

document.getElementById('searchInput').addEventListener('input', function () {
    const filter = this.value.toLowerCase();
    const rows = document.querySelectorAll('tbody tr');

    rows.forEach(row => {
        const configKeyCell = row.querySelector('td:nth-child(2)');
        const shouldHide = configKeyCell.textContent.toLowerCase().indexOf(filter) === -1;

        // Set display to 'table-row' if the row should be shown, or an empty string to clear any previous styling.
        row.style.display = shouldHide ? 'none' : '';
    });
});


function openModal() {

    const modal = document.getElementById('myModal');

    modal.style.display = 'block';

}

function closeModal() {

    const modal = document.getElementById('myModal');

    modal.style.display = 'none';

}
// Table rows and pagination variables
var table = document.getElementById("myTable");
var rows = table.tBodies[0].rows;
var itemsPerPage = 5; // Change this to adjust the number of rows per page
var currentPage = 1;

// Function to display the desired page of items
function displayPage(page) {
    for (var i = 0; i < rows.length; i++) {
        if (i >= (page - 1) * itemsPerPage && i < page * itemsPerPage) {
            rows[i].style.display = "table-row";
        } else {
            rows[i].style.display = "none";
        }
    }
}

// Function to generate the pagination links
function setupPagination() {
    var pageCount = Math.ceil(rows.length / itemsPerPage);
    var pagination = document.querySelector(".pagination");
    var pageInfo = document.getElementById("page-info");

    var prevButton = document.getElementById("prev");
    var nextButton = document.getElementById("next");

    prevButton.addEventListener("click", function () {
        if (currentPage > 1) {
            currentPage--;
            displayPage(currentPage);
            updatePageInfo();
        }
    });

    nextButton.addEventListener("click", function () {
        if (currentPage < pageCount) {
            currentPage++;
            displayPage(currentPage);
            updatePageInfo();
        }
    });

    function updatePageInfo() {
        pageInfo.textContent = "Page " + currentPage + " of " + pageCount;
    }

    displayPage(currentPage);
    updatePageInfo();
}

// Initialize pagination
setupPagination();

//Delete event
function deleteRow(deleteObj) {
    // Find the closest <tr> ancestor of the clicked button
    const row = deleteObj.closest('tr');

    if (row) {
        // Assuming data is in the first and second <td> elements of the row
        const configKey = row.querySelector('td:nth-child(2)').textContent;

        const confirmation = window.confirm('Are you sure you want to delety Config property with ConfigKey='+configKey+' the edited data?');
        
        if (confirmation) {
            // User confirmed, proceed with the save action
            var url = "delete.dsp?action=deleteConfig&" + "configKey=" + configKey;
            document.location.replace(url);
        } else {
            // User canceled the action, do nothing or provide feedback
        }
    }
}
function addNewRow() {
    // Get the input values by their names
    const projectName = document.querySelector('Select[name="projectName"]').value;
    const configKey = projectName+"."+document.querySelector('input[name="configKey"]').value;
    const configValue = document.querySelector('input[name="configValue"]').value;
    var url="insert.dsp?action=newProperty&"+"projectName="+projectName+"&configKey="+configKey+"&configValue="+configValue;
    document.location.replace(url);
}
function saveRow(editObj){
    const row = editObj.closest('tr');
    if (row) {
        // Assuming data is in the first and second <td> elements of the row
       
        const configKey = row.querySelector('td:nth-child(2)').textContent;
        const configValue = row.querySelector('td:nth-child(3)').textContent;
        // Do something with the row data
        // Display a confirmation dialog
        const confirmation = window.confirm('Are you sure you want to save the edited data?');
        
        if (confirmation) {
            // User confirmed, proceed with the save action
            var url = "edit.dsp?action=editConfig&" + "configKey=" + configKey + "&configValue=" + configValue;
            document.location.replace(url);
        } else {
            // User canceled the action, do nothing or provide feedback
        }
    }
}
function loadConfig(){
    const confirmation = window.confirm('Are you sure you want to load Config to Cache?');
    if (confirmation) {
        // User confirmed, proceed with the save action
        var url = "load.dsp";
        document.location.replace(url);
    } else {
        // User canceled the action, do nothing or provide feedback
    }
}