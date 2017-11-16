CREATE TABLE [dbo].[Session]
(
	[SessionId] INT NOT NULL PRIMARY KEY, 
    [SessionDate] DATE NULL, 
    [CID] INT NULL,
	[RoomNo] NVARCHAR(10) NULL, 
    constraint fk_session_classgroup foreign key (CID) references classgroup,
	constraint fk_session_location foreign key (RoomNo) references location,
	constraint uq_classId unique (CID, sessionDate)
)
