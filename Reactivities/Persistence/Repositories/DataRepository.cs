using Domain;
using Domain.Interaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Repositories
{
    public class DataRepository : IDataRepository
    {
        private readonly DataContext _context;

        public DataRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<Value> GetValueAsync(int id)
        {
           return  await _context.Values.FirstOrDefaultAsync(x => x.Id == id);
        }

        public  async Task<IEnumerable<Value>> GetValuesAsync()
        {
            return await _context.Values.ToListAsync();
        }
    }
}
