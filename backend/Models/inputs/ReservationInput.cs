using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models.inputs
{
    public class ReservationInput
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int VoitureId { get; set; }
        public int PaiementId { get; set; }
      
        public double Prix { get; set; }

       
    }
}
