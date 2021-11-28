var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _MatchesRestApiRepository_instances, _MatchesRestApiRepository_apiUrl, _MatchesRestApiRepository_jsonToMatchesMapper, _MatchesRestApiRepository_getMatches;
export class MatchesRestApiRepository {
    constructor(apiUrl, jsonToMatchesMapper) {
        _MatchesRestApiRepository_instances.add(this);
        _MatchesRestApiRepository_apiUrl.set(this, void 0);
        _MatchesRestApiRepository_jsonToMatchesMapper.set(this, void 0);
        __classPrivateFieldSet(this, _MatchesRestApiRepository_apiUrl, apiUrl, "f");
        __classPrivateFieldSet(this, _MatchesRestApiRepository_jsonToMatchesMapper, jsonToMatchesMapper, "f");
    }
    async getAllAsync() {
        const response = await fetch(__classPrivateFieldGet(this, _MatchesRestApiRepository_apiUrl, "f"));
        if (response.status === 200) {
            const responseJson = await response.text();
            const matches = __classPrivateFieldGet(this, _MatchesRestApiRepository_jsonToMatchesMapper, "f").map(responseJson);
            return __classPrivateFieldGet(this, _MatchesRestApiRepository_instances, "m", _MatchesRestApiRepository_getMatches).call(this, matches);
        }
        else {
            throw Error('Unable to fetch data');
        }
    }
}
_MatchesRestApiRepository_apiUrl = new WeakMap(), _MatchesRestApiRepository_jsonToMatchesMapper = new WeakMap(), _MatchesRestApiRepository_instances = new WeakSet(), _MatchesRestApiRepository_getMatches = async function* _MatchesRestApiRepository_getMatches(matches) {
    for (const m of matches) {
        yield m;
    }
};
//# sourceMappingURL=MatchesRestApiRespository.js.map