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
    [Route("api/[controller]/[action]")]
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
             Roles = "Administrator")]
<<<<<<< HEAD


=======
>>>>>>> 084117b624940db70063bf3500fa95b61bcc35db
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
        /*    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,
                Roles = "administrator,Proprietaire")]*/

        //Api pour get the reservation effectuer sur une voiture
        public ActionResult getVoitureReservations(int idVoiture)
        {


            var result = _db.Reservations.Where(r => r.VoitureId == idVoiture).ToList();


            if (result.IsNullOrEmpty())
            {
                return NoContent();
            }
            return Ok(result.ToList());
        }
        [HttpGet("{idUser}")]
        /* [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,
              Roles = "Administrator,Proprietaire")]*/
        //get the historique reservation effectuer par un user 
        public IActionResult getUserReservations(int idUser)
        {

            var result = _db.Reservations.Where(r => r.UserId == idUser).ToList();


            if (result.IsNullOrEmpty())
            {
                return NoContent();
            }
            return Ok(result.ToList());
        }
        [HttpGet("{id}")]

        /* [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,
              Roles = "Administrator")]*/
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

        /*[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,
             Roles = "Administrator,Proprietaire,Locataire")]*/
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
                //PaiementId = reservation.PaiementId,
                DatePriseEnCharge = DateTime.UtcNow,
                DateRemise = reservation.DateRemise,
                Prix = reservation.Prix

            };

            _db.Reservations.Add(newReservation);
            await _db.SaveChangesAsync();
            return Ok(newReservation);
        }

        [HttpPut("{id}")]
        /* [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,
              Roles = "Administrator,Proprietaire,Locataire")]
 */


        /*[HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,
             Roles = "Administrator,Proprietaire,Locataire")]*/


        public async Task<IActionResult> UpdateReservation(int id, ReservationInput res)
        {
            // Validate the incoming request data
            if (res == null || res.Id != id)
            {
                return BadRequest("Invalid data provided.");
            }


            // Check if the reservation exists in the database 
            var res_from_db = await _db.Reservations.FindAsync(id);
            if (res_from_db == null)
            {
                return NotFound();
            }

            var user = _db.Users.Find(res_from_db.UserId);
            if (user == null)
            {
                return NotFound("User Not found");
            }
            res_from_db.VoitureId = res.VoitureId;
            res_from_db.Prix = res.Prix;
            res_from_db.UserId = res.UserId;
            res_from_db.DatePriseEnCharge = res.DatePriseEnCharge;
            res_from_db.DateRemise = res.DateRemise;


            _db.Reservations.Update(res_from_db);
            await _db.SaveChangesAsync();

            return new JsonResult("updated successfully");

        } 




        // DELETE: api/TodoItems/5
        [HttpDelete("{id}")]
/*        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,
             Roles = "Administrator,Proprietaire,Locataire")]*/
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
