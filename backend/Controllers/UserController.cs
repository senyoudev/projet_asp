using backend.Data;
using backend.Models;
using backend.Models.inputs;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace backend.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly ApiContext _db;

        public UserController(ApiContext db)
        {
            _db = db;
        }

        /*
         * getuserbyid(int id) : done
         * deleteuser(int id) 
         * updateUserById(int id,UserInput id)
         * getProfile() : done
         * getAllUser() : done
         * getAllLocataires()
         * getAllProprietaires()
         * updateUserProfile()
         * 
         * 
         * GET api/users: Retrieves a list of all users. done
            GET api/users/{id}: Retrieves a specific user by ID.
            POST api/users: Creates a new user. already done
            PUT api/users/{id}: Updates an existing user.
            DELETE api/users/{id}: Deletes an existing user.
         * 
         */

        [HttpGet]
        [AllowAnonymous]
        public JsonResult GetUsers()
        {
            var users = _db.Users.Include(u => u.FavoriteList).Include(u => u.Blacklist).ToList();
            if (users == null)
            {
                return new JsonResult(NotFound());
            }
            return new JsonResult(Ok(users));
        }


        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

        public async Task<IActionResult> GetLoggedInProfile()
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            // Retrieve the requested marque object from the database
            var user = await _db.Users.FindAsync(userId);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }
        [HttpGet("id")]
        public async Task<IActionResult> GetUserById(int userId)
        {
            // Retrieve the requested marque object from the database
            var user = await _db.Users.FindAsync(userId);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<User>>> SearchUsers(string search)
        {
            var users = await _db.Users
                .Where(u => u.Username.Contains(search) || u.nom.Contains(search) || u.prenom.Contains(search))
                .ToListAsync();

            if (users == null)
            {
                return NotFound();
            }

            return users;
        }

        [HttpGet("userRoles")]
        public async Task<ActionResult<int>> GetUsersByRole(string role)
        {
            var users = await _db.Users
                .Where(u => u.Role.ToLower().Equals(role.ToLower()))
                .ToListAsync();

            return Ok(users);
        }

        [HttpGet("count")]
        public async Task<ActionResult<int>> GetUserCountByRole(string role)
        {
            var count = await _db.Users
                .Where(u => u.Role.ToLower().Equals(role.ToLower()))
                .CountAsync();

            return count;
        }

        //update profile
        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult> UpdateProfile(UserUpdateInput user)
        {
            //GEt the id of the loggedInuser
            var id = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

            // Get the user from the database
            var existingUser = await _db.Users.FindAsync(id);
            if (existingUser == null)
            {
                return NotFound();
            }

            // Update the user's properties
            existingUser.Email = user.Email;
            existingUser.Username = user.Username;
            existingUser.Photo = user.Photo;
            existingUser.nom = user.nom;
            existingUser.prenom = user.prenom;

            // Save the changes to the database
            await _db.SaveChangesAsync();

            return new JsonResult("updated successfully");
        }
        //update a user by its id,need authorization by administrator
        [HttpPut("admin")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]

        public async Task<ActionResult> UpdateUser(int id, UserUpdateInput user)
        {
            // Get the user from the database
            var existingUser = await _db.Users.FindAsync(id);
            if (existingUser == null)
            {
                return NotFound();
            }

            // Update the user's properties
            existingUser.Email = user.Email;
            existingUser.Username = user.Username;
            existingUser.Photo = user.Photo;
            existingUser.nom = user.nom;
            existingUser.prenom = user.prenom;
            existingUser.Role = user.role;

            // Save the changes to the database
            await _db.SaveChangesAsync();

            return new JsonResult("updated successfully");
        }
        //delete a user by id
        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]
        public async Task<ActionResult> DeleteUser(int id)
        {
            // Get the user from the database
            var user = await _db.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            // Mark the user as deleted
            _db.Users.Remove(user);

            // Save the changes to the database
            await _db.SaveChangesAsync();

            return new JsonResult("Removed successfully successfully");
        }

    }
}
