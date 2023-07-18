using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Book_Guide_MVC.Migrations
{
    /// <inheritdoc />
    public partial class Fixsv2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BookTitles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BookTitles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Books",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Url = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TableContents = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Dedication = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Preface = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Author = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TitleId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Books", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Books_BookTitles_TitleId",
                        column: x => x.TitleId,
                        principalTable: "BookTitles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BookChapters",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TitleModelId = table.Column<int>(type: "int", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Body = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BookModelId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BookChapters", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BookChapters_BookTitles_TitleModelId",
                        column: x => x.TitleModelId,
                        principalTable: "BookTitles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BookChapters_Books_BookModelId",
                        column: x => x.BookModelId,
                        principalTable: "Books",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "BookSections",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Body = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BookChaptersModelId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BookSections", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BookSections_BookChapters_BookChaptersModelId",
                        column: x => x.BookChaptersModelId,
                        principalTable: "BookChapters",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_BookChapters_BookModelId",
                table: "BookChapters",
                column: "BookModelId");

            migrationBuilder.CreateIndex(
                name: "IX_BookChapters_TitleModelId",
                table: "BookChapters",
                column: "TitleModelId");

            migrationBuilder.CreateIndex(
                name: "IX_Books_TitleId",
                table: "Books",
                column: "TitleId");

            migrationBuilder.CreateIndex(
                name: "IX_BookSections_BookChaptersModelId",
                table: "BookSections",
                column: "BookChaptersModelId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BookSections");

            migrationBuilder.DropTable(
                name: "BookChapters");

            migrationBuilder.DropTable(
                name: "Books");

            migrationBuilder.DropTable(
                name: "BookTitles");
        }
    }
}
