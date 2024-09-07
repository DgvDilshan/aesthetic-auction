using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class Auction1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "137d5332-06f8-4a4d-8c0f-1cc5d74cf56f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "20b48d72-cadb-4256-b247-56dd2c91b1bb");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Auction",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "4d96336f-e06a-4fb0-8e6c-00a03adee2c5", null, "Admin", "ADMIN" },
                    { "b4e6f19a-96c3-4371-b9ab-4fe2a497bc13", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Auction_ArtId",
                table: "Auction",
                column: "ArtId");

            migrationBuilder.CreateIndex(
                name: "IX_Auction_UserId",
                table: "Auction",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Auction_Art_ArtId",
                table: "Auction",
                column: "ArtId",
                principalTable: "Art",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Auction_AspNetUsers_UserId",
                table: "Auction",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Auction_Art_ArtId",
                table: "Auction");

            migrationBuilder.DropForeignKey(
                name: "FK_Auction_AspNetUsers_UserId",
                table: "Auction");

            migrationBuilder.DropIndex(
                name: "IX_Auction_ArtId",
                table: "Auction");

            migrationBuilder.DropIndex(
                name: "IX_Auction_UserId",
                table: "Auction");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4d96336f-e06a-4fb0-8e6c-00a03adee2c5");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b4e6f19a-96c3-4371-b9ab-4fe2a497bc13");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Auction");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "137d5332-06f8-4a4d-8c0f-1cc5d74cf56f", null, "User", "USER" },
                    { "20b48d72-cadb-4256-b247-56dd2c91b1bb", null, "Admin", "ADMIN" }
                });
        }
    }
}
