module.exports = class {
    static labels = {
        prop1: '更新时间',
        prop2: '更新时间',
        prop3: '更新时间',
        prop4: '更新时间',
        prop5: '更新时间',
        prop6: '更新时间',
        prop7: '更新时间',
        prop8: '更新时间',
        prop9: '更新时间',
        prop10: '更新时间',
        prop11: '更新时间',
        prop12: '更新时间',
        prop13: '更新时间',
        prop14: '更新时间',
        prop15: '更新时间',
        prop16: '更新时间',
        prop17: '更新时间',
        prop18: '更新时间',
        prop19: '更新时间',
        prop20: '更新时间',
        prop21: '更新时间',
        prop22: '更新时间',
        prop23: '更新时间',
        prop24: '更新时间',
        prop25: '更新时间',
    }
    constructor(prop1, prop2, prop3, prop4, prop5, prop6, prop7, prop8, prop9, prop10, prop11, prop12, prop13, prop14, prop15, prop16, prop17, prop18, prop19, prop20, prop21, prop22, prop23, prop24, prop25) {
        this.prop1 = prop1 || ''
        this.prop2 = prop2 || ''
        this.prop3 = prop3 || ''
        this.prop4 = prop4 || ''
        this.prop5 = prop5 || ''
        this.prop6 = prop6 || ''
        this.prop7 = prop7 || ''
        this.prop8 = prop8 || ''
        this.prop9 = prop9 || ''
        this.prop10 = prop10 || ''
        this.prop11 = prop11 || ''
        this.prop12 = prop12 || ''
        this.prop13 = prop13 || ''
        this.prop14 = prop14 || ''
        this.prop15 = prop15 || ''
        this.prop16 = prop16 || ''
        this.prop17 = prop17 || ''
        this.prop18 = prop18 || ''
        this.prop19 = prop19 || ''
        this.prop20 = prop20 || ''
        this.prop21 = prop21 || ''
        this.prop22 = prop22 || ''
        this.prop23 = prop23 || ''
        this.prop24 = prop24 || ''
        this.prop25 = prop25 || ''
    }
    static getById(prop1) {
        return new Promise((resolve) => {
            resolve([{
                prop1: prop1,
                prop2: 'undef',
                prop3: 'undef',
                prop4: 'undef',
                prop5: 'undef',
                prop6: 'undef',
                prop7: 'undef',
                prop8: 'undef',
                prop9: 'undef',
                prop10: 'undef',
                prop11: 'undef',
                prop12: 'undef',
                prop13: 'undef',
                prop14: 'undef',
                prop15: 'undef',
                prop16: 'undef',
                prop17: 'undef',
                prop18: 'undef',
                prop19: 'undef',
                prop20: 'undef',
                prop21: 'undef',
                prop22: 'undef',
                prop23: 'undef',
                prop24: 'undef',
                prop25: 'undef',
            }])
        })
    }
    static list(pn, ps) {
        let result = []
        for (let i = 0; i < ps; i++) {
            result.push({
                prop1: new Date().getTime() + i,
                prop2: 'undef',
                prop3: 'undef',
                prop4: 'undef',
                prop5: 'undef',
                prop6: 'undef',
                prop7: 'undef',
                prop8: 'undef',
                prop9: 'undef',
                prop10: 'undef',
                prop11: 'undef',
                prop12: 'undef',
                prop13: 'undef',
                prop14: 'undef',
                prop15: 'undef',
                prop16: 'undef',
                prop17: 'undef',
                prop18: 'undef',
                prop19: 'undef',
                prop20: 'undef',
                prop21: 'undef',
                prop22: 'undef',
                prop23: 'undef',
                prop24: 'undef',
                prop25: 'undef',
            })
        }
        return new Promise((resolve) => {
            resolve(result)
        })
    }
    static update(obj) {
        return new Promise((resolve) => {
            resolve({
                code: 0
            })
        })
    }
    static add(obj) {
        return new Promise((resolve) => {
            resolve({
                code: 0
            })
        })
    }
    static delete(prop1) {
        return new Promise((resolve) => {
            resolve({
                code: 0
            })
        })
    }
    static count() {
        return new Promise((resolve) => {
            resolve(100)
        })
    }
}
