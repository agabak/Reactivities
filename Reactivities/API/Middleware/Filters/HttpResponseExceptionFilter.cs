using Application.Errors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;

namespace API.Middleware.Filters
{
    public class HttpResponseExceptionFilter : IActionFilter, IOrderedFilter
    {
        public int Order => int.MaxValue - 10;

        public void OnActionExecuted(ActionExecutedContext context)
        {
            object errors = null;
            switch (context.Exception)
            {
                case RestException rest:
                   // logger.LogError(ex, "REST ERROR");
                    errors = rest.Errors;
                    context.HttpContext.Response.StatusCode = (int)rest.Code;
                    break;
                case Exception e:
                    //logger.LogError(ex, "SERVER ERROR");
                    errors = string.IsNullOrWhiteSpace(e.Message) ? "ERORR" : e.Message;
                    context.HttpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    break;
            }

            context.HttpContext.Response.ContentType = "application/json";

            if (errors != null)
            {
                var result = JsonSerializer.Serialize(new
                {
                    errors
                });

                context.Result = new ObjectResult(result)
                {
                    StatusCode = context.HttpContext.Response.StatusCode
                };
                context.ExceptionHandled = true;
            }
        }

        public void OnActionExecuting(ActionExecutingContext context)
        { }
    }      
}
