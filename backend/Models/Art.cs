using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Art
    {
        [Key]
        public int Id { get; set; }
        public string Lot {  get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Image {  get; set; } = string.Empty;
        [Column(TypeName = "decimal(18,2)")]
        public decimal CurrentMarketPrice {  get; set; }
        public string Condition { get; set; } = string.Empty;
        public bool isFramed { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal Height { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal Width { get; set; }
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public int? StyleId { get; set; }
        public int? MediumId { get; set; }
        public string UserId { get; set; } = string.Empty;
        public User User { get; set; }
        public Style Style { get; set; }
        public Medium Medium { get; set; }
        public List<Auction> Auction { get; set; } = new List<Auction>();
    }
}
