using backend.Data;
using backend.Dto.Auction;
using backend.Interfaces;
using backend.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("backend/auction")]
    [ApiController]
    public class AuctionController: ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IAuctionRepository _auctionRepo;

        public AuctionController(ApplicationDBContext context, IAuctionRepository auctionRepo)
        {
            _context = context;
            _auctionRepo = auctionRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var auctions = await _auctionRepo.GetAllAsync();
            var auctionDto = auctions.Select(s => s.ToAuctionDto());

            return Ok(auctionDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var auction = await _auctionRepo.GetByIdAsync(id);

            if (auction == null) 
            {
                return NotFound();
            }

            return Ok(auction.ToAuctionDto());
        }

        [HttpGet("art/{artId}")]
        public async Task<IActionResult> GetByArtId([FromRoute] int artId)
        {
            var auction = await _auctionRepo.GetByArtId(artId);

            if(auction == null)
            {
                return NotFound();
            }

            return Ok(auction.ToAuctionDto());
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create(CreateAuctionDto auctionDto)
        {
            var auctionModel = auctionDto.ToCreateAuctionDto();
            await _auctionRepo.CreateAsync(auctionModel);
            return CreatedAtAction(nameof(GetById), new {id = auctionModel}, auctionModel.ToAuctionDto());
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var auctionModel = await _auctionRepo.DeleteAsync(id);

            if(auctionModel == null)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpPut]
        [Route("{id}")]
        [Authorize]
        public async Task<IActionResult> Update([FromRoute] int id, UpdateAuctionDto auctionDto)
        {
            var auctionModel = await _auctionRepo.UpdateAsync(id, auctionDto.ToUpdateAuctionDto(id));

            if(auctionModel == null)
            {
                return NotFound();
            }

            return Ok(auctionModel.ToAuctionDto());
        }
    }
}
