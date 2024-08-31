using backend.Data;
using backend.Dto.Medium;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class MediumRepository: IMediumRepository
    {
        private readonly ApplicationDBContext _context;
        public MediumRepository (ApplicationDBContext context) { _context = context; }
        public async Task<List<Medium>> GetAllAsync()
        {
            return await _context.Medium.ToListAsync();
        }
        public async Task<Medium> CreateAsync(Medium mediumModel)
        {
            await _context.Medium.AddAsync(mediumModel);
            await _context.SaveChangesAsync();
            return mediumModel;
        }
        public async Task<Medium?> DeleteAsync(int id)
        {
            var mediumModel = await _context.Medium.FirstOrDefaultAsync(x => x.Id == id);
            if (mediumModel == null)
            {
                return null;
            }

            _context.Medium.Remove(mediumModel);
            await _context.SaveChangesAsync();
            return mediumModel;
        }
        public async Task<Medium?> GetByIdAsync (int id)
        {
            return await _context.Medium.FirstOrDefaultAsync(x => x.Id == id);
        }
        public async Task<Medium?> UpdateAsync(int id, UpdateMediumRequestDto updateDto)
        {
            var existingMedium = await _context.Medium.FirstOrDefaultAsync(x => x.Id == id);
            if (existingMedium == null) 
            {
                return null;
            }

            existingMedium.MediumType = updateDto.MediumType;

            await _context.SaveChangesAsync();
            return existingMedium;
        }
    }
}
