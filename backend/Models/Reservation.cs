using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Reservation
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        public int VoitureId { get; set; }
       
        public DateTime DatePriseEnCharge { get; set; }
        public DateTime DateRemise { get; set; }
        public double Prix { get; set; }

        [ForeignKey("UserId")]
        public virtual User User { get; set; }
        [ForeignKey("VoitureId")]
        public virtual Voiture Voiture { get; set; }
      
    }
}
