var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _JsonMatchesMapper_instances, _JsonMatchesMapper_mapTeam;
import { Match } from "./Match.js";
import { Result } from "./Result.js";
import { Team } from "./Team.js";
export class JsonMatchesMapper {
    constructor() {
        _JsonMatchesMapper_instances.add(this);
    }
    map(responseJson) {
        const obj = JSON.parse(responseJson);
        const result = [];
        if (obj) {
            const doc = obj.doc || [];
            if (doc.length > 0) {
                for (const event of doc) {
                    if (event) {
                        const data = event.data;
                        if (data) {
                            const matches = data.matches;
                            if (matches) {
                                for (const p in matches) {
                                    if (matches.hasOwnProperty(p)) {
                                        const matchObj = matches[p];
                                        const uid = Number(p);
                                        if (!isNaN(uid) && matchObj) {
                                            const match = new Match();
                                            match.uid = uid;
                                            const time = matchObj.time;
                                            if (time && typeof (time.uts) === 'number') {
                                                const dateTime = new Date(time.uts * 1000);
                                                match.dateTime = dateTime;
                                            }
                                            const resultObj = matchObj.result;
                                            if (resultObj) {
                                                const result = new Result();
                                                if (typeof (resultObj.home) === 'number') {
                                                    result.home = resultObj.home;
                                                }
                                                if (typeof (resultObj.away) === 'number') {
                                                    result.away = resultObj.away;
                                                }
                                                match.result = result;
                                            }
                                            const teamsObj = matchObj.teams;
                                            if (teamsObj) {
                                                const homeTeamObj = teamsObj.home;
                                                match.homeTeam = __classPrivateFieldGet(this, _JsonMatchesMapper_instances, "m", _JsonMatchesMapper_mapTeam).call(this, homeTeamObj);
                                                const awayTeamObj = teamsObj.away;
                                                match.awayTeam = __classPrivateFieldGet(this, _JsonMatchesMapper_instances, "m", _JsonMatchesMapper_mapTeam).call(this, awayTeamObj);
                                            }
                                            result.push(match);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return result;
    }
}
_JsonMatchesMapper_instances = new WeakSet(), _JsonMatchesMapper_mapTeam = function _JsonMatchesMapper_mapTeam(obj) {
    if (obj && typeof (obj.uid) === 'number') {
        const team = new Team();
        team.uid = obj.uid;
        if (typeof (obj.name) === 'string') {
            team.name = obj.name;
        }
        if (typeof (obj.abbr) === 'string') {
            team.abbr = obj.abbr;
        }
        return team;
    }
    return null;
};
//# sourceMappingURL=JsonMatchesMaper.js.map