import {
    TournamentType,
    BeltLevel, 
    BlackBeltLevel
} from '../Enums/enums';

export interface ITournament {
    Id: number,
    TournamentName: string,
    TournamentType: TournamentType,
    StartDate: Date | null,
    EndDate: Date | null,
    OrganizerId: number
}

export interface IParticipant {
    Id: number,
    FirstName: string,
    LastName: string,
    DateOfBirth: Date | null,
    BeltLevel: BeltLevel,
    BlackBeltLevel: BlackBeltLevel,
    IsBlackBelt: boolean,
    TournamentId: number
}
