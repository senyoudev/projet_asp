using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Photo { get; set; }
        public string Role { get; set; }
        public UserType UserType { get; set; }
        public DateTime DateAdded { get; set; }

        public virtual ICollection<UserRole> UserRoles { get; set; }
        public virtual ICollection<OffreSpeciale> OffreSpeciales { get; set; }
        public virtual ICollection<Voiture> Voitures { get; set; }
        public virtual ICollection<Reservation> Reservations { get; set; }
        public virtual FavoriteList FavoriteList { get; set; }
        public virtual BlackList Blacklist { get; set; }
    }
}
