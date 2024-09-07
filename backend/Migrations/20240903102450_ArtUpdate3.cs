using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class ArtUpdate3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2b682781-c8da-485a-9baf-989208853e54");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e0ddc61f-e98d-415b-8df7-8717319fe600");

            migrationBuilder.AlterColumn<string>(
                name: "Condition",
                table: "Art",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "6f45c183-933d-4778-822b-6a469cf6600b", null, "Admin", "ADMIN" },
                    { "8ee3ae67-005c-4e62-94f3-df6cd8aa36a9", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6f45c183-933d-4778-822b-6a469cf6600b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8ee3ae67-005c-4e62-94f3-df6cd8aa36a9");

            migrationBuilder.AlterColumn<long>(
                name: "Condition",
                table: "Art",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2b682781-c8da-485a-9baf-989208853e54", null, "User", "USER" },
                    { "e0ddc61f-e98d-415b-8df7-8717319fe600", null, "Admin", "ADMIN" }
                });
        }
    }
}
