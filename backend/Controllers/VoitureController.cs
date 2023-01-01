using backend.Data;
using backend.Models;
using backend.Models.inputs;
using backend.utils;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VoitureController : ControllerBase
    {
        private readonly ApiContext _db;


        public VoitureController(ApiContext db)
        {
            _db = db;

        }
        [HttpGet]
        [Route("api/Voiture/")]



        public JsonResult GetVoitures()
        {
            var Voitures = _db.Voitures.ToList();
            if (Voitures == null)
            {
                return new JsonResult(NotFound());
            }
            return new JsonResult(Ok(Voitures));
        }

        [HttpGet]
        [Route("api/Voiture/{id}")]

       

        public JsonResult GetVoiture(long id)
        {
            var voiture = _db.Voitures.FindAsync(id);

            if (voiture == null)
            {
                return new JsonResult(NotFound());
            }

            return new JsonResult(Ok(voiture));
        }




        [HttpPost]

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,
            Roles = "Administrator, Proprietaire")]

        public async Task<ActionResult<Voiture>> AddVoiture(VoitureInput voiture)
        {
            if (!ModelState.IsValid || !ModelValid.IsModelValid(voiture))
            {
                return BadRequest(ModelState);
            }



            var newVoiture = new Voiture
            {
                Name = voiture.Name,
                Couleur = voiture.Couleur,
                Annee = voiture.Annee,
                Km = voiture.Km,
                DateAdded = DateTime.UtcNow,
                UserId = voiture.UserId,
                MarqueId = voiture.MarqueId,
                OffreSpecialeId = voiture.OffreSpecialeId,
                Prix = voiture.Prix,
                Photo = voiture.Photo,
                isAprouved = false,
                isDisponible=true


            };

            _db.Voitures.Add(newVoiture);
            await _db.SaveChangesAsync();
            return Ok(voiture);
        }


        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,
            Roles = "Administrator, Proprietaire")]
        public async Task<IActionResult> UpdateVoiture(int id, VoitureInput voiture)
        {
            if (id != voiture.Id)
            {
                return BadRequest();
            }

            _db.Entry(voiture).State = EntityState.Modified;

            try
            {
                await _db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (VoitureExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok();
        }

        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,
            Roles = "Administrator, Proprietaire")]
        // DELETE: api/TodoItems/5
        public async Task<IActionResult> DeleteVoiture(int id)
        {
            var voiture = await _db.Voitures.FindAsync(id);
            if (voiture == null)
            {
                return NotFound();
            }

            _db.Voitures.Remove(voiture);
            await _db.SaveChangesAsync();

            return Ok();
        }
        [HttpPut]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,
          Roles = "Administrator")]
        public async Task<IActionResult> AprovedVoiture(int id)
        {
            var voiture = await _db.Voitures.FindAsync(id);
            if (voiture == null)
            {
                return NotFound();
            }
            voiture.isAprouved = true;
            _db.Voitures.Update(voiture);
            await _db.SaveChangesAsync();
            return Ok(voiture);
        }


        
       

        [HttpGet("count")]
        public async Task<ActionResult<int>> GetVoituresCount()
        {
            var count = await _db.Voitures
                .CountAsync();

            return count;
        }

        [HttpGet("countByUser")] 
        public async Task<ActionResult<int>> GetVoituresByUserCount(int userId)
        {
            var count = await _db.Voitures
                .Where(u => u.UserId == userId)
                .CountAsync();

            return count;
        }

        [HttpGet("ByUser")]
        public async Task<ActionResult<IEnumerable<User>>> GetVoituresByUser(int userId)
        {
            var users = await _db.Voitures
                .Where(u => u.UserId == userId)
                .ToListAsync();

            return Ok(users);
        }

        [HttpGet("searchColor")]
        public async Task<ActionResult<IEnumerable<Voiture>>> searchVoitureByColor(string search)
        {
            var voitures = await _db.Voitures
                .Where(u => u.Couleur.ToLower().Contains(search.ToLower()))
                .ToListAsync();

            if (voitures == null)
            {
                return NotFound();
            }

            return voitures;
        }

        [HttpGet("searchYear")]
        public async Task<ActionResult<IEnumerable<Voiture>>> searchVoitureByYear(int search)
        {
            var voitures = await _db.Voitures
                .Where(u => u.Annee == search)
                .ToListAsync();

            if (voitures == null)
            {
                return NotFound();
            }

            return voitures;
        }

        [HttpGet("searchkm")]
        public async Task<ActionResult<IEnumerable<Voiture>>> searchVoitureBykm(int search)
        {
            var voitures = await _db.Voitures
                .Where(u => u.Km == search)
                .ToListAsync();

            if (voitures == null)
            {
                return NotFound();
            }

            return voitures;
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Voiture>>> searchVoitureByName(string search)
        {
            var voitures = await _db.Voitures
                .Where(u => u.Name.ToLower().Contains(search.ToLower()))
                .ToListAsync();

            if (voitures == null)
            {
                return NotFound();
            }

            return voitures;
        }

        // search avialable cars between two dates means not reserved 
        [HttpGet("GetAvialableVoitures")]
        public JsonResult GetAvialableVoitures(DateTime? startDate,DateTime? endDate)
        {
            if (startDate == null || endDate == null)
                return new JsonResult(BadRequest("you need to choose the dates"));
            var selectedvoitures = _db.Reservations.Where(e => (
            ((e.DateRemise < startDate) || (e.DatePriseEnCharge > startDate && e.DatePriseEnCharge > endDate))
            )).Select(e => e.Voiture).Where(v => (v.isAprouved && v.isDisponible)) 
               .ToList();

            

            if (selectedvoitures == null)
            {
                return new JsonResult(NotFound());
            }
            return new JsonResult(Ok(selectedvoitures));
        }
        /*-------------------------------------------*/

        [HttpGet("marque")]
        public async Task<ActionResult<IEnumerable<Voiture>>> GetVoituresByMarque(int marqueId)
        {
            var voitures = await _db.Voitures
                .Where(u => u.MarqueId == marqueId)
                .ToListAsync();
           

            // Return the voitures belonging to the marque
            return Ok(voitures);
        }

        [NonAction]
        private bool VoitureExists(int id)
        {
            return _db.Voitures.Any(e => e.Id == id);
        }



    }
}
