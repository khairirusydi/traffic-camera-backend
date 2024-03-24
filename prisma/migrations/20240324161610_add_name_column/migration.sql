/*
  Warnings:

  - Added the required column `name` to the `SearchQuery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SearchQuery" ADD COLUMN     "name" TEXT NOT NULL;
