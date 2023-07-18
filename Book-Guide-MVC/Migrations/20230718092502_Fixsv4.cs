using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Book_Guide_MVC.Migrations
{
    /// <inheritdoc />
    public partial class Fixsv4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Books_BookTitles_TitleId",
                table: "Books");

            migrationBuilder.DropIndex(
                name: "IX_Books_TitleId",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "TitleId",
                table: "Books");

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Books",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Title",
                table: "Books");

            migrationBuilder.AddColumn<int>(
                name: "TitleId",
                table: "Books",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Books_TitleId",
                table: "Books",
                column: "TitleId");

            migrationBuilder.AddForeignKey(
                name: "FK_Books_BookTitles_TitleId",
                table: "Books",
                column: "TitleId",
                principalTable: "BookTitles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
