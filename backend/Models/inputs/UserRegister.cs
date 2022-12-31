using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;

namespace backend.Models
{
    public class UserRegister
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string nom { get; set; }
        public string prenom { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public UserType UserType { get; set; }

     
    }
}
