using MediatR;
using Persistence;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime? Date { get; set; }
            public string City { get; set; }
            public string Venue { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var editObject = await _context.Activities.FindAsync(request.Id);

                if (!request.Id.Equals(editObject.Id)) throw new Exception("wrong activity");
                if (editObject == null) throw new Exception("Could not find activity");

                editObject.Title = request.Title ?? editObject.Title;
                editObject.Description = request.Description ?? editObject.Description;
                editObject.Category = request.Category ?? editObject.Category;
                editObject.Date = request.Date ?? editObject.Date;
                editObject.City = request.City ?? editObject.City;
                editObject.Venue = request.Venue ?? editObject.Venue;

                var success = await _context.SaveChangesAsync() > 0;
                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}
