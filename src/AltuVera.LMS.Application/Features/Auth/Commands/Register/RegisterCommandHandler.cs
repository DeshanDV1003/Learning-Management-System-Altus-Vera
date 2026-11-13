using AltuVera.LMS.Application.Common.Models;
using AltuVera.LMS.Domain.Entities.Users;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace AltuVera.LMS.Application.Features.Auth.Commands.Register;

public class RegisterCommandHandler(UserManager<AppUser> userManager)
    : IRequestHandler<RegisterCommand, Result<RegisterResponse>>
{
    public async Task<Result<RegisterResponse>> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        var existing = await userManager.FindByEmailAsync(request.Email);
        if (existing is not null)
            return Result<RegisterResponse>.Failure("Email already in use.");

        var user = new AppUser
        {
            FirstName = request.FirstName,
            LastName = request.LastName,
            Email = request.Email,
            UserName = request.Email,
        };

        var result = await userManager.CreateAsync(user, request.Password);
        if (!result.Succeeded)
            return Result<RegisterResponse>.Failure(string.Join(", ", result.Errors.Select(e => e.Description)));

        var roleName = request.Role.ToString();
        await userManager.AddToRoleAsync(user, roleName);

        return Result<RegisterResponse>.Success(new RegisterResponse(user.Id, user.Email!, user.FullName, roleName));
    }
}
