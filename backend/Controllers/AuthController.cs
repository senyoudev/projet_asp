using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Reflection;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace backend.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly ApiContext _db;
        private readonly IConfiguration Configuration;

        public AuthController(ApiContext db, IConfiguration configuration)
        {
            _db = db;
            Configuration = configuration;
        }
        //register functionnality
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Register(UserRegister user)
        {
            if(IsModelValid(user))
            {
                var newUser = _db.Users.Where(u => u.Username == user.Username)
        .FirstOrDefault();
                if(newUser != null)
                {
                    return Conflict("User already exists");
                }
                // Use a secure random salt
                byte[] salt = new byte[128 / 8];
                using (var rng = RandomNumberGenerator.Create())
                {
                    rng.GetBytes(salt);
                }
                var registredUser = new User
                {
                    Username = user.Username,
                    Email = user.Email,
                    Photo = user.Photo,
                    DateAdded = DateTime.UtcNow,
                    Password = user.HashPassword(salt),
                    UserType = 0,
                    Role = user.Role,
                    Salt = salt
                };

                _db.Users.Add(registredUser);
                await _db.SaveChangesAsync();

                var claims = new[]
       {
                    new Claim(ClaimTypes.NameIdentifier, registredUser.Username),
                    new Claim(ClaimTypes.Email, registredUser.Email),
                    new Claim(ClaimTypes.Role, registredUser.Role),
        };

                var tokenString = generateToken(claims);

                var UserProfile = new UserProfile
                {
                    Id = registredUser.Id,
                    Username = registredUser.Username,
                    DateAdded = registredUser.DateAdded,
                    Token = tokenString,
                    Email = registredUser.Email,
                    Photo = registredUser.Photo,
                    UserType = registredUser.UserType,
                    Role = registredUser.Role,
                };

                return Ok(UserProfile);


            }
            return BadRequest("Invalid user credentials");

        }

        //login functionnality
        [HttpPost]
        [AllowAnonymous]
        public IActionResult Login(UserLogin user)
        {
            if (IsModelValid(user))
            {
                var loggedInUser = _db.Users.Where(u => u.Username == user.Username)
        .FirstOrDefault();
                if (loggedInUser == null)
                {
                    return Ok("Username not found");
                }
                // Check if the provided password matches the stored hashed password
                bool isPasswordValid = loggedInUser.Password.Equals(user.HashPassword(loggedInUser.Salt));
                if(!isPasswordValid)
                {
                    return Unauthorized("Password is wrong");
                }

                var claims = new[]
        {
                    new Claim(ClaimTypes.NameIdentifier, loggedInUser.Username),
                    new Claim(ClaimTypes.Email, loggedInUser.Email),
                    new Claim(ClaimTypes.Role, loggedInUser.Role),
        };

                var tokenString = generateToken(claims);

                var UserProfile = new UserProfile
                {
                    Id = loggedInUser.Id,
                    Username = loggedInUser.Username,
                    DateAdded = loggedInUser.DateAdded,
                    Token = tokenString,
                    Email = loggedInUser.Email,
                    Photo = loggedInUser.Photo,
                    UserType = loggedInUser.UserType,
                    Role = loggedInUser.Role,
                };

                return Ok(UserProfile);

            }
            return BadRequest("Invalid user credentials");
        }

        



        //function that generate the token
        [NonAction]
        public string generateToken(Claim[] claims)
        {
            var token = new JwtSecurityToken
                    (
                       issuer: Configuration["Jwt:Issuer"],
                       audience: Configuration["Jwt:Audience"],
                       claims: claims,
                       expires: DateTime.UtcNow.AddDays(60),
                       notBefore: DateTime.UtcNow,
                       signingCredentials: new SigningCredentials(
                           new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"])),
                           SecurityAlgorithms.HmacSha256)
                    );
            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);
            return tokenString;
        }

        //function that checks if the class is all set and there is no empty property
        [NonAction]
        public static bool IsModelValid<T>(T model)
        {
            foreach (PropertyInfo property in model.GetType().GetProperties())
            {
                if (property.PropertyType == typeof(string))
                {
                    string value = (string)property.GetValue(model);
                    if (string.IsNullOrEmpty(value))
                    {
                        return false;
                    }
                }
            }

            return true;
        }

    }
}
