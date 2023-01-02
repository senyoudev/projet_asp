namespace backend.Models.outputs
{
    public class VoitureDTOTEST
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Couleur { get; set; }
        public string Photo { get; set; }
        public int Annee { get; set; }
        public int Km { get; set; }
        public DateTime DateAdded { get; set; }

        public Nullable<int> UserId { get; set; }
        public int MarqueId { get; set; }
        public double Prix { get; set; }
        public bool isAprouved { get; set; }
        public bool isDisponible { get; set; }

        public User proprietaire { get; set; }
        public User locataire { get; set; }
        public Marque Marque { get; set; }
    }
}
