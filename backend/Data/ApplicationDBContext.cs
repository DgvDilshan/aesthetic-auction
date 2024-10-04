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
                .HasOne(a => a.Store)
                .WithMany(u => u.Arts)
                .HasForeignKey(a => a.StoreId)
                .OnDelete(DeleteBehavior.Cascade);

                builder.Entity<Art>()
                 .HasOne(a => a.Category)
                 .WithMany(u => u.Arts)
                 .HasForeignKey(a => a.CategoryId)
                 .OnDelete(DeleteBehavior.Cascade);

                //Auction Model Relations

                //Store Model Relations
                builder.Entity<Store>()
                    .HasOne(a => a.User)
                    .WithOne(u => u.Store)
                    .HasForeignKey<Store>(a => a.UserId)
                    .OnDelete(DeleteBehavior.Cascade);

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

        public DbSet<Art> Art { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<Store> Store { get; set; }

    }
}
