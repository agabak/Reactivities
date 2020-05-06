using Application.Errors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;

namespace API.Middleware
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ErrorHandlingMiddleware> _logger;
        private readonly Exception _ex;
        public ErrorHandlingMiddleware(RequestDelegate next, ILogger<ErrorHandlingMiddleware>  logger, Exception ex = null)
        {
            _next = next;
            _logger = logger;
            _ex = ex;
        }

        public async Task Invoke(HttpContext context)
        {
            if(_ex != null)
            {
                await HandleExceptionAsync(context, _ex, _logger);
            }
            await _next(context);
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception ex, ILogger<ErrorHandlingMiddleware> logger)
        {
            object errors = null;
            switch(ex)
            {
                case RestException rest:
                    logger.LogError(ex, "REST ERROR");
                    errors = rest.Errors;
                    context.Response.StatusCode = (int)rest.Code;
                    break;
                case Exception e:
                    logger.LogError(ex, "SERVER ERROR");
                    errors = string.IsNullOrWhiteSpace(e.Message) ? "ERORR" : e.Message;
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    break;
            }

            context.Response.ContentType = "application/json";

            if(errors != null)
            {
               var result = JsonSerializer.Serialize(new
               {
                   errors
               });

                await context.Response.WriteAsync(result);
            }

        }
    }
}
