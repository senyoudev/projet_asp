namespace backend.Models.outputs
{
    public class OffreDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }

        public int voitureId { get; set; }
        public string Name { get; set; }
        public double TauxRemise { get; set; }
        public DateTime DateExpiration { get; set; }
        public DateTime DateAdded { get; set; }

        public bool IsAprouved { get; set; }


        public virtual User User { get; set; }

        public virtual Voiture Voiture { get; set; }
    }
}
