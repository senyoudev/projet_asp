namespace backend.Models.inputs
{
    public class ReservationInput
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int VoitureId { get; set; }
        public DateTime DatePriseEnCharge { get; set; }
        public DateTime DateRemise { get; set; }    
        public double Prix { get; set; }
    }
}
