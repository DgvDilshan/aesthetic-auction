using backend.Data;
using backend.Dto.Art;
using backend.Interfaces;
using backend.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("backend/art")]
    [ApiController]
    public class ArtController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IArtRepository _artRepo;
        public ArtController(ApplicationDBContext context, IArtRepository artRepo)
        {
            _context = context;
            _artRepo = artRepo;
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

        [HttpPost]
        public async Task<IActionResult> Create(CreateArtRequestDto artDto)
        {
            var artModel = artDto.ToArtFromCreate();
            await _artRepo.CreateAsync(artModel);
            return CreatedAtAction(nameof(GetById), new { id = artModel }, artModel.ToArtDto());
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
