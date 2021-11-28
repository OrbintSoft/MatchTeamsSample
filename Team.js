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
var _Team_id, _Team_uid, _Team_name, _Team_abbr;
export class Team {
    constructor() {
        _Team_id.set(this, null);
        _Team_uid.set(this, null);
        _Team_name.set(this, null);
        _Team_abbr.set(this, null);
    }
    get id() {
        return __classPrivateFieldGet(this, _Team_id, "f");
    }
    set id(value) {
        __classPrivateFieldSet(this, _Team_id, value, "f");
    }
    get uid() {
        return __classPrivateFieldGet(this, _Team_uid, "f");
    }
    set uid(value) {
        __classPrivateFieldSet(this, _Team_uid, value, "f");
    }
    get name() {
        return __classPrivateFieldGet(this, _Team_name, "f");
    }
    set name(value) {
        __classPrivateFieldSet(this, _Team_name, value, "f");
    }
    get abbr() {
        return __classPrivateFieldGet(this, _Team_abbr, "f");
    }
    set abbr(value) {
        __classPrivateFieldSet(this, _Team_abbr, value, "f");
    }
}
_Team_id = new WeakMap(), _Team_uid = new WeakMap(), _Team_name = new WeakMap(), _Team_abbr = new WeakMap();
//# sourceMappingURL=Team.js.map