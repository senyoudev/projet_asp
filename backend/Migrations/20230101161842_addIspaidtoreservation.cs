using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class addIspaidtoreservation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Voitures_OffreSpeciales_OffreSpecialeId",
                table: "Voitures");

            migrationBuilder.AlterColumn<int>(
                name: "OffreSpecialeId",
                table: "Voitures",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Voitures_OffreSpeciales_OffreSpecialeId",
                table: "Voitures",
                column: "OffreSpecialeId",
                principalTable: "OffreSpeciales",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Voitures_OffreSpeciales_OffreSpecialeId",
                table: "Voitures");

            migrationBuilder.AlterColumn<int>(
                name: "OffreSpecialeId",
                table: "Voitures",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Voitures_OffreSpeciales_OffreSpecialeId",
                table: "Voitures",
                column: "OffreSpecialeId",
                principalTable: "OffreSpeciales",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
