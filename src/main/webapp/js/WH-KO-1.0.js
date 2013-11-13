/**
 * Created with IntelliJ IDEA.
 * User: perer
 * Date: 2013-11-13
 * Time: 16:09
 * To change this template use File | Settings | File Templates.
 */
// This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI
function AppViewModel() {
    this.firstName = "Bert";
    this.lastName = "Bertington";
}
$(document).ready(function () {
    ko.applyBindings(new AppViewModel());
});