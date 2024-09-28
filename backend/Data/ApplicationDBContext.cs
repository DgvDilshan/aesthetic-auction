using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;

namespace backend.Data
{
    public class ApplicationDBContext : IdentityDbContext<User>
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

                //Art Model Relations
                builder.Entity<Art>()
                    .HasOne(a => a.User)
                    .WithMany(u => u.Art)
                    .HasForeignKey(a => a.UserId)
                    .OnDelete(DeleteBehavior.Restrict);

                builder.Entity<Art>()
                    .HasOne(a => a.Style)
                    .WithMany(u => u.Art)
                    .HasForeignKey(a => a.StyleId)
                    .OnDelete(DeleteBehavior.Restrict);

                builder.Entity<Art>()
                    .HasOne(a => a.Medium)
                    .WithMany(u => u.Art)
                    .HasForeignKey(a => a.MediumId)
                    .OnDelete(DeleteBehavior.Restrict);

                //Auction Model Relations
                builder.Entity<Auction>()
                    .HasOne(a => a.Art)
                    .WithOne(u => u.Auction)
                    .HasForeignKey<Auction>(a => a.ArtId)
                    .OnDelete(DeleteBehavior.Restrict);

                builder.Entity<Auction>()
                    .HasOne(a => a.User)
                    .WithMany(u => u.Auction)
                    .HasForeignKey(a => a.UserId)
                    .OnDelete(DeleteBehavior.Restrict);

                //Store Model Relations
                builder.Entity<Store>()
                    .HasOne(a => a.User)
                    .WithOne(u => u.Store)
                    .HasForeignKey<Store>(a => a.UserId)
                    .OnDelete(DeleteBehavior.Restrict);

                builder.Entity<Store>()
                    .HasMany(a => a.Arts)
                    .WithOne(u => u.Store)
                    .OnDelete(DeleteBehavior.Restrict);

            List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole
                {
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                },
                new IdentityRole
                {
                    Name = "User",
                    NormalizedName = "USER"
                }
            };
            builder.Entity<IdentityRole>().HasData(roles);
        }

        public DbSet<Style> Style { get; set; }
        public DbSet<Medium> Medium { get; set; }
        public DbSet<Art> Art { get; set; }
        public DbSet<Auction> Auction {  get; set; }
        public DbSet<Store> Store { get; set; }
    }
}
