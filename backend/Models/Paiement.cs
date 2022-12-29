namespace backend.Models
{
    public class Paiement
    {
        public int Id { get; set; }
        public string Libelle { get; set; }

        public virtual ICollection<Reservation> Reservations { get; set; }
    }
}
