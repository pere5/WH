/**
 * Created with IntelliJ IDEA.
 * User: perer
 * Date: 2013-11-09
 * Time: 19:51
 * To change this template use File | Settings | File Templates.
 */
// This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI
function AppViewModel() {
    this.firstName = "Bert";
    this.lastName = "Bertington";
}

$(document).ready(function () {
    ko.applyBindings(new AppViewModel());

    var stage = new Kinetic.Stage({
        container: 'container',
        width: window.innerWidth - 300,
        height: window.innerHeight - 100
        /*
        width: $('#canvas-wrapper').width(),
        height: $('#canvas-wrapper').height(),
        */
    });
    var layer = new Kinetic.Layer();

    drawGrid(layer);
    var yellowRect = new Kinetic.Rect({
        id: 'yellowRect',
        x: 250,
        y: 200,
        width: 100,
        height: 50,
        fill: 'yellow',
        stroke: 'black',
        strokeWidth: 4,
        offset: [0, 0]
    });

    layer.add(yellowRect);
    stage.add(layer);
    yellowRect.on('click', function() {
        this.setAttr('stroke', '66CC66');
        this.setAttr('strokeWidth', 2);
        var circle = new Kinetic.Circle({
            id: 'yellowRectCircle',
            x: this.getX(),
            y: this.getY(),
            radius: 10,
            fill: 'transparent',
            stroke: 'darkGray',
            strokeWidth: 2
        });
        circle.on('mousedown', function() {
            alert('lolaa');
        });
        layer.add(circle);
        layer.draw();
    });
    $(stage.getContent()).on('click', function() {
        alert('lol');
        /*
        var yellowRect = stage.find('#yellowRect')[0];
        yellowRect.setAttr('stroke', 'black');
        yellowRect.setAttr('strokeWidth', 4);
        var circle = stage.find('#yellowRectCircle')[0];
        circle.destroy();
        */
    });
    //rotateRect(layer, yellowRect);
});

function rotateRect(layer, yellowRect) {
// one revolution per 4 seconds
    var angularSpeed = Math.PI / 2;
    var anim = new Kinetic.Animation(function (frame) {
        var angleDiff = frame.timeDiff * angularSpeed / 1000;
        yellowRect.rotate(angleDiff);
    }, layer);
    anim.start();
}

function drawGrid(layer) {
    var CELL_SIZE = 30,
        w = 200,
        h = 200,
        W = w * CELL_SIZE,
        H = h * CELL_SIZE;
    for (i = 0; i < w + 1; i++) {
        var I = i * CELL_SIZE;
        var l = new Kinetic.Line({
            strokeWidth: 1,
            stroke: "111111",
            points: [I, 0, I, H]
        });
        layer.add(l);
    }
    for (j = 0; j < h + 1; j++) {
        var J = j * CELL_SIZE;
        var l2 = new Kinetic.Line({
            strokeWidth: 1,
            stroke: "111111",
            points: [0, J, W, J]
        });
        layer.add(l2);
    }
}