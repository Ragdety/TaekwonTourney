import {BeltLevel, BlackBeltLevel, TournamentType} from '../Enums/enums';

export interface ITournamentCreate {
    Name: string,
    TournamentType: TournamentType,
    StartDate: Date,
    EndDate: Date
}

export interface IParticipantsCreate {
    FirstName: string,
    LastName: string,
    DateOfBirth: Date,
    BeltLevel: BeltLevel,
    BlackBeltLevel: BlackBeltLevel
}