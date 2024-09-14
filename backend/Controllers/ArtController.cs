using backend.Data;
using backend.Dto.Art;
using backend.Extensions;
using backend.Interfaces;
using backend.Mappers;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("backend/art")]
    [ApiController]
    public class ArtController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IArtRepository _artRepo;
        private readonly UserManager<User> _userManager;
        public ArtController(ApplicationDBContext context, UserManager<User> userManager, IArtRepository artRepo)
        {
            _context = context;
            _artRepo = artRepo;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var arts = await _artRepo.GetAllAsync();
            var artDto = arts.Select(s => s.ToArtDto());

            return Ok(artDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var art = await _artRepo.GetByIdAsync(id);

            if (art == null)
            {
                return NotFound();
            }

            return Ok(art.ToArtDto());
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetByUser([FromRoute] string userId)
        {
            var art = await _artRepo.GetByUserAsync(userId);

            if (art == null)
            {
                return NotFound();
            }
            return Ok(art.ToArtDto());
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create(CreateArtRequestDto artDto)
        {
            var username = User.GetUsername();

            if (string.IsNullOrEmpty(username))
            {
                return BadRequest("Username cannot be null or empty");
            }

            var user = await _userManager.FindByNameAsync(username);

            if (user == null)
            {
                return NotFound("User not found");
            }

            var userId = user.Id;

            var artModel = artDto.ToArtFromCreate(userId);
            await _artRepo.CreateAsync(artModel);
            return CreatedAtAction(nameof(GetById), new { id = artModel.Id }, artModel.ToArtDto());
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var artModel = await _artRepo.DeleteAsync(id);

            if (artModel == null)
            {
                return NotFound();
            }
            return NoContent();

        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, UpdateArtRequestDto artDto)
        {
            var artModel = await _artRepo.UpdateAsync(id, artDto.ToArtFromUpdate(id));

            if(artModel == null)
            {
                return NotFound();
            }

            return Ok(artModel.ToArtDto());
        }
        
    }
}
