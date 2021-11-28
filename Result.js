var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Result_home, _Result_away;
export class Result {
    constructor() {
        _Result_home.set(this, 0);
        _Result_away.set(this, 0);
    }
    get home() {
        return __classPrivateFieldGet(this, _Result_home, "f");
    }
    set home(value) {
        __classPrivateFieldSet(this, _Result_home, value, "f");
    }
    get away() {
        return __classPrivateFieldGet(this, _Result_away, "f");
    }
    set away(value) {
        __classPrivateFieldSet(this, _Result_away, value, "f");
    }
}
_Result_home = new WeakMap(), _Result_away = new WeakMap();
//# sourceMappingURL=Result.js.map