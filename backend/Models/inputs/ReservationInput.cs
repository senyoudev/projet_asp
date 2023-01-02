using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models.inputs
{
    public class ReservationInput
    {
        public int UserId { get; set; }
        public int VoitureId { get; set; }
        public DateTime DatePriseEnCharge { get; set; }
        public DateTime DateRemise { get; set; }    
        public double Prix { get; set; }


    }
}
