using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class add_column_ReservationId_Paiement : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ReservationId",
                table: "Paiements",
                type: "int",
                nullable: false,
                defaultValue: 0
                );

            migrationBuilder.CreateIndex(
                name: "IX_Paiements_ReservationId",
                table: "Paiements",
                column: "ReservationId"
                
                );

            migrationBuilder.AddForeignKey(
                name: "FK_Paiements_Reservations_ReservationId",
                table: "Paiements",
                column: "ReservationId",
                principalTable: "Reservations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
        
        
        
        
        
        
      
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Paiements_Reservations_ReservationId",
                table: "Paiements");

            migrationBuilder.DropIndex(
                name: "IX_Paiements_ReservationId",
                table: "Paiements");

            migrationBuilder.DropColumn(
                name: "ReservationId",
                table: "Paiements");
        }

  
    }
}
