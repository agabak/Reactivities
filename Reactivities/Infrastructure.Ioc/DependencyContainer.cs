﻿
using Application.Interfaces;
using Application.Services;
using Domain.Interaces;
using Microsoft.Extensions.DependencyInjection;
using Persistence;
using Persistence.Repositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Ioc
{
    public static class DependencyContainer
    {
        public static void  RegisterServices(this IServiceCollection service)
        {
            //Application
            service.AddScoped<IDataService, DataService>();

            // Data 
            service.AddScoped<IDataRepository, DataRepository>();

           
           service.AddScoped<DataContext>();
        }
    }
}
