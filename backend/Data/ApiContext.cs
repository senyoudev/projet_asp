using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class ApiContext : DbContext
    {
        public ApiContext(DbContextOptions<ApiContext> options) : base(options)
        {

        }
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<Marque> Marques { get; set; }
        public DbSet<OffreSpeciale> OffreSpeciales { get; set; }
        public DbSet<Voiture> Voitures { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<Paiement> Paiements { get; set; }
        public DbSet<FavoriteList> FavoriteLists { get; set; }
        public DbSet<BlackList> Blacklists { get; set; }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder
        //        .Entity<Voiture>()
        //        .HasOne(e => e.User)
        //        .WithMany()
        //        .OnDelete(DeleteBehavior.Restrict);
        //}




    }
}
