using backend.Data;
using backend.Models;
using backend.Models.inputs;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace backend.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class MarqueController : ControllerBase
    {
        private readonly ApiContext _db;

        public MarqueController(ApiContext db)
        {
            _db = db;
        }
        [HttpGet]

        public JsonResult GetMarques()
        {
            var marques = _db.Marques.ToList();
            if (marques == null)
            {
                return new JsonResult(NotFound());
            }
            return new JsonResult(Ok(marques));
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Marque>> GetById(int id)
        {
            // Retrieve the requested marque object from the database
            var marque = await _db.Marques.FindAsync(id);

            if (marque == null)
            {
                return NotFound();
            }

            return marque;
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]

        public async Task<IActionResult> Create(MarqueInput marque )
        {
            // Validate the incoming request data
            if (marque == null)
            {
                return BadRequest("No data provided.");
            }

            var newMarque = new Marque
            {
                DateAdded = DateTime.Now,
                Libelle = marque.Libelle,
            };

            // Add the new marque object to the database
            _db.Marques.Add(newMarque);
            await _db.SaveChangesAsync();

            return new JsonResult(Ok(marque));
        }

        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]

        public async Task<IActionResult> Delete(int id)
        {
            // Check if the marque object with the specified ID exists in the database
            var marque = await _db.Marques.FindAsync(id);
            if (marque == null)
            {
                return NotFound();
            }

            // Delete the marque object from the database
            _db.Marques.Remove(marque);
            await _db.SaveChangesAsync();

            return new JsonResult("Deleted successfully");
        }

        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]

        public async Task<IActionResult> Update(int id, MarqueInput marque)
        {
            // Validate the incoming request data
            if (marque == null || marque.Id != id)
            {
                return BadRequest("Invalid data provided.");
            }

         

            // Check if the marque object with the specified ID exists in the database
            var existingMarque = await _db.Marques.FindAsync(id);
            if (existingMarque == null)
            {
                return NotFound();
            }
            existingMarque.Libelle = marque.Libelle;

            // Update the existing marque object with the new data
            _db.Marques.Update(existingMarque);
            await _db.SaveChangesAsync();

            return new JsonResult("updated successfully");

        }
    }
}
