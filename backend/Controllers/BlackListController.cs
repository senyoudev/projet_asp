using backend.Data;
using backend.Models;
using backend.Models.inputs;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace backend.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class BlackListController : ControllerBase
    {
        private readonly ApiContext _db;

        public BlackListController(ApiContext db)
        {
            _db = db;
        }

        [HttpGet]

        public JsonResult GetBlackList()
        {
            var BlackList = _db.Blacklists.ToList();
            if (BlackList == null)
            {
                return new JsonResult(NotFound());
            }
            return new JsonResult(Ok(BlackList));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BlackList>> GetById(int id)
        {
            // Retrieve the requested marque object from the database
            var blackList = await _db.Blacklists.FindAsync(id);

            if (blackList == null)
            {
                return NotFound();
            }

            return blackList;
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]

        public async Task<ActionResult<FavoriteList>> Create(BlackListInput blackList)
        {
            // Validate the incoming request data
            if (blackList == null)
            {
                return BadRequest("No data provided.");
            }

            var user = _db.Users.Find(blackList.UserId);
            if (user == null)
            {
                return NotFound("User Not found");
            }

            var blaList = new BlackList
            {
                UserId = blackList.UserId,
            };

            // Add the new marque object to the database
            _db.Blacklists.Add(blaList);
            await _db.SaveChangesAsync();

            return new JsonResult(Ok(blaList));
        }

        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]

        public async Task<IActionResult> Update(int id, BlackListInput blackList)
        {
            // Validate the incoming request data
            if (blackList == null || blackList.Id != id)
            {
                return BadRequest("Invalid data provided.");
            }



            // Check if the marque object with the specified ID exists in the database
            var existringList = await _db.Blacklists.FindAsync(id);
            if (existringList == null)
            {
                return NotFound();
            }

            var user = _db.Users.Find(blackList.UserId);
            if (user == null)
            {
                return NotFound("User Not found");
            }
            existringList.UserId = blackList.UserId;

            // Update the existing marque object with the new data
            _db.Blacklists.Update(existringList);
            await _db.SaveChangesAsync();

            return new JsonResult("updated successfully");
        }

        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]

        public async Task<IActionResult> Delete(int id)
        {
            // Check if the marque object with the specified ID exists in the database
            var blackList = await _db.Blacklists.FindAsync(id);
            if (blackList == null)
            {
                return NotFound();
            }

            // Delete the marque object from the database
            _db.Blacklists.Remove(blackList);
            await _db.SaveChangesAsync();

            return new JsonResult("Deleted successfully");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsersInBlackList()
        {
            var users = await _db.Users
                  .Include(u => u.Blacklist)
                  .Where(u => u.FavoriteList != null)
                  .ToListAsync();

            return Ok(users);
        }

        [HttpGet("count")]
        public async Task<ActionResult<IEnumerable<User>>> GetUsersInBlackListCount()
        {
            var users = await _db.Users
                  .Include(u => u.Blacklist)
                  .Where(u => u.FavoriteList != null)
                  .CountAsync();

            return Ok(users);
        }
    }
}

