import api from "../Api/api";
import {ITournamentCreate} from "../Models/creationModels";
import {ITournament} from "../Models/retrivalModels";
import Cookies from "js-cookie";
import routes from '../Contracts/apiRoutes'
import {TourneyTime} from "../Enums/enums";

const checkJwt = () => {
    let jwt = Cookies.get('jwt');

    if (jwt == null) {
        throw new Error("Unauthorized")
    }
}

const headers = {
    headers: {
        Authorization: `Bearer ${Cookies.get('jwt')}`
    }
}

const getHeaders = (cookieJWT: any) => {
    return {
        headers: {
            Authorization: `Bearer ${cookieJWT}`
        }
    };
}

const getAll = () => {
    checkJwt();
    return api.get<Array<ITournament>>(routes.Tournaments.getAll, headers);
};

const getByDateEnum = (time: TourneyTime, cookieJWT: any) => {
    checkJwt();
    if(time == TourneyTime.Past) {
        return api.get<Array<ITournament>>(routes.Tournaments.getAll + '/?TournamentTime=Past', getHeaders(cookieJWT));
    }
    else if(time == TourneyTime.Current) {
        return api.get<Array<ITournament>>(routes.Tournaments.getAll + '/?TournamentTime=Current', getHeaders(cookieJWT));
    }
    else if(time == TourneyTime.Future) {
        return api.get<Array<ITournament>>(routes.Tournaments.getAll + '/?TournamentTime=Future', getHeaders(cookieJWT));
    }
    else {
        return getAll();
    }
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
    getByDateEnum,
    get,
    create,
    update,
    remove,
};

export default TournamentService;