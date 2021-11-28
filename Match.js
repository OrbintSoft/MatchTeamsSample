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
var _Match_id, _Match_uid, _Match_homeTeam, _Match_awayTeam, _Match_homeTeamId, _Match_awayTeamId, _Match_timestamp, _Match_result;
export class Match {
    constructor() {
        _Match_id.set(this, null);
        _Match_uid.set(this, null);
        _Match_homeTeam.set(this, null);
        _Match_awayTeam.set(this, null);
        _Match_homeTeamId.set(this, null);
        _Match_awayTeamId.set(this, null);
        _Match_timestamp.set(this, null);
        _Match_result.set(this, null);
    }
    get id() {
        return __classPrivateFieldGet(this, _Match_id, "f");
    }
    set id(value) {
        __classPrivateFieldSet(this, _Match_id, value, "f");
    }
    get uid() {
        return __classPrivateFieldGet(this, _Match_uid, "f");
    }
    set uid(value) {
        __classPrivateFieldSet(this, _Match_uid, value, "f");
    }
    get homeTeam() {
        return __classPrivateFieldGet(this, _Match_homeTeam, "f");
    }
    set homeTeam(value) {
        __classPrivateFieldSet(this, _Match_homeTeam, value, "f");
        __classPrivateFieldSet(this, _Match_homeTeamId, value.id, "f");
    }
    get awayTeam() {
        return __classPrivateFieldGet(this, _Match_awayTeam, "f");
    }
    set awayTeam(value) {
        __classPrivateFieldSet(this, _Match_awayTeam, value, "f");
        __classPrivateFieldSet(this, _Match_awayTeamId, value.id, "f");
    }
    get dateTime() {
        return new Date(__classPrivateFieldGet(this, _Match_timestamp, "f"));
    }
    set dateTime(value) {
        __classPrivateFieldSet(this, _Match_timestamp, value.getTime(), "f");
    }
    get timestamp() {
        return __classPrivateFieldGet(this, _Match_timestamp, "f");
    }
    set timestamp(value) {
        __classPrivateFieldSet(this, _Match_timestamp, value, "f");
    }
    get result() {
        return __classPrivateFieldGet(this, _Match_result, "f");
    }
    set result(value) {
        __classPrivateFieldSet(this, _Match_result, value, "f");
    }
    get homeTeamId() {
        return __classPrivateFieldGet(this, _Match_homeTeamId, "f");
    }
    set homeTeamId(value) {
        __classPrivateFieldSet(this, _Match_homeTeamId, value, "f");
        if (__classPrivateFieldGet(this, _Match_homeTeam, "f") && __classPrivateFieldGet(this, _Match_homeTeam, "f").id !== value) {
            __classPrivateFieldSet(this, _Match_homeTeam, null, "f");
        }
    }
    get awayTeamId() {
        return __classPrivateFieldGet(this, _Match_awayTeamId, "f");
    }
    set awayTeamId(value) {
        __classPrivateFieldSet(this, _Match_awayTeamId, value, "f");
        if (__classPrivateFieldGet(this, _Match_awayTeam, "f") && __classPrivateFieldGet(this, _Match_awayTeam, "f").id !== value) {
            __classPrivateFieldSet(this, _Match_awayTeam, null, "f");
        }
    }
}
_Match_id = new WeakMap(), _Match_uid = new WeakMap(), _Match_homeTeam = new WeakMap(), _Match_awayTeam = new WeakMap(), _Match_homeTeamId = new WeakMap(), _Match_awayTeamId = new WeakMap(), _Match_timestamp = new WeakMap(), _Match_result = new WeakMap();
//# sourceMappingURL=Match.js.map