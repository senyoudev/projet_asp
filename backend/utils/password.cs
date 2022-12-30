using System.Security.Cryptography;

namespace backend.utils
{
    public class password
    {
        public static byte[] GenerateSalt()
        {
            // Generate a new random salt value
            var salt = new byte[128 / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }
            return salt;
        }
    }
}
