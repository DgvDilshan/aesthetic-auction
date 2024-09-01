using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class ArtUpd : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "57df42ee-b7d1-4c6e-b3af-2cb8be2f5ad0");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f884b2ea-0d6d-40fc-84fa-59422134e564");

            migrationBuilder.CreateTable(
                name: "Art",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Lot = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CurrentMarketPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Condition = table.Column<long>(type: "bigint", nullable: false),
                    isFramed = table.Column<bool>(type: "bit", nullable: false),
                    Height = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Width = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    StyleId = table.Column<int>(type: "int", nullable: true),
                    MediumId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Art", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Art_Medium_MediumId",
                        column: x => x.MediumId,
                        principalTable: "Medium",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Art_Style_StyleId",
                        column: x => x.StyleId,
                        principalTable: "Style",
                        principalColumn: "Id");
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "95af2528-f5ca-411d-9fbe-95c5886af81f", null, "User", "USER" },
                    { "fdc7b8af-0ba8-4efd-98ea-d9baee98c902", null, "Admin", "ADMIN" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Art_MediumId",
                table: "Art",
                column: "MediumId");

            migrationBuilder.CreateIndex(
                name: "IX_Art_StyleId",
                table: "Art",
                column: "StyleId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Art");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "95af2528-f5ca-411d-9fbe-95c5886af81f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "fdc7b8af-0ba8-4efd-98ea-d9baee98c902");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "57df42ee-b7d1-4c6e-b3af-2cb8be2f5ad0", null, "User", "USER" },
                    { "f884b2ea-0d6d-40fc-84fa-59422134e564", null, "Admin", "ADMIN" }
                });
        }
    }
}
