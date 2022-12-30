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


        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,
            Roles = "administrator")]

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

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,
            Roles = "administrator")]

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
            Roles = "administrator, Proprietaire")]

        public async Task<ActionResult<Voiture>> AddVoiture(VoitureInput voiture)
        {
            if (!ModelState.IsValid || !ModelValid.IsModelValid(voiture))
            {
                return BadRequest(ModelState);
            }



            var newVoiture = new Voiture
            {
                Couleur = voiture.Couleur,
                Annee = voiture.Annee,
                Km = voiture.Km,
                DateAdded = DateTime.UtcNow,
                UserId = voiture.UserId,
                MarqueId = voiture.MarqueId,
                OffreSpecialeId = voiture.OffreSpecialeId,
                Prix = voiture.Prix,
                Photo = voiture.Photo,
                isAprouved = false


            };

            _db.Voitures.Add(newVoiture);
            await _db.SaveChangesAsync();
            return Ok(voiture);
        }


        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,
            Roles = "administrator, Proprietaire")]
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
            Roles = "administrator, Proprietaire")]
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
          Roles = "administrator")]
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


        //api pou get the voiture cree par une proprietaire
        [HttpGet]
        [Route("api/Voiture/{id}/proprietaire")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,
            Roles = "administrator, Proprietaire")]

        public IActionResult getVoituresProprietaire(int id)
        {

            List<Voiture> result = new List<Voiture> { };
            var containsIQuery =
                  from res in _db.Voitures
                  where res.UserId == id
                  select res;

            foreach (var res in containsIQuery)
            {
                result.Add(res);
            }
            if (result.IsNullOrEmpty())
            {
                return NoContent();
            }
            return Ok(result.ToList());
        }


        [NonAction]
        private bool VoitureExists(int id)
        {
            return _db.Voitures.Any(e => e.Id == id);
        }



    }
}
