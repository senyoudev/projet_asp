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
    public class ReservationController : ControllerBase
    {
        private readonly ApiContext _db;

        public ReservationController(ApiContext db)
        {
            _db = db;
        }
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,
             Roles = "administrator")]

        public JsonResult GetReservations()
        {
            var Reservations = _db.Reservations.ToList();
            if (Reservations == null)
            {
                return new JsonResult(NotFound());
            }
            return new JsonResult(Ok(Reservations));
        }
        [HttpGet("{idVoiture}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,
             Roles = "administrator,Proprietaire")]

        //Api pour get the reservation effectuer sur une voiture
        public ActionResult GetHisReservationVoiture(int idVoiture)
        {
            List<Reservation> result = new List<Reservation> { };
            var containsIQuery =
                  from res in _db.Reservations
                  where res.VoitureId == idVoiture
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
        [HttpGet("{idUser}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,
             Roles = "administrator,Proprietaire")]
        //get the historique reservation effectuer par un user 
        public IActionResult getUserReservation(int idUser)
        {
            List<Reservation> result = new List<Reservation> { };
            var containsIQuery =
                  from resUser in _db.Reservations
                  where resUser.UserId == idUser
                  select resUser;

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
        [HttpGet("{id}")]

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,
             Roles = "administrator")]
        public JsonResult GetReservation(int id)
        {
            var reservation = _db.Reservations.FindAsync(id);

            if (reservation == null)
            {
                return new JsonResult(NotFound());
            }

            return new JsonResult(Ok(reservation));
        }




        [HttpPost]

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,
             Roles = "administrator,Proprietaire,Locataire")]
        public async Task<ActionResult<Reservation>> AddReservation(ReservationInput reservation)
        {
            if (!ModelState.IsValid || !ModelValid.IsModelValid(reservation))
            {
                return BadRequest(ModelState);
            }



            var newReservation = new Reservation
            {
                UserId = reservation.UserId,
                VoitureId = reservation.VoitureId,
                PaiementId = reservation.PaiementId,
                DatePriseEnCharge = DateTime.UtcNow,
                Prix = reservation.Prix



            };

            _db.Reservations.Add(newReservation);
            await _db.SaveChangesAsync();
            return Ok(newReservation);
        }

        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,
             Roles = "administrator,Proprietaire,Locataire")]


        public async Task<IActionResult> UpdateReservation(int id, ReservationInput reservation)
        {
            if (id != reservation.Id)
            {
                return BadRequest();
            }

            _db.Entry(reservation).State = EntityState.Modified;

            try
            {
                await _db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (ReservationExists(id))
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
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,
             Roles = "administrator,Proprietaire,Locataire")]
        public async Task<IActionResult> DeleteReservation(int id)
        {
            var reservation = await _db.Reservations.FindAsync(id);
            if (reservation == null)
            {
                return NotFound();
            }

            _db.Reservations.Remove(reservation);
            await _db.SaveChangesAsync();

            return Ok();
        }





        [NonAction]
        private bool ReservationExists(int id)
        {
            return _db.Reservations.Any(e => e.Id == id);
        }


    }
}
