using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaekwonTourney.Contracts.v1
{
	public static class ApiRoutes
	{
		private const string Root = "api";
		private const string Version = "v1";
		private const string Base = Root + "/" + Version;

		public static class Tournaments
		{
			public const string TournamentBase = Base + "/tournaments";

			public const string GetAll = TournamentBase;
			public const string Get = TournamentBase + "/{tournamentId}";
			public const string Create = TournamentBase;
			public const string Update = TournamentBase + "/{tournamentId}";
			public const string Delete = TournamentBase + "/{tournamentId}";
		}

		public static class Identity
		{
			public const string IdentityBase = Base + "/identity";

			public const string Register = IdentityBase + "/register";
			public const string Login = IdentityBase + "/login";
		}
		
		public static class TournamentParticipants
		{
			public const string ParticipantsBase = 
				Tournaments.TournamentBase + "/{tournamentId}" + "/participants";

			public const string CreateParticipant = ParticipantsBase;
			public const string GetAllTournamentParticipants = ParticipantsBase;
			public const string GetTournamentParticipant = ParticipantsBase + "/{participantId}";
			public const string DeleteParticipant = ParticipantsBase + "/{participantId}";
		}

		public static class Users
		{
			public const string UsersBase = Base + "/users";
			
			public const string Me = UsersBase + "/me";
			public const string UserProfile = UsersBase + "/";
		}
		
		public static class Matches
		{
			public const string MatchesBase = 
				Tournaments.TournamentBase + "/{tournamentId}" + "/matches";
			
			//public const string GetTournamentMatches = MatchesBase;
			//public const string GetTournamentMatch = MatchesBase + "/{matchId}";
			public const string CreateTournamentMatch = MatchesBase;
		}
		
		public static class Rankings
		{
			public const string RankingsBase = 
				Tournaments.TournamentBase + "/{tournamentId}" + "/rankings";
			
			public const string GetTournamentRankings = RankingsBase;
			public const string CreateTournamentRankings = RankingsBase;
		}
	}
}
