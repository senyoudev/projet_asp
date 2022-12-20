using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Marque
    {
        [Key]
        public int Id { get; set; }
        public string Libelle { get; set; }
        public DateTime DateAdded { get; set; }

        public virtual ICollection<Voiture> Voitures { get; set; }
    }
}
