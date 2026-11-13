using Microsoft.EntityFrameworkCore;

namespace AltuVera.LMS.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
