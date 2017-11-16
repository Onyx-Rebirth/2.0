CREATE TABLE [dbo].[Attendance]
(
	[CardNo] INT NOT NULL PRIMARY KEY, 
    [SessionId] INT NULL, 
    [TapDateTime] DATETIME NULL,
	constraint fk_attendance_card foreign key (CardNo) references card,
	constraint fk_attendance_session foreign key (SessionId) references session
)
