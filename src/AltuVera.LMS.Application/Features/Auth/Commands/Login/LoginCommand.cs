using AltuVera.LMS.Application.Common.Models;
using MediatR;

namespace AltuVera.LMS.Application.Features.Auth.Commands.Login;

public record LoginCommand(string Email, string Password) : IRequest<Result<LoginResponse>>;

public record LoginResponse(
    string Token,
    string UserId,
    string Email,
    string FullName,
    string Role
);
