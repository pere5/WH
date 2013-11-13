<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="sf" %>
<%--
  Created by IntelliJ IDEA.
  User: perer
  Date: 2013-11-12
  Time: 13:23
  To change this template use File | Settings | File Templates.
--%>
    <h1>Hello World!</h1>
    <p>${message}</p>
    <c:set var="jstlTest" value="JSTL Core Tags"></c:set>
    <p>${jstlTest}</p>
    <p>KO First name: <strong data-bind="text: firstName"></strong></p>
    <p>KO Last name: <strong data-bind="text: lastName"></strong></p>
    <sf:form method="POST" commandName="registerForm">
        Email: <sf:input path="email" /><br/>
        Username: <sf:input path="username" /><br/>
        Password: <sf:password path="password" /><br/>
        <input type="submit" />
    </sf:form>