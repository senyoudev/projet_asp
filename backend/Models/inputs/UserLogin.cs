using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;

namespace backend.Models
{
    public class UserLogin
    {
        public string Username { get; set; }
        public string Password { get; set; }

        public string HashPassword(byte[] salt)
        {
           

            // Hash the password using PBKDF2 with 1000 iterations
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: Password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 1000,
                numBytesRequested: 256 / 8));

            return hashed;
        }
    }
}
