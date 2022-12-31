using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class FavoriteList
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }

        
    }
}
