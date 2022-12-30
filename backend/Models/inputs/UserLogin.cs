using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;

namespace backend.Models
{
    public class UserLogin
    {
        public string Username { get; set; }
        public string Password { get; set; }

        
    }
}
