using backend.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using backend.Utile;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using System.Security.Cryptography;
using NuGet.Protocol.Core.Types;
using System.Drawing;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VoitureControllercs : ControllerBase
    {
        private readonly ApiContext _db;
       
       
        public VoitureControllercs(ApiContext db)
        {
            _db = db;
           
        }
        [HttpGet]
       /* [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,
            Roles = "locataire")]*/

        public JsonResult GetVoitures()
        {
            var Voitures = _db.Voitures.ToList();
            if (Voitures == null)
            {
                return new JsonResult(NotFound());
            }
            return new JsonResult(Ok(Voitures));
        }

        [HttpGet("{id}")]
        /*[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,
            Roles = "locataire")]*/
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
        

        public async Task<ActionResult<Voiture>> AddVoiture(VoitureAjout voiture)
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
                UserId = voiture.UserId,
                MarqueId = voiture.MarqueId,
                OffreSpecialeId = voiture.OffreSpecialeId,
                Prix = voiture.Prix,
                Photo = voiture.Photo,


            };
            
            _db.Voitures.Add(newVoiture);
            await _db.SaveChangesAsync();
            return Ok(voiture);
        }


        [HttpPut("{id}")]
       
        public async Task<IActionResult> UpdateVoiture(int id, VoitureAjout voiture)
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



        // DELETE: api/TodoItems/5
        [HttpDelete("{id}")]
 
        public async Task<IActionResult> DeleteTodoItem(int id)
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
    

        private bool VoitureExists(int id)
        {
            return _db.Voitures.Any(e => e.Id == id);
        }

      





    }
}
