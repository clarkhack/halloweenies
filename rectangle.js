function Point(x, y) {
    this.x = x;
    this.y = y;
}

function Rectangle(x, y, w, h) {
    if (x === undefined && y === undefined && w === undefined && h === undefined) {
        x = 0;
        y = 0;
        w = 0;
        h = 0;
    }
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
}

Rectangle.prototype.setNewRect = function(rect) {
    this.x = rect.x;
    this.y = rect.y;
    this.w = rect.w;
    this.h = rect.h;
};

Rectangle.prototype.getArea = function() {
    return this.w * this.h;
};
// contains() parameter can either be a rect OR a point. 
Rectangle.prototype.contains = function(point) {
    if (point.x >= this.x && point.x <= this.x + this.w)
        if (point.y >= this.y && point.y <= this.y + this.h)
            return true;
    return false;
};
Rectangle.prototype.equals = function(rect) {
    if (rect.x === this.x && rect.w === this.w &&
            rect.y === this.y && rect.h === this.h)
        return true;
    return false;
};

Rectangle.prototype.toString = function() {
    return "(" + this.x + ", " + this.y + ", " + this.w +
            ", " + this.h + ")";
};