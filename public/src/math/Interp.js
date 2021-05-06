class Interp {
    _first;
    _firstTime;
    _second;
    _secondTime;

    _isObject;
    _return;

    constructor(initial) {
        if (initial) {
            this._isObject = initial instanceof Object;
            this._return = new (initial.constructor);

            if (this._isObject) {
                this._first = (new (initial.constructor)).copy(initial);
            } else {
                this._first = initial;
            }
            this._firstTime = Date.now();
        }
    }

    add(time, value) {
        if (this._isObject === undefined) {
            this._isObject = value instanceof Object;
            this._return = new (value.constructor);
        }

        if (this._isObject) {
            if (!value.copy) {
                console.error('You cannot add an object that is not copyable.', value);
                return;
            }
            if (!value.interpolate) {
                console.error('You cannot add an object that is not interpolatable.', value);
                return;
            }
            if (!value.constructor) {
                console.error('You cannot add an object that does not have a constructor.', value);
                return;
            }
        }

        this._second = this._first;
        this._secondTime = this._firstTime;

        if (this._isObject) {
            this._first = (new (value.constructor)).copy(value);
        } else {
            this._first = value;
        }
        this._firstTime = time;
    }

    get(time) {
        if (!this._first) {
            return null;
        }

        if (!this._second) {
            if (this._isObject) {
                return this._return.copy(this._first);
            }

            return this._first;
        }

        const delta = time - this._secondTime;
        const duration = this._firstTime - this._secondTime;
        const percent = Math.max(Math.min(delta / duration, 1), 0);

        if (this._isObject) {
            return this._return.copy(this._second).interpolate(percent, this._first);
        }

        return (this._first - this._second) * percent + this._second;
    }

    latest() {
        if (!this._first) {
            return null;
        }

        if (this._isObject) {
            return this._return.copy(this._first);
        }

        return this._first;
    }
}