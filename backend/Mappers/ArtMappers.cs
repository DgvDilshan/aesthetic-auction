using backend.Dto.Art;
using backend.Models;

namespace backend.Mappers
{
    public static class ArtMappers
    {
        public static ArtDto ToArtDto(this Art artModel)
        {
            return new ArtDto
            {
                Id = artModel.Id,
                Lot = artModel.Lot,
                Title = artModel.Title,
                Image = artModel.Image,
                CurrentMarketPrice = artModel.CurrentMarketPrice,
                Condition = artModel.Condition,
                isFramed = artModel.isFramed,
                Height = artModel.Height,
                Width = artModel.Width,
                CreatedOn = artModel.CreatedOn,              
            };
        }

        public static Art ToArtFromCreate(this CreateArtRequestDto artDto, string userId)
        {
            string uniqueLot = GenerateUniqueLot();

            return new Art
            {
                Lot = uniqueLot,
                Title = artDto.Title,
                Image = artDto.Image,
                CurrentMarketPrice = artDto.CurrentMarketPrice,
                Condition = artDto.Condition,
                isFramed = artDto.isFramed,
                Height = artDto.Height,
                Width = artDto.Width,
            };
        }

        private static string GenerateUniqueLot()
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var random = new Random();
            return new string(Enumerable.Repeat(chars, 12)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }


        public static Art ToArtFromUpdate(this UpdateArtRequestDto artDto,int id)
        {
            return new Art
            {
                Title = artDto.Title,
                Image = artDto.Image,
                CurrentMarketPrice = artDto.CurrentMarketPrice,
                Condition = artDto.Condition,
                isFramed = artDto.isFramed,
                Height = artDto.Height,
                Width = artDto.Width,
            };
        }
    }
}
