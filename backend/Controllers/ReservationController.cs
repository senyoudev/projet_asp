using backend.Data;
using backend.Models;
using backend.Models.inputs;
using backend.Models.outputs;
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

        public JsonResult GetReservations()
        {
            var Reservations = _db.Reservations
                .Include(v => v.Voiture)
                .Include(v => v.User)
                .ToList();
            if (Reservations == null)
            {
                return new JsonResult(NotFound());
            }
            return new JsonResult(Ok(Reservations.Select(reservation => new ReservationDTO
            {
                Id = reservation.Id,
                DatePriseEnCharge = reservation.DatePriseEnCharge,
                DateRemise = reservation.DateRemise,
                Prix = reservation.Prix,
                voiture = new Voiture
                {
                    Id = reservation.Voiture.Id,
                    Name = reservation.Voiture.Name,
                    Couleur = reservation.Voiture.Couleur,
                    Photo = reservation.Voiture.Photo,
                    Annee = reservation.Voiture.Annee,
                    Km = reservation.Voiture.Km,
                    DateAdded = reservation.Voiture.DateAdded,
                    UserId = reservation.Voiture.UserId,
                    MarqueId = reservation.Voiture.MarqueId,
                    Prix = reservation.Voiture.Prix,
                },
                User = new User
                {
                    Id = reservation.User.Id,
                    Username = reservation.User.Username,
                    Photo = reservation.User?.Photo,
                }


            }).ToList()));
        }

        [HttpGet]


        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,
            Roles = "Administrator")]

        public JsonResult GetReservationsCount()
        {
            var Reservations = _db.Reservations.Count();
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
        public ActionResult getVoitureReservations(int idVoiture)
        {


            var result = _db.Reservations.Where(r => r.VoitureId == idVoiture).ToList();


            if (result.IsNullOrEmpty())
            {
                return NoContent();
            }
            return Ok(result.ToList());
        }
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,
              Roles = "Administrator,proprietaire")]
        //get the historique reservation effectuer par un user 
        public IActionResult getOwnerReservations(int idUser)
        {

            var result = _db.Reservations.Where(r => r.Voiture.UserId == idUser)
                .Include(v => v.Voiture.User)
                .Include(v => v.Voiture)
                .Include(v => v.User)
                .ToList();


            if (result.IsNullOrEmpty())
            {
                return NoContent();
            }
            return new JsonResult(Ok(result.Select(reservation => new ReservationDTOTEST
            {
                Id = reservation.Id,
                DatePriseEnCharge = reservation.DatePriseEnCharge,
                DateRemise = reservation.DateRemise,
                Prix = reservation.Prix,
                voiture = new VoitureDTOTEST
                {
                    Id = reservation.Voiture.Id,
                    Name = reservation.Voiture.Name,
                    Couleur = reservation.Voiture.Couleur,
                    Photo = reservation.Voiture.Photo,
                    Annee = reservation.Voiture.Annee,
                    Km = reservation.Voiture.Km,
                    DateAdded = reservation.Voiture.DateAdded,
                    UserId = reservation.Voiture.UserId,
                    MarqueId = reservation.Voiture.MarqueId,
                    Prix = reservation.Voiture.Prix,
                    proprietaire = new User
                    {
                        Id = reservation.Voiture.User.Id,
                        Username = reservation.Voiture.User.Username
                    },
                    locataire = new User
                    {
                        Id = reservation.User.Id,
                        Username = reservation.User.Username
                    }

                },
                


            }).ToList()));
        }
        [HttpGet("{idUser}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,
             Roles = "Administrator,proprietaire")]
        //get the historique reservation effectuer par un user 
        public IActionResult getUserReservation(int idUser)
        {

            var result = _db.Reservations.Where(r => r.UserId == idUser)
                .Include(v => v.User)
                .Include(v => v.Voiture)
                .ToList();


            if (result.IsNullOrEmpty())
            {
                return NoContent();
            }
            return new JsonResult(Ok(result.Select(reservation => new ReservationDTO
            {
                Id = reservation.Id,
                DatePriseEnCharge = reservation.DatePriseEnCharge,
                DateRemise = reservation.DateRemise,
                Prix = reservation.Prix,
                voiture = new Voiture
                {
                    Id = reservation.Voiture.Id,
                    Name = reservation.Voiture.Name,
                    Couleur = reservation.Voiture.Couleur,
                    Photo = reservation.Voiture.Photo,
                    Annee = reservation.Voiture.Annee,
                    Km = reservation.Voiture.Km,
                    DateAdded = reservation.Voiture.DateAdded,
                    UserId = reservation.Voiture.UserId,
                    MarqueId = reservation.Voiture.MarqueId,
                    Prix = reservation.Voiture.Prix,
               
                },



            }).ToList()));
        }



        [HttpGet("{id}")]

         [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,
              Roles = "Administrator")]
        public async Task<ActionResult> GetReservation(int id)
        {
            var reservation = await _db.Reservations
                .Include(v => v.User)
                .Include(r => r.Voiture)
                .FirstOrDefaultAsync(v => v.Id == id);

            if (reservation == null)
            {
                return new JsonResult(NotFound());
            }

            var reservations = new ReservationDTO
            {
                Id = reservation.Id,
                DatePriseEnCharge = reservation.DatePriseEnCharge,
                DateRemise = reservation.DateRemise,
                Prix = reservation.Prix,
                voiture = new Voiture
                {
                    Id = reservation.Voiture.Id,
                    Name = reservation.Voiture.Name,
                    Couleur = reservation.Voiture.Couleur,
                    Photo = reservation.Voiture.Photo,
                    Annee = reservation.Voiture.Annee,
                    Km = reservation.Voiture.Km,
                    DateAdded = reservation.Voiture.DateAdded,
                    UserId = reservation.Voiture.UserId,
                    MarqueId = reservation.Voiture.MarqueId,
                    Prix = reservation.Voiture.Prix,
                },
                User = reservation.User,
            };

            return Ok(reservations);
           
        }




        [HttpPost]


        /*[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,
               Roles = "Administrator, proprietaire, Locataire")]*/

       

        public async Task<ActionResult<Reservation>> AddReservation(ReservationInput reservation)
        {
            if ( !ModelValid.IsModelValid(reservation))
            {
                return BadRequest(ModelState);
            }



            var newReservation = new Reservation
            {
                UserId = reservation.UserId,
                VoitureId = reservation.VoitureId,
                DatePriseEnCharge = DateTime.UtcNow,
                DateRemise = reservation.DateRemise,
                Prix = reservation.Prix,

            };

            _db.Reservations.Add(newReservation);
            await _db.SaveChangesAsync();
            return Ok(newReservation.Id);
        }

        [HttpPut("{id}")]
         [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,
              Roles = "Administrator,Proprietaire,Locataire")]
 


        /*[HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,
             Roles = "Administrator,proprietaire,Locataire")]*/


        public async Task<IActionResult> UpdateReservation(int id, ReservationInput res)
        {
            // Validate the incoming request data
            if (res == null )
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
       [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,
             Roles = "Administrator,proprietaire,Locataire")]
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
