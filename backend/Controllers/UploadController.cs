using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        private readonly Cloudinary _cloudinary;


        public UploadController(IConfiguration configuration)
        {
            var account = new Account(
               configuration["cloudinary:cloud_name"],
                configuration["cloudinary:api_key"],
               configuration["cloudinary:api_secret"]
               );

            _cloudinary = new Cloudinary(account);
        }

        [HttpPost]
public ActionResult UploadSingle(IFormFile imageFile)
{
    // Validate the incoming request data
    if (imageFile == null)
    {
        return BadRequest("No image file provided.");
    }

    // Upload the image to Cloudinary
    var uploadResult = _cloudinary.Upload(new ImageUploadParams
    {
        File = new FileDescription(imageFile.FileName, imageFile.OpenReadStream())
    });

    // Return the URL of the uploaded image
    return Ok(new { imageUrl = uploadResult.Uri.AbsoluteUri });
}


    }
}
