const bases = {
    Identity: '/identity',
    Tournaments: '/tournaments',
    Participants: '/tournaments/{tournamentId}/participants',
    Users: '/users',
    Matches: '/tournaments/{tournamentId}/matches',
    Rankings: '/tournaments/{tournamentId}/rankings'
}

const routes = {
    Login: bases.Identity + '/login',
    Register: bases.Identity + '/register',
    Tournaments: {
        getAll: bases.Tournaments,
        get: bases.Tournaments + '/{tournamentId}',
        create: bases.Tournaments,
        update: bases.Tournaments + '/{tournamentId}',
        remove: bases.Tournaments + '/{tournamentId}',
    },
    Participants: {
        getAll: bases.Participants,
        get: bases.Participants + '/{participantId}',
        create: bases.Participants,
        update: bases.Participants + '/{participantId}',
        remove: bases.Participants + '/{participantId}',
    },
    Users: {
        getMe: bases.Users + '/me',
        getByUser: bases.Users + '/?username={username}',
        getById: bases.Users + '/?id={id}'
    },
    Matches: {
        Breaking: {
            getAll: bases.Matches,
            create: bases.Matches,
            update: bases.Matches + '/{matchId}'
        }
    },
    Rankings: {
        Breaking: {
            getAll: bases.Rankings
        }
    }
}

export default routes;