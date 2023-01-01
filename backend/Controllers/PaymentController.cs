using backend.Data;
using backend.Models;
using backend.Models.inputs;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;
namespace backend.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly ApiContext _db;

        public PaymentController(ApiContext db)
        {
            _db = db;
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<Paiement>> Create(PaymentInput payment)
        {
            if (payment == null)
                return BadRequest("no data provided");
            var paymentToAdd=new Paiement { Libelle=payment.Libelle,ReservationId=payment.ReservationId};
            await _db.Paiements.AddAsync(paymentToAdd);
            _db.SaveChanges();
            return Ok(payment);    
        }

    }
}
