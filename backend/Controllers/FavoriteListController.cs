using backend.Data;
using backend.Models;
using backend.Models.inputs;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class FavoriteListController : ControllerBase
    {
        private readonly ApiContext _db;

        public FavoriteListController(ApiContext db)
        {
            _db = db;
        }

        [HttpGet]

        public JsonResult GetFavoriteList()
        {
            var FavoriteList = _db.FavoriteLists.ToList();
            if (FavoriteList == null)
            {
                return new JsonResult(NotFound());
            }
            return new JsonResult(Ok(FavoriteList));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<FavoriteList>> GetById(int id)
        {
            // Retrieve the requested marque object from the database
            var FavoriteList = await _db.FavoriteLists.FindAsync(id);

            if (FavoriteList == null)
            {
                return NotFound();
            }

            return FavoriteList;
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]

        public async Task<ActionResult<FavoriteList>> Create(FavoriteListInput favoriteList)
        {
            // Validate the incoming request data
            if (favoriteList == null)
            {
                return BadRequest("No data provided.");
            }
            var user = _db.Users.Find(favoriteList.UserId);
            if (user == null)
            {
                return NotFound("User Not found");
            }

            var favList = new FavoriteList
            {
                UserId = favoriteList.UserId,
            };

            // Add the new marque object to the database
            _db.FavoriteLists.Add(favList);
            await _db.SaveChangesAsync();

            return new JsonResult(Ok(favoriteList));
        }

        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]

        public async Task<IActionResult> Update(int id, FavoriteListInput FavoriteList)
        {
            // Validate the incoming request data
            if (FavoriteList == null || FavoriteList.Id != id)
            {
                return BadRequest("Invalid data provided.");
            }



            // Check if the marque object with the specified ID exists in the database
            var existringList = await _db.FavoriteLists.FindAsync(id);
           
            if (existringList == null)
            {
                return NotFound();
            }
            var user = _db.Users.Find(FavoriteList.UserId);
            if (user == null)
            {
                return NotFound("User Not found");
            }
            existringList.UserId = FavoriteList.UserId;

            // Update the existing marque object with the new data
            _db.FavoriteLists.Update(existringList);
            await _db.SaveChangesAsync();

            return new JsonResult("updated successfully");
        }

        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]

        public async Task<IActionResult> Delete(int id)
        {
            // Check if the marque object with the specified ID exists in the database
            var favoritelist = await _db.FavoriteLists.FindAsync(id);
            if (favoritelist == null)
            {
                return NotFound();
            }

            // Delete the marque object from the database
            _db.FavoriteLists.Remove(favoritelist);
            await _db.SaveChangesAsync();

            return new JsonResult("Deleted successfully");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsersInFavoriteList()
        {
            var users = await _db.Users
                  .Include(u => u.FavoriteList)
                  .Where(u => u.FavoriteList != null)
                  .ToListAsync();

            return Ok(users);
        }

        [HttpGet("count")]
        public async Task<ActionResult<IEnumerable<User>>> GetUsersInFavoriteListCount()
        {
            var users = await _db.Users
                  .Include(u => u.FavoriteList)
                  .Where(u => u.FavoriteList != null)
                  .CountAsync();

            return Ok(users);
        }

    }
}
