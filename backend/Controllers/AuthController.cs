using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
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

        [HttpPost]
        [AllowAnonymous]
        public IActionResult Login(UserLogin user)
        {
            if (!string.IsNullOrEmpty(user.Username) &&
        !string.IsNullOrEmpty(user.Password))
            {
                var loggedInUser = _db.Users.Where(u => u.Username == user.Username && u.Password == user.Password)
        .FirstOrDefault();
                if (loggedInUser == null)
                {
                    return NotFound("User not found");
                }
                var claims = new[]
        {
                    new Claim(ClaimTypes.NameIdentifier, loggedInUser.Username),
                    new Claim(ClaimTypes.Email, loggedInUser.Email),
                    new Claim("image", loggedInUser.Photo),
                    new Claim(ClaimTypes.Role, loggedInUser.Role),
        };

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

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]
        public IActionResult test()
        {
            return Ok("authorized");
        }

    }
}
