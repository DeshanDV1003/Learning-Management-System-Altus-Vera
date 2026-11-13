using AltuVera.LMS.Domain.Entities.Users;
using AltuVera.LMS.Domain.Enums;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;

namespace AltuVera.LMS.Infrastructure.Data;

public static class AppDbContextSeed
{
    public static async Task SeedAsync(IServiceProvider services)
    {
        var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
        var userManager = services.GetRequiredService<UserManager<AppUser>>();

        string[] roles = [nameof(UserRole.Admin), nameof(UserRole.Lecturer), nameof(UserRole.Student)];
        foreach (var role in roles)
        {
            if (!await roleManager.RoleExistsAsync(role))
                await roleManager.CreateAsync(new IdentityRole(role));
        }

        // Seed default admin
        const string adminEmail = "admin@altusvera.lms";
        if (await userManager.FindByEmailAsync(adminEmail) is null)
        {
            var admin = new AppUser
            {
                FirstName = "Altus",
                LastName = "Admin",
                Email = adminEmail,
                UserName = adminEmail,
                IsActive = true,
            };
            await userManager.CreateAsync(admin, "Admin@123");
            await userManager.AddToRoleAsync(admin, nameof(UserRole.Admin));
        }
    }
}
