using Microsoft.AspNetCore.Identity;

namespace backend.Models
{
    public class User: IdentityUser
    {
        //public List<Auction> Auction { get; set; } = new List<Auction>();
        public Store Store { get; set; }
    }
}
