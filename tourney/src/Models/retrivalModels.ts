import {
    TournamentType,
    BeltLevel, 
    BlackBeltLevel,
    UserRole
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

export interface IUser {
    Id: number,
    FirstName: string,
    LastName: string,
    Email: string,
    UserName: string,
    UserRole: UserRole
}
