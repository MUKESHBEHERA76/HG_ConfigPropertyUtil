<!DOCTYPE html>
<html>

<head>
    <title>Config Manager</title>
</head>
<body>
    <!--Add property-->
    %invoke HG_ConfigPropertyUtil.v1.services:addNewProperty%
        <script>
            if('%value result%'!='')
            {
                alert('%value result%');
                document.location.replace('index.dsp');
            }
        </script>
        %onerror%
        <script>
             alert('%value errorMessage%');
             document.location.replace('index.dsp');
        </script>
        %endinvoke%
</body>
<!-- Include the external JavaScript file -->

</html>