using backend.Data;
using backend.Models;
using backend.Utile;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models.inputs;


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
        /* [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,
             Roles = "locataire")]*/

        public JsonResult GetReservations()
        {
            var Reservations = _db.Reservations.ToList();
            if (Reservations == null)
            {
                return new JsonResult(NotFound());
            }
            return new JsonResult(Ok(Reservations));
        }

        [HttpGet("{id}")]
        /*[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,
            Roles = "locataire")]*/
        public JsonResult GetRervation(long id)
        {
            var reservation = _db.Reservations.FindAsync(id);

            if (reservation == null)
            {
                return new JsonResult(NotFound());
            }

            return new JsonResult(Ok(reservation));
        }




        [HttpPost]


        public async Task<ActionResult<Reservation>> AddReservation(ReservationInput reservation)
        {
            if (!ModelState.IsValid || !ModelValid.IsModelValid(reservation))
            {
                return BadRequest(ModelState);
            }



            var newReservation = new Reservation
            {
               UserId=reservation.UserId,
               VoitureId=reservation.VoitureId,
               PaiementId=reservation.PaiementId,
               DatePriseEnCharge=  DateTime.UtcNow,
               Prix=reservation.Prix



            };

            _db.Reservations.Add(newReservation);
            await _db.SaveChangesAsync();
            return Ok(newReservation);
        }


        [HttpPut("{id}")]

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

 




        private bool ReservationExists(int id)
        {
            return _db.Reservations.Any(e => e.Id == id);
        }








    }
}
