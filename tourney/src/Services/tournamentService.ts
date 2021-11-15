import api from "../Api/api";
import {ITournamentCreate} from "../Models/creationModels";
import {ITournament} from "../Models/retrivalModels";
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

const getAll = () => {
    checkJwt();
    return api.get<Array<ITournament>>(routes.Tournaments.getAll, headers);
};

const get = (id: number) => {
    checkJwt();
    return api.get<any>(
        routes.Tournaments.get.replace('{tournamentId}', id.toString()), 
        headers);
};

const create = (data: ITournamentCreate) => {
    checkJwt();
    return api.post<ITournamentCreate>(
        routes.Tournaments.create, 
        data, 
        headers);
};

const update = (id: number, data: ITournamentCreate) => {
    checkJwt();
    return api.put<any>(
        routes.Tournaments.update.replace('{tournamentId}', id.toString()), 
        data, 
        headers);
};

const remove = (id: number) => {
    checkJwt();
    return api.delete<any>(
        routes.Tournaments.remove.replace('{tournamentId}', id.toString()), 
        headers);
};

const TournamentService = {
    getAll,
    get,
    create,
    update,
    remove,
};

export default TournamentService;