class Box {

    constructor(value) {
        this._value = value;
    }

    map(fn) {
        return new Box(fn(this._value));
    }

    fold(fn) {
        return fn(this._value);
    }
}

module.exports = Box;
