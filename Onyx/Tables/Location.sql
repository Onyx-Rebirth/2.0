CREATE TABLE [dbo].[Location]
(
	[RoomNo] NVARCHAR(10) NOT NULL PRIMARY KEY, 
    [ScannerId] NVARCHAR(100) NULL,
	constraint uk_ScannerId unique (scannerId)
)
