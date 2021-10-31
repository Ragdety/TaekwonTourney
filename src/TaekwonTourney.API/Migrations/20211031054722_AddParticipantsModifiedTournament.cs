using Microsoft.EntityFrameworkCore.Migrations;

namespace TaekwonTourney.API.Migrations
{
    public partial class AddParticipantsModifiedTournament : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Participant_Tournamets_TournamentId",
                table: "Participant");

            migrationBuilder.DropForeignKey(
                name: "FK_Tournamets_Users_OrganizerId",
                table: "Tournamets");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Participant",
                table: "Participant");

            migrationBuilder.DropColumn(
                name: "IsBlackBelt",
                table: "Participant");

            migrationBuilder.RenameTable(
                name: "Participant",
                newName: "Participants");

            migrationBuilder.RenameIndex(
                name: "IX_Participant_TournamentId",
                table: "Participants",
                newName: "IX_Participants_TournamentId");

            migrationBuilder.AlterColumn<int>(
                name: "OrganizerId",
                table: "Tournamets",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "TournamentId",
                table: "Participants",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Participants",
                table: "Participants",
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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Participants_Tournamets_TournamentId",
                table: "Participants");

            migrationBuilder.DropForeignKey(
                name: "FK_Tournamets_Users_OrganizerId",
                table: "Tournamets");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Participants",
                table: "Participants");

            migrationBuilder.RenameTable(
                name: "Participants",
                newName: "Participant");

            migrationBuilder.RenameIndex(
                name: "IX_Participants_TournamentId",
                table: "Participant",
                newName: "IX_Participant_TournamentId");

            migrationBuilder.AlterColumn<int>(
                name: "OrganizerId",
                table: "Tournamets",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "TournamentId",
                table: "Participant",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<bool>(
                name: "IsBlackBelt",
                table: "Participant",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Participant",
                table: "Participant",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Participant_Tournamets_TournamentId",
                table: "Participant",
                column: "TournamentId",
                principalTable: "Tournamets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Tournamets_Users_OrganizerId",
                table: "Tournamets",
                column: "OrganizerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
