import {BeltLevel, BlackBeltLevel, TournamentType} from '../Enums/enums';

export interface ITournamentCreate {
    TournamentName: string,
    TournamentType: TournamentType,
    StartDate: Date | null,
    EndDate: Date | null
}

export interface IParticipantsCreate {
    FirstName: string,
    LastName: string,
    DateOfBirth: Date | null,
    BeltLevel: BeltLevel,
    BlackBeltLevel: BlackBeltLevel
}