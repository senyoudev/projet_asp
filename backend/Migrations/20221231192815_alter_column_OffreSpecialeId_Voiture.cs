using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class alter_column_OffreSpecialeId_Voiture : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<bool>(
               name: "OffreSpecialeId",
               table: "Voitures",
               type: "int",
               nullable: true
               );
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
              name: "OffreSpecialeId",
              table: "Voitures");
        }
    }
}
