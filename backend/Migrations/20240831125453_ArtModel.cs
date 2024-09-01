using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class ArtModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7cc0cd4d-50a6-4081-9504-220e184a0356");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "dd590eaf-a454-4d93-88a3-723da6c05a03");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "47c4bce8-d9bb-4292-a85a-9bd104254d39", null, "Admin", "ADMIN" },
                    { "8698fa12-85d0-429b-a19c-ac1628c6b582", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
                    { "7cc0cd4d-50a6-4081-9504-220e184a0356", null, "Admin", "ADMIN" },
                    { "dd590eaf-a454-4d93-88a3-723da6c05a03", null, "User", "USER" }
                });
        }
    }
}
