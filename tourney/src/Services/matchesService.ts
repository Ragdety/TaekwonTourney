import api from "../Api/api";
import {IBreakingMatchesCreate} from "../Models/creationModels";
import Cookies from "js-cookie";
import routes from '../Contracts/apiRoutes'

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
    return api.get(routes.Matches.Breaking.create.replace(
        '{tournamentId}', tournamentId.toString()), headers);
};

const create = (tournamentId: number, data: IBreakingMatchesCreate) => {
    checkJwt();
    return api.post<IBreakingMatchesCreate>(routes.Matches.Breaking.create.replace(
        '{tournamentId}', tournamentId.toString()), data, headers);
};

const MatchesService = {
    getAll,
    create
};

export default MatchesService;