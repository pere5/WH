/**
 * Created with IntelliJ IDEA.
 * User: perer
 * Date: 2013-11-09
 * Time: 19:51
 * To change this template use File | Settings | File Templates.
 */
var globalWHUnitList = new Array();
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
    var layer = new Kinetic.Layer({
        id: 'gameLayer'
    });
    createBackLayer(stage, layer);
    stage.add(layer);
    globalWHUnitList.push(new WHUnit(stage, layer, 250, 200, 0));
    globalWHUnitList.push(new WHUnit(stage, layer, 450, 250, Math.PI / 6));
    globalWHUnitList.push(new WHUnit(stage, layer, 350, 400, Math.PI / 2));
    layer.draw();
});

function WHUnit(stage, layer, x, y, rot) {
    this.name = 'WHUnit';
    this.isLeft = null;
    this.deactivateUnitGroup = deactivateUnitGroup;
    init(this);

    function init(WHUnit) {
        WHUnit.unitGroup = new Kinetic.Group({
            x: x,
            y: y,
            rotation : rot,
            dragBoundFunc: function (pos) {
                return dragBoundFuncWHGroup(WHUnit);
            }
        });
        createUnitRect(WHUnit);
        layer.add(WHUnit.unitGroup);
    }

    function dragBoundFuncWHGroup(WHUnit) {
        var x;
        var y;
        if (WHUnit.unitGroup.isLeft == null) {
            var x1 = WHUnit.unitGroup.getX();
            var y1 = WHUnit.unitGroup.getY();
            var x2 = stage.getPointerPosition().x;
            var y2 = stage.getPointerPosition().y;
            var a = WHUnit.unitGroup.getRotation();
            if (a % (Math.PI / 2) != 0) {
                var k = Math.tan(a + Math.PI / 2);
                var l = Math.tan(a);
                var m = y1 - k * x1;
                var n = y2 - l * x2;
                x = (n - m) / (k - l);
                y = k * x + m;
            } else if (a % Math.PI === 0) {
                x = x1;
                y = y2;
            } else if ((a + Math.PI / 2) % Math.PI === 0) {
                x = x2;
                y = y1;
            } else {
                plainWrong(WHUnit);
            }
        } else if (WHUnit.unitGroup.isLeft) {
            WHUnit.unitGroup.setRotation(Math.atan2(
                WHUnit.unitGroup.getY() - stage.getPointerPosition().y,
                WHUnit.unitGroup.getX() - stage.getPointerPosition().x
            ));
            x = WHUnit.unitGroup.getX();
            y = WHUnit.unitGroup.getY();
        } else if ( ! WHUnit.unitGroup.isLeft) {
            WHUnit.unitGroup.setRotation(Math.atan2(
                stage.getPointerPosition().y - WHUnit.unitGroup.getY(),
                stage.getPointerPosition().x - WHUnit.unitGroup.getX()
            ));
            x = WHUnit.unitGroup.getX();
            y = WHUnit.unitGroup.getY();
        } else {
            plainWrong(WHUnit);
        }
        return {
            x: x,
            y: y
        }
    }

    function createUnitRect(WHUnit) {
        WHUnit.unitRect = new Kinetic.Rect({
            x: 0,
            y: 0,
            width: 100,
            height: 50,
            fill: 'yellow',
            stroke: 'black',
            strokeWidth: 4
        });
        WHUnit.unitRect.on('click', function () {
            var circle = WHUnit.unitGroup.find('.rotationCircle')[0];
            if (circle == null) {
                WHUnit.unitGroup.setDraggable(true);
                WHUnit.unitRect.setStroke('66CC66');
                WHUnit.unitRect.setStrokeWidth(2);
                createRotationCircle(WHUnit, true);
                createRotationCircle(WHUnit, false);
            }
            layer.draw();
        });
        WHUnit.unitGroup.add(WHUnit.unitRect);
    }

    function createRotationCircle(WHUnit, isLeft) {
        var rotationCircle = new Kinetic.Circle({
            name: 'rotationCircle',
            x: isLeft ? 0 : WHUnit.unitRect.getWidth(),
            y: 0,
            radius: 10,
            fill: 'transparent',
            stroke: 'darkGray',
            strokeWidth: 2
        });
        rotationCircle.on('mousedown', function () {
            var circles = WHUnit.unitGroup.find('.rotationCircle');
            if (allCirclesTransparent(circles)) {
                var offsetArray = isLeft ? [100, 0] : [0, 0];
                var moveArray = getRightCircleXY(WHUnit);
                var groupX = isLeft ? WHUnit.unitGroup.getX() + moveArray[0] : WHUnit.unitGroup.getX();
                var groupY = isLeft ? WHUnit.unitGroup.getY() + moveArray[1] : WHUnit.unitGroup.getY();
                rotationCircle.setFill('darkGray');
                WHUnit.unitGroup.setAbsolutePosition(groupX, groupY);
                WHUnit.unitGroup.setOffset(offsetArray);
                WHUnit.unitGroup.isLeft = isLeft;
            } else {
                setCirclesTransparent(circles);
                restorePositionAndOffset(WHUnit);
                WHUnit.unitGroup.isLeft = null;
            }
            layer.draw();
        });
        WHUnit.unitGroup.add(rotationCircle);
    }

    function getLeftCircleXY(WHUnit) {
        var radian = WHUnit.unitGroup.getRotation();
        var width = Math.cos(radian) * WHUnit.unitRect.getWidth();
        var height = Math.sin(radian) * WHUnit.unitRect.getWidth();
        return [-width, -height];
    }

    function getRightCircleXY(WHUnit) {
        var radian = WHUnit.unitGroup.getRotation();
        var width = Math.cos(radian) * WHUnit.unitRect.getWidth();
        var height = Math.sin(radian) * WHUnit.unitRect.getWidth();
        return [width, height];
    }

    function allCirclesTransparent(circles) {
        for (var i = 0; i < circles.length; i++) {
            if (circles[i].getFill() !== 'transparent') {
                return false;
            }
        }
        return true;
    }

    function setCirclesTransparent(circles) {
        for (var i = 0; i < circles.length; i++) {
            circles[i].setFill('transparent');
        }
    }

    function deactivateUnitGroup(WHUnit) {
        restorePositionAndOffset(WHUnit);
        WHUnit.unitGroup.setDraggable(false);
        WHUnit.unitGroup.isLeft = null;
        WHUnit.unitRect.setStroke('black');
        WHUnit.unitRect.setStrokeWidth(4);
        $(WHUnit.unitGroup.find('.rotationCircle')).each(function (index) {
            this.destroy();
        });
    }

    function restorePositionAndOffset(WHUnit) {
        if (WHUnit.unitGroup.isLeft) {
            WHUnit.unitGroup.setOffset([0, 0]);
            var moveArray = getLeftCircleXY(WHUnit);
            var groupX = WHUnit.unitGroup.isLeft ? WHUnit.unitGroup.getX() + moveArray[0] : WHUnit.unitGroup.getX();
            var groupY = WHUnit.unitGroup.isLeft ? WHUnit.unitGroup.getY() + moveArray[1] : WHUnit.unitGroup.getY();
            WHUnit.unitGroup.setAbsolutePosition(groupX, groupY);
        }
    }

    function plainWrong(WHUnit) {
        alert('This shouldn\'t happen... =/');
    }
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
    drawGrid(backLayer);
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
            $(globalWHUnitList).each(function (index) {
                this.deactivateUnitGroup(this);
            });
        }
        layer.draw();
    });
    stage.add(backLayer);
}