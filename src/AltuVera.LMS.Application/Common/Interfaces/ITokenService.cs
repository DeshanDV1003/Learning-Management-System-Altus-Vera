using AltuVera.LMS.Domain.Entities.Users;

namespace AltuVera.LMS.Application.Common.Interfaces;

public interface ITokenService
{
    string GenerateToken(AppUser user, IList<string> roles);
}
