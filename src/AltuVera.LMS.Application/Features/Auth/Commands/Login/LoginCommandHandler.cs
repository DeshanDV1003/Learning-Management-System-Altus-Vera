using AltuVera.LMS.Application.Common.Interfaces;
using AltuVera.LMS.Application.Common.Models;
using AltuVera.LMS.Domain.Entities.Users;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace AltuVera.LMS.Application.Features.Auth.Commands.Login;

public class LoginCommandHandler(
    UserManager<AppUser> userManager,
    ITokenService tokenService)
    : IRequestHandler<LoginCommand, Result<LoginResponse>>
{
    public async Task<Result<LoginResponse>> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        var user = await userManager.FindByEmailAsync(request.Email);
        if (user is null || !user.IsActive)
            return Result<LoginResponse>.Failure("Invalid credentials.");

        var validPassword = await userManager.CheckPasswordAsync(user, request.Password);
        if (!validPassword)
            return Result<LoginResponse>.Failure("Invalid credentials.");

        var roles = await userManager.GetRolesAsync(user);
        var token = tokenService.GenerateToken(user, roles);

        return Result<LoginResponse>.Success(new LoginResponse(
            token,
            user.Id,
            user.Email!,
            user.FullName,
            roles.FirstOrDefault() ?? "Student"
        ));
    }
}
