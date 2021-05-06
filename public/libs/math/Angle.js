class Angle extends Array {
    constructor(angle) {
        super(1);

        this[0] = angle ?? 0;
    }

    static copy(angle) {
        return new Angle(angle[0]);
    }

    copy(angle) {
        this[0] = angle[0];

        return this;
    }

    add(angle) {
        this[0] += angle;

        return this;
    }

    subtract(angle) {
        this[0] -= angle;

        return this;
    }

    interpolate(percent, angle) {
        const start = this[0];
        const end = angle[0];
        let delta;
        if (end < start) {
            if (start - end > Math.PI) {
                delta = Math.PI * 2 - (start - end);
            } else {
                delta = -(start - end);
            }
        } else {
            if (end - start > Math.PI) {
                delta = -(Math.PI * 2 - (end - start));
            } else {
                delta = end - start;
            }
        }
        this[0] += delta * percent;

        return this;
    }

    normalize() {
        this[0] += Math.PI;
        this[0] -= Math.floor(this[0] / Math.PI / 2) * Math.PI * 2;
        this[0] -= Math.PI;

        return this;
    }

    invert() {
        if (this[0] > 0) {
            this[0] -= Math.PI;
        } else {
            this[0] += Math.PI;
        }

        return this;
    }

    fromVec(vec) {
        this[0] = Math.atan2(vec[1], vec[0]);
    }
}