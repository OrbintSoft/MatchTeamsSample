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
var _MatchesNewFormComponent_instances, _MatchesNewFormComponent_matchesRepository, _MatchesNewFormComponent_teamsRepository, _MatchesNewFormComponent_createFormGroup, _MatchesNewFormComponent_createLabel, _MatchesNewFormComponent_createInput, _MatchesNewFormComponent_createSelect;
import { Match } from "./Match.js";
import { Result } from "./Result.js";
export class MatchesNewFormComponent {
    constructor(matchesRepository, teamsRepository) {
        _MatchesNewFormComponent_instances.add(this);
        _MatchesNewFormComponent_matchesRepository.set(this, void 0);
        _MatchesNewFormComponent_teamsRepository.set(this, void 0);
        __classPrivateFieldSet(this, _MatchesNewFormComponent_matchesRepository, matchesRepository, "f");
        __classPrivateFieldSet(this, _MatchesNewFormComponent_teamsRepository, teamsRepository, "f");
    }
    async saveAsync(form) {
        const data = new FormData(form);
        const match = new Match();
        match.homeTeamId = Number(data.get('homeTeam'));
        match.awayTeamId = Number(data.get('awayTeam'));
        match.timestamp = new Date(data.get('datetime').toString()).getTime();
        match.result = new Result();
        match.result.home = Number(data.get('homeResult'));
        match.result.away = Number(data.get('awayResult'));
        __classPrivateFieldGet(this, _MatchesNewFormComponent_matchesRepository, "f").createAsync(match);
    }
    async renderAsync(container) {
        const allTeamsIterable = await __classPrivateFieldGet(this, _MatchesNewFormComponent_teamsRepository, "f").getAllAsync();
        const allTeams = [];
        for await (const t of allTeamsIterable) {
            allTeams.push({
                label: t.name,
                value: t.id.toString()
            });
        }
        const homeTeamFg = __classPrivateFieldGet(this, _MatchesNewFormComponent_instances, "m", _MatchesNewFormComponent_createFormGroup).call(this, container);
        const homeTeamLb = __classPrivateFieldGet(this, _MatchesNewFormComponent_instances, "m", _MatchesNewFormComponent_createLabel).call(this, homeTeamFg, 'Home Team', 'homeTeam');
        const homeTeamIn = __classPrivateFieldGet(this, _MatchesNewFormComponent_instances, "m", _MatchesNewFormComponent_createSelect).call(this, homeTeamFg, 'homeTeam', allTeams);
        const awayTeamFg = __classPrivateFieldGet(this, _MatchesNewFormComponent_instances, "m", _MatchesNewFormComponent_createFormGroup).call(this, container);
        const awayTeamLb = __classPrivateFieldGet(this, _MatchesNewFormComponent_instances, "m", _MatchesNewFormComponent_createLabel).call(this, homeTeamFg, 'Away Team', 'awayTeam');
        const awayTeamIn = __classPrivateFieldGet(this, _MatchesNewFormComponent_instances, "m", _MatchesNewFormComponent_createSelect).call(this, homeTeamFg, 'awayTeam', allTeams);
        const dateTimeTeamFg = __classPrivateFieldGet(this, _MatchesNewFormComponent_instances, "m", _MatchesNewFormComponent_createFormGroup).call(this, container);
        const dateTimeTeamLb = __classPrivateFieldGet(this, _MatchesNewFormComponent_instances, "m", _MatchesNewFormComponent_createLabel).call(this, dateTimeTeamFg, 'Date time', 'datetime');
        const dateTimeTeamIn = __classPrivateFieldGet(this, _MatchesNewFormComponent_instances, "m", _MatchesNewFormComponent_createInput).call(this, dateTimeTeamFg, 'datetime-local', 'datetime');
        const homeResultFg = __classPrivateFieldGet(this, _MatchesNewFormComponent_instances, "m", _MatchesNewFormComponent_createFormGroup).call(this, container);
        const homeResultTeamLb = __classPrivateFieldGet(this, _MatchesNewFormComponent_instances, "m", _MatchesNewFormComponent_createLabel).call(this, homeResultFg, 'Home result', 'homeResult');
        const homeResultTeamIn = __classPrivateFieldGet(this, _MatchesNewFormComponent_instances, "m", _MatchesNewFormComponent_createInput).call(this, homeResultFg, 'number', 'homeResult');
        const awayResultFg = __classPrivateFieldGet(this, _MatchesNewFormComponent_instances, "m", _MatchesNewFormComponent_createFormGroup).call(this, container);
        const awayResultTeamLb = __classPrivateFieldGet(this, _MatchesNewFormComponent_instances, "m", _MatchesNewFormComponent_createLabel).call(this, awayResultFg, 'Away result', 'awayResult');
        const awayResultTeamIn = __classPrivateFieldGet(this, _MatchesNewFormComponent_instances, "m", _MatchesNewFormComponent_createInput).call(this, awayResultFg, 'number', 'awayResult');
    }
}
_MatchesNewFormComponent_matchesRepository = new WeakMap(), _MatchesNewFormComponent_teamsRepository = new WeakMap(), _MatchesNewFormComponent_instances = new WeakSet(), _MatchesNewFormComponent_createFormGroup = function _MatchesNewFormComponent_createFormGroup(container) {
    const el = document.createElement('div');
    el.className = 'form-group';
    container.appendChild(el);
    return el;
}, _MatchesNewFormComponent_createLabel = function _MatchesNewFormComponent_createLabel(container, label, forInput) {
    const el = document.createElement('label');
    el.setAttribute('for', forInput);
    el.innerText = label;
    container.appendChild(el);
    return el;
}, _MatchesNewFormComponent_createInput = function _MatchesNewFormComponent_createInput(container, type, name) {
    const el = document.createElement('input');
    el.className = 'form-control';
    el.setAttribute('type', type);
    el.name = name;
    container.appendChild(el);
    return el;
}, _MatchesNewFormComponent_createSelect = function _MatchesNewFormComponent_createSelect(container, name, values) {
    const el = document.createElement('select');
    el.className = 'form-control';
    for (const v of values) {
        const option = document.createElement('option');
        option.innerText = v.label;
        option.value = v.value;
        el.appendChild(option);
    }
    el.name = name;
    container.appendChild(el);
    return el;
};
//# sourceMappingURL=MatchesNewFormComponent.js.map