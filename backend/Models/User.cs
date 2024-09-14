using Microsoft.AspNetCore.Identity;

namespace backend.Models
{
    public class User: IdentityUser
    {
        public List<Art> Art { get; set; } = new List<Art>();
        public List<Auction> Auction { get; set; } = new List<Auction>();
    }
}
