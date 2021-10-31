using Microsoft.EntityFrameworkCore.Migrations;

namespace TaekwonTourney.API.Migrations
{
    public partial class RenamedTournaments : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Participants_Tournamets_TournamentId",
                table: "Participants");

            migrationBuilder.DropForeignKey(
                name: "FK_Tournamets_Users_OrganizerId",
                table: "Tournamets");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Tournamets",
                table: "Tournamets");

            migrationBuilder.RenameTable(
                name: "Tournamets",
                newName: "Tournaments");

            migrationBuilder.RenameIndex(
                name: "IX_Tournamets_OrganizerId",
                table: "Tournaments",
                newName: "IX_Tournaments_OrganizerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Tournaments",
                table: "Tournaments",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Participants_Tournaments_TournamentId",
                table: "Participants",
                column: "TournamentId",
                principalTable: "Tournaments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tournaments_Users_OrganizerId",
                table: "Tournaments",
                column: "OrganizerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Participants_Tournaments_TournamentId",
                table: "Participants");

            migrationBuilder.DropForeignKey(
                name: "FK_Tournaments_Users_OrganizerId",
                table: "Tournaments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Tournaments",
                table: "Tournaments");

            migrationBuilder.RenameTable(
                name: "Tournaments",
                newName: "Tournamets");

            migrationBuilder.RenameIndex(
                name: "IX_Tournaments_OrganizerId",
                table: "Tournamets",
                newName: "IX_Tournamets_OrganizerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Tournamets",
                table: "Tournamets",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Participants_Tournamets_TournamentId",
                table: "Participants",
                column: "TournamentId",
                principalTable: "Tournamets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tournamets_Users_OrganizerId",
                table: "Tournamets",
                column: "OrganizerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
