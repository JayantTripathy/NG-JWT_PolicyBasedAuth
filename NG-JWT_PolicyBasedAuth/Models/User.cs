﻿namespace NG_JWT_PolicyBasedAuth.Models
{
    public class User
    {
        public string UserName { get; set; }
        public string? FirstName { get; set; }
        public string Password { get; set; }
        public string? UserType { get; set; }
    }
}
