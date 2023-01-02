namespace backend.Models.inputs
{
    public class OffreInput
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int UserId { get; set; }
        public int VoitureId { get; set; }
        public double TauxRemise { get; set; }
        public DateTime DateExpiration { get; set; }
        public bool IsAprouved { get; set; }


    }
}
