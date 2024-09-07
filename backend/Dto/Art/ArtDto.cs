using backend.Dto.Medium;
using backend.Dto.Style;

namespace backend.Dto.Art
{
    public class ArtDto
    {
        public int Id { get; set; }
        public string Lot { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Image {  get; set; } = string.Empty;
        public decimal CurrentMarketPrice { get; set; }
        public string Condition { get; set; } = string.Empty;
        public bool isFramed { get; set; }
        public decimal Height { get; set; }
        public decimal Width { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public int? StyleId { get; set; }
        public int? MediumId { get; set; }

    }
}
