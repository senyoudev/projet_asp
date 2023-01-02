namespace backend.Models.outputs
{
    public class ReservationDTO
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int VoitureId { get; set; }
        public DateTime DatePriseEnCharge { get; set; }
        public DateTime DateRemise { get; set; }
        public double Prix { get; set; }

        public Voiture voiture { get; set; }

        public  User User { get; set; }

    }
}
