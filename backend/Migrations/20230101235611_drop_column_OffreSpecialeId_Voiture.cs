using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class drop_column_OffreSpecialeId_Voiture : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Voitures_OffreSpeciales_OffreSpecialeId",
                table: "Voitures");

     

            migrationBuilder.DropIndex(
                name: "IX_Voitures_OffreSpecialeId",
                table: "Voitures");

            migrationBuilder.DropColumn(
                name: "OffreSpecialeId",
                table: "Voitures");

 

     
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            

      /*      migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Voitures",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");*/

            migrationBuilder.AddColumn<int>(
                name: "OffreSpecialeId",
                table: "Voitures",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Voitures_OffreSpecialeId",
                table: "Voitures",
                column: "OffreSpecialeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Voitures_OffreSpeciales_OffreSpecialeId",
                table: "Voitures",
                column: "OffreSpecialeId",
                principalTable: "OffreSpeciales",
                principalColumn: "Id");

           /* migrationBuilder.AddForeignKey(
                name: "FK_Voitures_Users_UserId",
                table: "Voitures",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");*/
        }
    }
}
