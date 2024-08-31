using backend.Data;
using backend.Dto.Medium;
using backend.Interfaces;
using backend.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("backend/medium")]
    [ApiController]
    public class MediumController: ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IMediumRepository _mediumRepo;
        public MediumController(ApplicationDBContext context, IMediumRepository mediumRepo)
        {
            _context = context;
            _mediumRepo = mediumRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var mediums = await _mediumRepo.GetAllAsync();
            return Ok(mediums);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var medium = await _mediumRepo.GetByIdAsync(id);

            if (medium == null) 
            {
                return NotFound();
            }

            return Ok(medium.ToMediumDto());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateMediumRequestDto mediumDto)
        {
            var mediumModel = mediumDto.ToMediumFromCreateDto();
            await _mediumRepo.CreateAsync(mediumModel);
            return CreatedAtAction(nameof(GetById), new { id = mediumModel.Id }, mediumModel.ToMediumDto());
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateMediumRequestDto mediumDto)
        {
            var mediumModel = await _mediumRepo.UpdateAsync(id, mediumDto);
            if(mediumModel == null)
            {
                return NotFound();
            }
            return Ok(mediumModel.ToMediumDto());
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var mediumModel = await _mediumRepo.DeleteAsync(id);

            if(mediumModel == null)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
