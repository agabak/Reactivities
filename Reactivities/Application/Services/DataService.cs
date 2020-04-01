using Application.Interfaces;
using Domain;
using Domain.Interaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class DataService : IDataService
    {
        private readonly IDataRepository _repository;

        public DataService(IDataRepository  repository)
        {
            _repository = repository;
        }
        public async Task<Value> GetValueAsync(int id)
        {
            return await _repository.GetValueAsync(id);
        }

        public async Task<IEnumerable<Value>> GetValuesAsync()
        {
            return await _repository.GetValuesAsync();
        }
    }
}
