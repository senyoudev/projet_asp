using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class drop_column_PaiementId_Reservation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {



            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_Paiements_PaiementId",
                table: "Reservations");

            migrationBuilder.DropIndex(
                name: "IX_Reservations_PaiementId",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "PaiementId",
                table: "Reservations");

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_Paiements_PaiementId",
                table: "Reservations");

            migrationBuilder.DropIndex(
                name: "IX_Reservations_PaiementId",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "PaiementId",
                table: "Reservations");
        }
    }
}
