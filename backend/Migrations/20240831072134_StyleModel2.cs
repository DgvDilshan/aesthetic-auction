using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class StyleModel2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Styles",
                table: "Styles");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5ffc6762-3e95-4285-8a15-b5c150da4cde");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f95dd036-3705-45da-94b8-713d0ff6f6ef");

            migrationBuilder.RenameTable(
                name: "Styles",
                newName: "Style");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Style",
                table: "Style",
                column: "Id");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2fba14a8-f074-4f23-bd18-030941dcf777", null, "User", "USER" },
                    { "6b55cbf2-5385-48c6-bf75-6ca8c84573d3", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Style",
                table: "Style");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2fba14a8-f074-4f23-bd18-030941dcf777");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6b55cbf2-5385-48c6-bf75-6ca8c84573d3");

            migrationBuilder.RenameTable(
                name: "Style",
                newName: "Styles");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Styles",
                table: "Styles",
                column: "Id");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "5ffc6762-3e95-4285-8a15-b5c150da4cde", null, "User", "USER" },
                    { "f95dd036-3705-45da-94b8-713d0ff6f6ef", null, "Admin", "ADMIN" }
                });
        }
    }
}
