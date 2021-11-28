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
var _MatchesTableComponent_instances, _MatchesTableComponent_matchesRepository, _MatchesTableComponent_createHeaders, _MatchesTableComponent_createBody, _MatchesTableComponent_createHeader, _MatchesTableComponent_createValue, _MatchesTableComponent_createActione;
export class MatchesTableComponent {
    constructor(matchesRepository) {
        _MatchesTableComponent_instances.add(this);
        _MatchesTableComponent_matchesRepository.set(this, void 0);
        __classPrivateFieldSet(this, _MatchesTableComponent_matchesRepository, matchesRepository, "f");
    }
    async renderAsync(container, data) {
        const table = document.createElement('table');
        table.className = 'table';
        __classPrivateFieldGet(this, _MatchesTableComponent_instances, "m", _MatchesTableComponent_createHeaders).call(this, table);
        await __classPrivateFieldGet(this, _MatchesTableComponent_instances, "m", _MatchesTableComponent_createBody).call(this, table, data);
        container.appendChild(table);
    }
}
_MatchesTableComponent_matchesRepository = new WeakMap(), _MatchesTableComponent_instances = new WeakSet(), _MatchesTableComponent_createHeaders = function _MatchesTableComponent_createHeaders(table) {
    const thead = document.createElement('thead');
    table.appendChild(thead);
    const tr = document.createElement('tr');
    __classPrivateFieldGet(this, _MatchesTableComponent_instances, "m", _MatchesTableComponent_createHeader).call(this, 'Id', tr);
    __classPrivateFieldGet(this, _MatchesTableComponent_instances, "m", _MatchesTableComponent_createHeader).call(this, 'Match Teams', tr);
    __classPrivateFieldGet(this, _MatchesTableComponent_instances, "m", _MatchesTableComponent_createHeader).call(this, 'Date', tr);
    __classPrivateFieldGet(this, _MatchesTableComponent_instances, "m", _MatchesTableComponent_createHeader).call(this, 'Time', tr);
    __classPrivateFieldGet(this, _MatchesTableComponent_instances, "m", _MatchesTableComponent_createHeader).call(this, 'Result', tr);
    __classPrivateFieldGet(this, _MatchesTableComponent_instances, "m", _MatchesTableComponent_createHeader).call(this, 'Actions', tr);
    thead.appendChild(tr);
}, _MatchesTableComponent_createBody = async function _MatchesTableComponent_createBody(table, list) {
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);
    for await (let el of list) {
        const tr = document.createElement('tr');
        __classPrivateFieldGet(this, _MatchesTableComponent_instances, "m", _MatchesTableComponent_createValue).call(this, (el.uid || el.id).toString(), tr);
        __classPrivateFieldGet(this, _MatchesTableComponent_instances, "m", _MatchesTableComponent_createValue).call(this, `${el.homeTeam?.abbr} - ${el.awayTeam?.abbr}`, tr);
        __classPrivateFieldGet(this, _MatchesTableComponent_instances, "m", _MatchesTableComponent_createValue).call(this, `${el.dateTime.getDay()}/${el.dateTime.getMonth()}/${el.dateTime.getFullYear()}`, tr);
        __classPrivateFieldGet(this, _MatchesTableComponent_instances, "m", _MatchesTableComponent_createValue).call(this, `${el.dateTime.getHours()}:${el.dateTime.getMinutes()}`, tr);
        __classPrivateFieldGet(this, _MatchesTableComponent_instances, "m", _MatchesTableComponent_createValue).call(this, `${el.result.home}:${el.result.away}`, tr);
        const actionTd = __classPrivateFieldGet(this, _MatchesTableComponent_instances, "m", _MatchesTableComponent_createValue).call(this, ``, tr);
        __classPrivateFieldGet(this, _MatchesTableComponent_instances, "m", _MatchesTableComponent_createActione).call(this, 'Delete', actionTd, async () => {
            await __classPrivateFieldGet(this, _MatchesTableComponent_matchesRepository, "f").deleteAsync(el.id);
            tr.remove();
        });
        tbody.appendChild(tr);
    }
}, _MatchesTableComponent_createHeader = function _MatchesTableComponent_createHeader(name, tr) {
    const th = document.createElement('th');
    th.innerText = name;
    th.setAttribute('scope', 'col');
    tr.appendChild(th);
}, _MatchesTableComponent_createValue = function _MatchesTableComponent_createValue(value, tr) {
    const td = document.createElement('td');
    td.innerText = value;
    tr.appendChild(td);
    return td;
}, _MatchesTableComponent_createActione = function _MatchesTableComponent_createActione(text, conntainer, fn) {
    const button = document.createElement('button');
    button.className = 'btn btn-danger';
    button.innerText = text;
    conntainer.appendChild(button);
    button.addEventListener('click', () => {
        fn();
    });
    return button;
};
//# sourceMappingURL=MatchesTableComponent.js.map