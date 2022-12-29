using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class VoitureAjout
    {
      
        public int Id { get; set; }
       
        public string Couleur { get; set; }

        public string Photo { get; set; }
       
        public int Annee { get; set; }
       
        public int Km { get; set; }
         public int UserId { get; set; }
     
        public int MarqueId { get; set; }

        public int OffreSpecialeId { get; set; }
        public double Prix { get; set; }

      

    }
}
