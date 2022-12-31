namespace backend.Models.inputs
{
    public class PaymentInput
    {
        public int Id { get; set; }
        public string Libelle { get; set; }
        public int ReservationId { get; set; }
    }
}
