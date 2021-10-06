using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaekwonTourney.Contracts.v1
{
	public static class ApiRoutes
	{
		public const string Root = "api";
		public const string Version = "v1";
		public const string Base = Root + "/" + Version;

		public static class Tournaments
		{
			private const string TournamentBase = Base + "/tournaments";

			public const string GetAll = TournamentBase;
			public const string Get = TournamentBase + "/{tournamentId}";
			public const string Create = TournamentBase;
			public const string Update = TournamentBase + "/{tournamentId}";
			public const string Delete = TournamentBase + "/{tournamentId}";
		}

		public static class Identity
		{
			public const string IdentityBase = Base + "identity";

			public const string Register = IdentityBase + "/register";
			public const string Login = IdentityBase + "/login";
		}
	}
}
