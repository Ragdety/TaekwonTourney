import {
    TournamentType,
    BeltLevel, 
    BlackBeltLevel
} from '../Enums/enums';

export interface ITournament {
    Id: number,
    TournamentName: string,
    TournamentType: TournamentType,
    StartDate: Date,
    EndDate: Date,
    OrganizerId: number
}

export interface IParticipant {
    Id: number,
    FirstName: string,
    LastName: string,
    DateOfBirth: Date,
    BeltLevel: BeltLevel,
    BlackBeltLevel: BlackBeltLevel,
    IsBlackBelt: boolean,
    TournamentId: number
}
