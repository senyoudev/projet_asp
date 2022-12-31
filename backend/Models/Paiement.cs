using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Paiement
    {
        public int Id { get; set; }
        public string Libelle { get; set; }

        public int ReservationId { get; set; }

        [ForeignKey("ReservationId")]
        public virtual Reservation Reservation { get; set; }

        //public virtual ICollection<Reservation> Reservations { get; set; }
    }
}
