﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace API
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class onyx2Entities1 : DbContext
    {
        public onyx2Entities1()
            : base("name=onyx2Entities1")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<C__RefactorLog> C__RefactorLog { get; set; }
        public virtual DbSet<Attendance> Attendances { get; set; }
        public virtual DbSet<Card> Cards { get; set; }
        public virtual DbSet<classgroup> classgroups { get; set; }
        public virtual DbSet<Location> Locations { get; set; }
        public virtual DbSet<Placement> Placements { get; set; }
        public virtual DbSet<Scanner> Scanners { get; set; }
        public virtual DbSet<Session> Sessions { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<CardList> CardLists { get; set; }
        public virtual DbSet<ClassGroupList> ClassGroupLists { get; set; }
        public virtual DbSet<LocationList> LocationLists { get; set; }
        public virtual DbSet<SessionList> SessionLists { get; set; }
        public virtual DbSet<UserList> UserLists { get; set; }
        public virtual DbSet<database_firewall_rules> database_firewall_rules { get; set; }
    }
}