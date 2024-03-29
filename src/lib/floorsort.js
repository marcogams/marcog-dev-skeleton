// Description: This file contains the logic for the floorsort algorithm.
class Rectangle {
    constructor(i, h, l, x, y) {
        this.i = i;
        this.h = h;
        this.l = l;
        this.x = x;
        this.y = y;
    }
}

class Transition {
    constructor(y, x) {
        this.y = y;
        this.x = x;
    }
}

export class Floorsort {
    constructor(n, minL, maxL, Lfactor) {
        this.n = n;
        this.minL = minL;
        this.maxL = maxL;
        this.Lfactor = Lfactor;
        this.rectlist = [];
        this.lmax = 0;
    }

    generate() {
        generaterect(this.n, this.minL, this.maxL, this.rectlist);
        sortrectlist(this.rectlist);
        this.lmax = calclmax(this.rectlist, this.n, this.Lfactor);
        construct(this.rectlist, this.lmax, this.n);
    }
}

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generaterect(n, minL, maxL, rectlist) {
    for (let i = 0; i < n + 1; i++) {
        let h = randomInteger(minL, maxL);
        let l = randomInteger(minL, maxL);
        rectlist.push(new Rectangle(i, h, l, 0, 0));
    }
}

function sortrectlist(rectlist) {
    rectlist.sort((a, b) => b.l - a.l).sort((a, b) => b.h - a.h);
}

function calclmax(rectlist, n, Lfactor) {
    let area = 0;
    for (let i = 0; i < n; i++) {
        area += rectlist[i].h * rectlist[i].l;
    }
    let l = Lfactor * Math.sqrt(area);
    return l | 0;
}

function construct(rectlist, lmax, n) {
    let i = 0;
    let current_x = 0;
    let current_y = 0;
    let current_y_plusheight = 0;
    let leftright = true;

    var thisrowtranpoints = [];
    var nextrowtranpoints = [];

    while (i < n) {
        if (leftright == true) {
            if (current_x + rectlist[i].l <= lmax) {
                let selectedtranpoints = [];

                if (thisrowtranpoints.length != 0) { //copyif function
                    for (let j = 0; j < thisrowtranpoints.length; j++) {
                        if (thisrowtranpoints[j].x < current_x + rectlist[i].l) {
                            if (current_x <= thisrowtranpoints[j].x) {
                                selectedtranpoints.push(thisrowtranpoints[j]);
                            }
                        }
                    }
                }

                if (selectedtranpoints.length != 0) {
                    let selectedtranpointsmax_y = 0;
                    for (let j = 0; j < selectedtranpoints.length; j++) {
                        if (selectedtranpoints[j].y > selectedtranpointsmax_y) {
                            selectedtranpointsmax_y = selectedtranpoints[j].y;
                        }
                    }

                    if (selectedtranpointsmax_y > current_y) {
                        nextrowtranpoints.push(new Transition(current_y + rectlist[i].h, current_x));
                        current_y = selectedtranpointsmax_y;
                    }
                    selectedtranpoints = [];
                    selectedtranpointsmax_y = 0;
                }

                if (rectlist[i].h != rectlist[i + 1].h && current_x != lmax) {
                    nextrowtranpoints.push(new Transition(current_y + rectlist[i].h, current_x + rectlist[i].l));
                }

                rectlist[i].x = current_x;
                rectlist[i].y = current_y;

                current_x = current_x + rectlist[i].l;
                current_y_plusheight = current_y + rectlist[i].h;

                i += 1;
            }
            if (current_x + rectlist[i].l > lmax) {
                current_x = lmax;
                current_y = current_y_plusheight;
                thisrowtranpoints = nextrowtranpoints;
                nextrowtranpoints = [];

                leftright = !leftright;
            }
        }
        if (leftright == false) {
            if (current_x - rectlist[i].l >= 0) {
                let selectedtranpoints = [];

                if (thisrowtranpoints.length != 0) { //copyif function
                    for (let k = 0; k < thisrowtranpoints.length; k++) {
                        if (thisrowtranpoints[k].x > current_x - rectlist[i].l) {
                            if (current_x >= thisrowtranpoints[k].x) {
                                selectedtranpoints.push(thisrowtranpoints[k]);
                            }
                        }
                    }
                }
                if (selectedtranpoints.length != 0) {
                    let selectedtranpointsmax_y = 0;
                    for (let j = 0; j < selectedtranpoints.length; j++) {
                        if (selectedtranpoints[j].y > selectedtranpointsmax_y) {
                            selectedtranpointsmax_y = selectedtranpoints[j].y;
                        }
                    }

                    if (selectedtranpointsmax_y > current_y) {
                        nextrowtranpoints.push(new Transition(current_y + rectlist[i].h, current_x));
                        current_y = selectedtranpointsmax_y;
                    }
                    selectedtranpoints = [];
                    selectedtranpointsmax_y = 0;
                }
                if (rectlist[i].h != rectlist[i + 1].h && current_x != 0) {
                    nextrowtranpoints.push(new Transition(current_y + rectlist[i].h, current_x - rectlist[i].l));
                }

                rectlist[i].y = current_y;

                current_x = current_x - rectlist[i].l;
                current_y_plusheight = current_y + rectlist[i].h;

                rectlist[i].x = current_x;

                i += 1;
            }
            if (current_x - rectlist[i].l < 0) {
                current_x = 0;
                current_y = current_y_plusheight;
                thisrowtranpoints = nextrowtranpoints;
                nextrowtranpoints = [];

                leftright = !leftright;

            }
        }
    }
}