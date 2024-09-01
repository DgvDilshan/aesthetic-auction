using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class ArtRepository : IArtRepository
    {
        private readonly ApplicationDBContext _context;
        public ArtRepository(ApplicationDBContext context) {
            _context = context;
        }

        public async Task<List<Art>> GetAllAsync(){
            return await _context.Art.ToListAsync();
        }
        public async Task<Art> CreateAsync(Art artModel)
        {
            await _context.Art.AddAsync(artModel);
            await _context.SaveChangesAsync();
            return artModel;
        }
        public async Task<Art?> GetByIdAsync(int id)
        {
            return await _context.Art.FirstOrDefaultAsync(c => c.Id == id);
        }
        public async Task<Art?> UpdateAsync(int id, Art artModel)
        {
            var existingArt = await _context.Art.FindAsync(id);

            if(existingArt == null)
            {
                return null;
            }

            existingArt.Title = artModel.Title;
            existingArt.Image = artModel.Image;
            existingArt.CurrentMarketPrice = artModel.CurrentMarketPrice;
            existingArt.Condition = artModel.Condition;
            existingArt.isFramed = artModel.isFramed;
            existingArt.Height = artModel.Height;
            existingArt.Width = artModel.Width;
            existingArt.StyleId = artModel.StyleId;
            existingArt.MediumId = artModel.MediumId;

            await _context.SaveChangesAsync();
            return existingArt;
        }

        public async Task<Art?> DeleteAsync(int id)
        {
            var artModel = await _context.Art.FirstOrDefaultAsync(x => x.Id == id);

            if (artModel == null) 
            {
                return null;
            }

            _context.Art.Remove(artModel);
            await _context.SaveChangesAsync();
            return artModel;
        }

        public async Task<bool> StyleExists(int id)
        {
            return await _context.Style.AnyAsync(x => x.Id == id);
        }
        public async Task<bool> MediumExists(int id)
        {
            return await _context.Medium.AnyAsync(y => y.Id == id);
        }

    }
}
