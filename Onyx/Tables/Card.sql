CREATE TABLE [dbo].[Card]
(
	[CardNo] INT NOT NULL PRIMARY KEY, 
    [UID] INT NULL,
	constraint fk_card_user foreign key (UID) references Users
)
