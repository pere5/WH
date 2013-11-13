<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="t" %>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="css/a.css">
    <script type="text/javascript" src="js/jquery-2.0.3.min.js"></script>
    <script type="text/javascript" src="js/knockout-3.0.0.js"></script>
    <script type="text/javascript" src="js/kinetic-v4.7.4.min.js"></script>
    <script type="text/javascript" src="js/WH-KO-1.0.js"></script>
    <script type="text/javascript" src="js/WH-Kinetic-1.0.js"></script>
</head>
<body>
    <div id="leftDiv">
        <t:insertAttribute name="body" />
    </div>
    <div id="rightDiv">
        <t:insertAttribute name="right" />
    </div>
</body>
</html>