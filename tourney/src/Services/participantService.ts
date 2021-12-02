import api from "../Api/api";
import {IParticipantsCreate} from "../Models/creationModels";
import {IParticipant} from "../Models/retrivalModels";
import Cookies from "js-cookie";
import routes from '../Contracts/apiRoutes'
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

const getAll = (tournamentId: number, cookie: any) => {
    checkJwt();
    return api.get<Array<IParticipant>>(
        routes.Participants.getAll.replace('{tournamentId}', tournamentId.toString()),
        helpers.getHeaders(cookie));
};

const get = (tournamentId: number, id: number) => {
    checkJwt();
    return api.get<IParticipant>(
        routes.Participants.get
            .replace('{tournamentId}', tournamentId.toString())
            .replace('{participantId}', id.toString()),
        headers);
};

const create = (tournamentId: number, data: IParticipantsCreate) => {
    checkJwt();
    return api.post<IParticipantsCreate>(
        routes.Participants.create
            .replace('{tournamentId}', tournamentId.toString()),
        data,
        headers);
};

const update = (tournamentId: number, id: number, data: IParticipantsCreate) => {
    checkJwt();
    return api.put<any>(
        routes.Participants.update
            .replace('{tournamentId}', tournamentId.toString())
            .replace('{participantId}', id.toString()),
        data,
        headers);
};

const remove = (tournamentId: number, id: number) => {
    checkJwt();
    return api.delete<any>(
        routes.Participants.remove
            .replace('{tournamentId}', tournamentId.toString())
            .replace('{participantId}', id.toString()),
        headers);
};

const ParticipantService = {
    getAll,
    get,
    create,
    update,
    remove,
};

export default ParticipantService;