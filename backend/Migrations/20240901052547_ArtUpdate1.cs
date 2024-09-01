using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class ArtUpdate1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "47c4bce8-d9bb-4292-a85a-9bd104254d39");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8698fa12-85d0-429b-a19c-ac1628c6b582");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "57df42ee-b7d1-4c6e-b3af-2cb8be2f5ad0", null, "User", "USER" },
                    { "f884b2ea-0d6d-40fc-84fa-59422134e564", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "57df42ee-b7d1-4c6e-b3af-2cb8be2f5ad0");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f884b2ea-0d6d-40fc-84fa-59422134e564");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "47c4bce8-d9bb-4292-a85a-9bd104254d39", null, "Admin", "ADMIN" },
                    { "8698fa12-85d0-429b-a19c-ac1628c6b582", null, "User", "USER" }
                });
        }
    }
}
