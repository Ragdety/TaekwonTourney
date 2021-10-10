using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TaekwonTourney.API.Migrations
{
    public partial class ModifiedUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "RegisterDate",
                table: "Users",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "UserRole",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "OrganizerId",
                table: "Tournamets",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "TournamentDate",
                table: "Tournamets",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "TournamentName",
                table: "Tournamets",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TournamentType",
                table: "Tournamets",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Participant",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    BeltLevel = table.Column<int>(type: "int", nullable: false),
                    BlackBeltLevel = table.Column<int>(type: "int", nullable: true),
                    IsBlackBelt = table.Column<bool>(type: "bit", nullable: false),
                    TournamentId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Participant", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Participant_Tournamets_TournamentId",
                        column: x => x.TournamentId,
                        principalTable: "Tournamets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Tournamets_OrganizerId",
                table: "Tournamets",
                column: "OrganizerId");

            migrationBuilder.CreateIndex(
                name: "IX_Participant_TournamentId",
                table: "Participant",
                column: "TournamentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tournamets_Users_OrganizerId",
                table: "Tournamets",
                column: "OrganizerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tournamets_Users_OrganizerId",
                table: "Tournamets");

            migrationBuilder.DropTable(
                name: "Participant");

            migrationBuilder.DropIndex(
                name: "IX_Tournamets_OrganizerId",
                table: "Tournamets");

            migrationBuilder.DropColumn(
                name: "RegisterDate",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "UserRole",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "OrganizerId",
                table: "Tournamets");

            migrationBuilder.DropColumn(
                name: "TournamentDate",
                table: "Tournamets");

            migrationBuilder.DropColumn(
                name: "TournamentName",
                table: "Tournamets");

            migrationBuilder.DropColumn(
                name: "TournamentType",
                table: "Tournamets");
        }
    }
}
