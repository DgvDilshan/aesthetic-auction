using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Auction
    {
        [Key]
        public int Id {  get; set; }
        public string Status { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }= DateTime.MinValue;
        public int ArtId { get; set; }
        public Art Art { get; set; }
        public string UserId { get; set; } = string.Empty;
        public User User { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
    }
}
