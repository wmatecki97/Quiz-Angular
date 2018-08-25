﻿using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace quiz_backend.Controllers
{
    public class Credentials
    {
        public string email { get; set; }
        public string password { get; set; }
    }
    
    [Produces("application/json")]
    [Route("api/Account")]
    public class AccountController : Controller
    {
        readonly UserManager<IdentityUser> userManager;
        readonly SignInManager<IdentityUser> signInManager;

        public AccountController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager) 
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] Credentials credentials)
        {
            var user = new IdentityUser { UserName = credentials.email, Email = credentials.email };
            var result = await userManager.CreateAsync(user, credentials.password);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            await signInManager.SignInAsync(user, isPersistent: false);

            var jwt = new JwtSecurityToken();
            return Ok(new JwtSecurityTokenHandler().WriteToken(jwt));
        }

    }
}