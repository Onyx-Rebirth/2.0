CREATE TABLE [dbo].[classgroup]
(
	[CID] INT DEFAULT(NEXT VALUE FOR DBO.seq_classgroup) NOT NULL PRIMARY KEY, 
    [dayname] NVARCHAR(10) NULL, 
    [start_time] TIME NULL, 
    [end_time] TIME NULL, 
    [teacher_uid] INT NULL,
	constraint fk_classgroup_user foreign key (teacher_uid) references Users (uid),
	constraint ck_dayname check (dayname in ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'))
)