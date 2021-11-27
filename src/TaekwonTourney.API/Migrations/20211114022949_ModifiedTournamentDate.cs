using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TaekwonTourney.API.Migrations
{
    public partial class ModifiedTournamentDate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TournamentDate",
                table: "Tournaments",
                newName: "StartDate");

            migrationBuilder.AddColumn<DateTime>(
                name: "EndDate",
                table: "Tournaments",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EndDate",
                table: "Tournaments");

            migrationBuilder.RenameColumn(
                name: "StartDate",
                table: "Tournaments",
                newName: "TournamentDate");
        }
    }
}
