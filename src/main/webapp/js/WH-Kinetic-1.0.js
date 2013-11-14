/**
 * Created with IntelliJ IDEA.
 * User: perer
 * Date: 2013-11-09
 * Time: 19:51
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function () {
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
    createBackLayer(stage, layer);
    createGameLayer(stage, layer);
    drawGrid(layer);
    function createYellowRectGroup() {
        var yellowRectGroup = new Kinetic.Group({
            id: 'yellowRectGroup',
            x: 250,
            y: 200,
            offset: [0, 0],
            draggable: false,
            rotateLeftHand: true,
            dragBoundFunc: function (pos) {
                if (this.getAttr('rotateLeftHand')) {
                    this.setRotation(Math.atan2(
                        stage.getPointerPosition().y - this.getY(),
                        stage.getPointerPosition().x - this.getX()
                    ));
                } else {
                    this.setRotation(Math.atan2(
                        this.getY() - stage.getPointerPosition().y,
                        this.getX() - stage.getPointerPosition().x
                    ));
                }
                return {
                    x: this.getX(),
                    y: this.getY()
                }
            }
        });
        return yellowRectGroup;
    }
    var yellowRectGroup = createYellowRectGroup();
    var yellowRect = createYellowRect(stage, layer, yellowRectGroup);
    yellowRectGroup.add(yellowRect);
    layer.add(yellowRectGroup);
    layer.draw();
});

function createYellowRect(stage, layer, yellowRectGroup) {
    var yellowRect = new Kinetic.Rect({
        id: 'yellowRect',
        x: 0,
        y: 0,
        width: 100,
        height: 50,
        fill: 'yellow',
        stroke: 'black',
        strokeWidth: 4
    });
    yellowRect.on('click', function () {
        var circle = stage.find('.yellowRectCircle')[0];
        if (typeof circle === 'undefined') {
            this.setStroke(true)
            this.setStroke('66CC66');
            this.setStrokeWidth(2);
            var circleLeft = new Kinetic.Circle({
                name: 'yellowRectCircle',
                x: this.getX(),
                y: this.getY(),
                radius: 10,
                fill: 'transparent',
                stroke: 'darkGray',
                strokeWidth: 2
            });
            var circleLeft = circleOnClick(layer, yellowRectGroup, true);
            yellowRectGroup.add(circleLeft);
            var circleRight = circleOnClick(layer, yellowRectGroup, false);
            yellowRectGroup.add(circleRight);
            layer.draw();
        }
    });
    return yellowRect;
}

function circleOnClick(layer, yellowRectGroup, leftCircle) {
    var yellowRect_l = yellowRectGroup.find('#yellowRect')[0];
    var groupX = leftCircle ? yellowRectGroup.getX() + yellowRect_l.getWidth() : yellowRectGroup.getX();
    var offsetX = leftCircle ? 0 : yellowRect_l.getWidth();
    var offsetXReverse = leftCircle ? yellowRect_l.getWidth() : 0;
    var circle = new Kinetic.Circle({
        name: 'yellowRectCircle',
        x: offsetX,
        y: yellowRect_l.getY(),
        radius: 10,
        fill: 'transparent',
        stroke: 'darkGray',
        strokeWidth: 2
    });
    circle.on('click', function () {
        if (isCirclesTransparent(yellowRectGroup)) {
            this.setFill('darkGray');
            yellowRectGroup.setX(groupX);
            yellowRectGroup.setOffset([offsetXReverse, 0]);
            yellowRectGroup.setDraggable(true);
            yellowRectGroup.setAttr('rotateLeftHand', !leftCircle);
        } else {
            setCirclesTransparent(yellowRectGroup);
            yellowRectGroup.setDraggable(false);
        }
        layer.draw();
    });
    return circle;
}

function isCirclesTransparent(yellowRectGroup) {
    var circles = yellowRectGroup.find('.yellowRectCircle');
    for (var i = 0; i < circles.length; i++) {
        if (circles[i].getFill() !== 'transparent') {
            return false;
        }
    }
    return true;
}

function setCirclesTransparent(yellowRectGroup) {
    $(yellowRectGroup.find('.yellowRectCircle')).each(function( index ) {
        this.setFill('transparent');
    });
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

function createBackLayer(stage, layer) {
    var backLayer = new Kinetic.Layer();
    backLayer.add(new Kinetic.Rect({
        x: 0,
        y: 0,
        width: stage.getWidth(),
        height: stage.getHeight(),
        name: 'backLayer'
    })); // this rect will allow us to use mouse events on the layer.
    // There's probably a better way to do this, but I don't know it.
    stage.on('click', function (evt) {
        if (evt.targetNode.attrs.name == 'backLayer') {
            var yellowRectGroup = stage.find('#yellowRectGroup')[0];
            var yellowRect = yellowRectGroup.find('#yellowRect')[0];
            yellowRectGroup.setDraggable(false);
            yellowRect.setStroke('black');
            yellowRect.setStrokeWidth(4);
            $(stage.find('.yellowRectCircle')).each(function( index ) {
                if (typeof this !== 'undefined') {
                    this.destroy();
                }
            });
            layer.draw();
        }
    });
    stage.add(backLayer);
}

function createGameLayer(stage, layer) {
    stage.add(layer);
}