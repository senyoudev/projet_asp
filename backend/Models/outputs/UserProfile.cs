namespace backend.Models
{
    public class UserProfile
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string nom { get; set; }
        public string prenom { get; set; }
        public string Token { get; set; }
        public string Photo { get; set; }
        public string Role { get; set; }
        public UserType UserType { get; set; }
        public DateTime DateAdded { get; set; }
    }
}
