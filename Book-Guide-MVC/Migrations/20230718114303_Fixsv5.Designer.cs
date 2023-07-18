﻿// <auto-generated />
using System;
using Book_Guide_MVC.DAL;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Book_Guide_MVC.Migrations
{
    [DbContext(typeof(BookDbContext))]
    [Migration("20230718114303_Fixsv5")]
    partial class Fixsv5
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Book_Guide_MVC.DAL.Entities.BookChaptersModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Body")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("BookModelId")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("BookModelId");

                    b.ToTable("BookChapters");
                });

            modelBuilder.Entity("Book_Guide_MVC.DAL.Entities.BookModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Author")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Dedication")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Preface")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TableContents")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Url")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Books");
                });

            modelBuilder.Entity("Book_Guide_MVC.DAL.Entities.BookSectionsModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Body")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("BookChaptersModelId")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("BookChaptersModelId");

                    b.ToTable("BookSections");
                });

            modelBuilder.Entity("Book_Guide_MVC.DAL.Entities.BookTitleModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("BookTitles");
                });

            modelBuilder.Entity("Book_Guide_MVC.DAL.Entities.BookChaptersModel", b =>
                {
                    b.HasOne("Book_Guide_MVC.DAL.Entities.BookModel", null)
                        .WithMany("Chapters")
                        .HasForeignKey("BookModelId");
                });

            modelBuilder.Entity("Book_Guide_MVC.DAL.Entities.BookSectionsModel", b =>
                {
                    b.HasOne("Book_Guide_MVC.DAL.Entities.BookChaptersModel", null)
                        .WithMany("Sections")
                        .HasForeignKey("BookChaptersModelId");
                });

            modelBuilder.Entity("Book_Guide_MVC.DAL.Entities.BookChaptersModel", b =>
                {
                    b.Navigation("Sections");
                });

            modelBuilder.Entity("Book_Guide_MVC.DAL.Entities.BookModel", b =>
                {
                    b.Navigation("Chapters");
                });
#pragma warning restore 612, 618
        }
    }
}
