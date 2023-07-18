using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Book_Guide_MVC.Migrations
{
    /// <inheritdoc />
    public partial class Fixsv5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BookChapters_BookTitles_TitleModelId",
                table: "BookChapters");

            migrationBuilder.DropIndex(
                name: "IX_BookChapters_TitleModelId",
                table: "BookChapters");

            migrationBuilder.DropColumn(
                name: "TitleModelId",
                table: "BookChapters");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TitleModelId",
                table: "BookChapters",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_BookChapters_TitleModelId",
                table: "BookChapters",
                column: "TitleModelId");

            migrationBuilder.AddForeignKey(
                name: "FK_BookChapters_BookTitles_TitleModelId",
                table: "BookChapters",
                column: "TitleModelId",
                principalTable: "BookTitles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
