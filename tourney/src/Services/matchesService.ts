import api from "../Api/api";
import {IBreakingMatchesCreate} from "../Models/creationModels";
import Cookies from "js-cookie";
import routes from '../Contracts/apiRoutes'
import {IBreakingMatchesUpdate} from "../Models/updateModels";
import helpers from "../Helpers/helpers";

const checkJwt = () => {
    let jwt = Cookies.get('jwt');

    if (jwt == null) {
        throw new Error("Unauthorized")
    }
}

const headers = {
    headers: {
        Authorization: `Bearer ${ Cookies.get('jwt') }`
    }
}

const getAll = (tournamentId: number) => {
    checkJwt();
    return api.get(routes.Matches.Breaking.getAll.replace(
        '{tournamentId}', tournamentId.toString()));
};

const create = (tournamentId: number, data: IBreakingMatchesCreate, cookie: any) => {
    checkJwt();
    return api.post<IBreakingMatchesCreate>(routes.Matches.Breaking.create.replace(
        '{tournamentId}', tournamentId.toString()), data, helpers.getHeaders(cookie));
};

const update = (tournamentId: number, 
                matchId: number, 
                data: IBreakingMatchesUpdate,
                cookie: any) => {
    checkJwt();
    return api.put<IBreakingMatchesUpdate>(routes.Matches.Breaking.update.replace(
        '{tournamentId}', tournamentId.toString())
            .replace('{matchId}', matchId.toString()), data, helpers.getHeaders(cookie));
};

const MatchesService = {
    getAll,
    create,
    update
};

export default MatchesService;