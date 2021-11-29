import api from "../Api/api";
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
    return api.get(routes.Rankings.Breaking.getAll.replace(
        '{tournamentId}', tournamentId.toString()), headers);
};

const RankingsService = {
    getAll
};

export default RankingsService;