using backend.utils;
using backend.Data;
using backend.Models;
using backend.Models.inputs;
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
            if (ModelState.IsValid && ModelValid.IsModelValid(user))
            {
                var newUser = _db.Users.Where(u => u.Username == user.Username)
        .FirstOrDefault();
                if(newUser != null)
                {
                    return Conflict("User already exists");
                }
                // Use a secure random salt
                var salt = password.GenerateSalt();
                var registredUser = new User
                {
                    Username = user.Username,
                    Email = user.Email,
                    nom = user.nom,
                    prenom = user.prenom,
                    Photo = user.Photo,
                    DateAdded = DateTime.UtcNow,
                    Password = password.HashPassword(salt,user.Password),
                    UserType = 0,
                    Role = user.Role,
                    Salt = salt
                };

                _db.Users.Add(registredUser);
                await _db.SaveChangesAsync();

                var claims = new[]
       {
                    new Claim(ClaimTypes.Name, registredUser.Username),
                    new Claim(ClaimTypes.NameIdentifier, registredUser.Id.ToString()),
                    new Claim(ClaimTypes.Email, registredUser.Email),
                    new Claim(ClaimTypes.Role, registredUser.Role.ToString()),
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
                    nom = registredUser.nom,
                    prenom = registredUser.prenom,
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
            if (ModelState.IsValid && ModelValid.IsModelValid(user))
            {
                var loggedInUser = _db.Users.Where(u => u.Username == user.Username)
        .FirstOrDefault();
                if (loggedInUser == null)
                {
                    return Ok("Username not found");
                }
                // Check if the provided password matches the stored hashed password
                bool isPasswordValid = loggedInUser.Password.Equals(password.HashPassword(loggedInUser.Salt,user.Password));
                if(!isPasswordValid)
                {
                    return Unauthorized("Password is wrong");
                }

                var claims = new[]
        {
                    new Claim(ClaimTypes.Name, loggedInUser.Username),
                    new Claim(ClaimTypes.NameIdentifier, loggedInUser.Id.ToString()),
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
                    nom = loggedInUser.nom,
                    prenom = loggedInUser.prenom,
                };

                return Ok(UserProfile);

            }
            return BadRequest("Invalid user credentials");
        }

        //change password
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult> ChangePassword(ChangePasswordInput changePasswordInput)
        {
            var user = await _db.Users.FindAsync(changePasswordInput.Id);
            if (user == null)
            {
                return NotFound();
            }
            var hashedCurrentPassword = password.HashPassword(user.Salt,changePasswordInput.CurrentPassword);

            
            if (!hashedCurrentPassword.SequenceEqual(user.Password))
            {
                return BadRequest();
            }

            // Generate a new salt value and hash the new password
            var newSalt = password.GenerateSalt();
            var hashedNewPassword = password.HashPassword(newSalt,changePasswordInput.NewPassword);

            // Update the password and salt values in the database
            user.Password = hashedNewPassword;
            user.Salt = newSalt;

            _db.SaveChangesAsync();
            return Ok();
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

       

    }
}
