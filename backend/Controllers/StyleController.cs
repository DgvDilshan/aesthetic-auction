using backend.Data;
using backend.Dto.Style;
using backend.Interfaces;
using backend.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("backend/style")]
    [ApiController]
    public class StyleController: ControllerBase
    {
        public readonly ApplicationDBContext _context;
        public readonly IStyleRepository _styleRepo;
        
        public StyleController(ApplicationDBContext context, IStyleRepository styleRepo)
        {
            _context = context;
            _styleRepo = styleRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var styles = await _styleRepo.GetAllAsync();
            return Ok(styles);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var style = await _styleRepo.GetByIdAsync(id);

            if(style == null)
            {
                return NotFound();
            }

            return Ok(style.ToStyleDto());
        }
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateStyleRequestDto styleDto)
        {
            var styleModel = styleDto.ToStyleFromCreateDto();
            await _styleRepo.CreateAsync(styleModel);
            return CreatedAtAction(nameof(GetById), new { id = styleModel.Id }, styleModel.ToStyleDto());
        }
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateStyleRequestDto updateDto)
        {
            var styleModel = await _styleRepo.UpdateAsync(id, updateDto);

            if(styleModel == null)
            {
                return NotFound();
            }

            return Ok(styleModel.ToStyleDto());
        }
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var styleModel = await _styleRepo.DeleteAsync(id);

            if(styleModel == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
