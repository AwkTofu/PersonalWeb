class Player {
    constructor(id, name, lv, exp, expNeedForLvUp) {
        this.name = name;
        this.lv = lv;
        this.exp = exp;
        this.id = id;
        this.expNeedForLvUp = expNeedForLvUp
    }

    gainExp(amt) {
        this.exp += amt;
    }
}