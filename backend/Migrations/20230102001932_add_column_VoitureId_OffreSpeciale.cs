using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class add_column_VoitureId_OffreSpeciale : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {


            migrationBuilder.AddColumn<int>(
                name: "VoitureId",
                table: "OffreSpeciales",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_OffreSpeciales_VoitureId",
                table: "OffreSpeciales",
                column: "VoitureId");

            migrationBuilder.AddForeignKey(
                name: "FK_OffreSpeciales_Voitures_VoitureId",
                table: "OffreSpeciales",
                column: "VoitureId",
                principalTable: "Voitures",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OffreSpeciales_Voitures_VoitureId",
                table: "OffreSpeciales");



            migrationBuilder.DropIndex(
                name: "IX_OffreSpeciales_VoitureId",
                table: "OffreSpeciales");

            migrationBuilder.DropColumn(
                name: "VoitureId",
                table: "OffreSpeciales");
        }
    }
}
