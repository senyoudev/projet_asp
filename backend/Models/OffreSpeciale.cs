using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class OffreSpeciale
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; }
        public double TauxRemise { get; set; }
        public DateTime DateExpiration { get; set; }
        public DateTime DateAdded { get; set; }

        [ForeignKey("UserId")]
        public virtual User User { get; set; }
    }
}
