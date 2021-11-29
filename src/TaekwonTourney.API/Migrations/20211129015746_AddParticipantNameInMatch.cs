using Microsoft.EntityFrameworkCore.Migrations;

namespace TaekwonTourney.API.Migrations
{
    public partial class AddParticipantNameInMatch : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BreakingMatches_Participants_ParticipantId",
                table: "BreakingMatches");

            migrationBuilder.DropIndex(
                name: "IX_BreakingMatches_ParticipantId",
                table: "BreakingMatches");

            migrationBuilder.AddColumn<string>(
                name: "ParticipantFirstName",
                table: "BreakingMatches",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ParticipantLastName",
                table: "BreakingMatches",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ParticipantFirstName",
                table: "BreakingMatches");

            migrationBuilder.DropColumn(
                name: "ParticipantLastName",
                table: "BreakingMatches");

            migrationBuilder.CreateIndex(
                name: "IX_BreakingMatches_ParticipantId",
                table: "BreakingMatches",
                column: "ParticipantId");

            migrationBuilder.AddForeignKey(
                name: "FK_BreakingMatches_Participants_ParticipantId",
                table: "BreakingMatches",
                column: "ParticipantId",
                principalTable: "Participants",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
