using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Voiture
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Couleur { get; set; }
        public string Photo { get; set; }
        public int Annee { get; set; }
        public int Km { get; set; }
        public DateTime DateAdded { get; set; }

        public Nullable<int> UserId { get; set; }
        public int MarqueId { get; set; }
        public int OffreSpecialeId { get; set; }
        public double Prix { get; set; }
        public bool isAprouved { get; set; }
        public bool isDisponible { get; set; }

        [ForeignKey("UserId")]

        public virtual User User { get; set; }
        //[ForeignKey("MarqueId")]
        //public virtual Marque Marque { get; set; }
        [ForeignKey("OffreSpecialeId")]
        public  virtual OffreSpeciale OffreSpeciale { get; set; }





    }
}
