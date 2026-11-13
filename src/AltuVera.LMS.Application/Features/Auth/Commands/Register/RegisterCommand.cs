using AltuVera.LMS.Application.Common.Models;
using AltuVera.LMS.Domain.Enums;
using MediatR;

namespace AltuVera.LMS.Application.Features.Auth.Commands.Register;

public record RegisterCommand(
    string FirstName,
    string LastName,
    string Email,
    string Password,
    UserRole Role
) : IRequest<Result<RegisterResponse>>;

public record RegisterResponse(string UserId, string Email, string FullName, string Role);
