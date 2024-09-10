<!DOCTYPE html>
<html>

<head>
    <title>Config Manager</title>
    <!-- Include the external CSS file -->
    <link rel="stylesheet" type="text/css" href="style.css">

</head>

<body>
    <!-- Your HTML content goes here -->
    <div class="container">

        <div>

            <h1>Config Property Framework</h1>
            <input type="text" id="searchInput" class="search-bar" placeholder="Search by CONFIG_KEY">
            <div id="rowCount">Row Count: 0</div>
            <button class="action-btn" onclick="loadConfig()">Load Config</button>
            <table id="myTable">

                <thead>

                    <tr>

                        <th>PACKAGE_NAME</th>

                        <th>CONFIG_KEY</th>

                        <th>CONFIG_VALUE</th>

                        <th colspan="2">Action</th>

                    </tr>

                </thead>
                %invoke HG_ConfigPropertyUtil.v1.adapter:selectConfigProperty%
                    <tbody>
                        %loop selectConfigPropertyOutput/results%
                        <tr>

                            <td contenteditable="false">%value PACKAGE_NAME%</td>

                            <td contenteditable="false">%value CONFIG_KEY%</td>

                            <td contenteditable="true">%value CONFIG_VALUE%</td>

                            <td><button class="action-btn" onclick="editRow(this)">Edit</button></td>
                            <td><button class="action-btn" onclick="deleteRow(this)">Delete</button></td>

                        </tr>
                        %endloop%
                    </tbody>
                    %onerror%
                    <script>
                                             
                        alert("%value errorMessage%");
                        
                    </script>
                    %endinvoke%
            </table>

            <button class="add-row-btn" onclick="openModal()">Add Property</button>
            <div class="pagination">
                <a id="prev">Previous</a>
                <span id="page-info"></span>
                <a id="next">Next</a>
            </div>
        </div>
        <div id="myModal" class="modal">

            <div class="modal-content">

                <h2>Add New Row</h2>
				<select id="newProjectName" class="modal-input" name="projectName">
				%invoke wm.server.packages:packageList%
							%loop packages%

<option name="projectName" value ="%value name%">%value name%</option>
	%endloop%%
    %endinvoke%
</select>

                <input id="newConfigKey" class="modal-input" type="text" placeholder="CONFIG_KEY" name="configKey">

                <input id="newConfigValue" class="modal-input" type="text" placeholder="CONFIG_VALUE" name="configValue">

                <button class="action-btn" onclick="addNewRow()">Add</button>

                <button class="action-btn" onclick="closeModal()">Cancel</button>

            </div>

        </div>
</body>
<!-- Include the external JavaScript file -->
<script src="script.js"></script>

</html>