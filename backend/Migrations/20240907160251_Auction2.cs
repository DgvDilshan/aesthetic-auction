using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class Auction2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4d96336f-e06a-4fb0-8e6c-00a03adee2c5");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b4e6f19a-96c3-4371-b9ab-4fe2a497bc13");

            migrationBuilder.AlterColumn<string>(
                name: "Status",
                table: "Auction",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "b0fb7d63-badc-429e-977c-99aa7be1df8a", null, "User", "USER" },
                    { "cba465b6-a9ed-49bc-9c17-e8d9fdf853f1", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b0fb7d63-badc-429e-977c-99aa7be1df8a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "cba465b6-a9ed-49bc-9c17-e8d9fdf853f1");

            migrationBuilder.AlterColumn<int>(
                name: "Status",
                table: "Auction",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "4d96336f-e06a-4fb0-8e6c-00a03adee2c5", null, "Admin", "ADMIN" },
                    { "b4e6f19a-96c3-4371-b9ab-4fe2a497bc13", null, "User", "USER" }
                });
        }
    }
}
