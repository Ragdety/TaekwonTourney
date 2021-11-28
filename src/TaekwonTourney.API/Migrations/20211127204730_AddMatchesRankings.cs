using Microsoft.EntityFrameworkCore.Migrations;

namespace TaekwonTourney.API.Migrations
{
    public partial class AddMatchesRankings : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BreakingMatches",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ParticipantScore = table.Column<int>(type: "int", nullable: false),
                    ParticipantId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BreakingMatches", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BreakingMatches_Participants_ParticipantId",
                        column: x => x.ParticipantId,
                        principalTable: "Participants",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BreakingRankings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TournamentId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BreakingRankings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BreakingRankings_Tournaments_TournamentId",
                        column: x => x.TournamentId,
                        principalTable: "Tournaments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BreakingMatches_ParticipantId",
                table: "BreakingMatches",
                column: "ParticipantId");

            migrationBuilder.CreateIndex(
                name: "IX_BreakingRankings_TournamentId",
                table: "BreakingRankings",
                column: "TournamentId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BreakingMatches");

            migrationBuilder.DropTable(
                name: "BreakingRankings");
        }
    }
}
