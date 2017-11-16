CREATE TABLE [dbo].[Attendance]
(
	[CardNo] INT NOT NULL, 
    [ScannerId] NVARCHAR(100) NOT NULL, 
    [TapDateTime] DATETIME NOT NULL,
	constraint pk_attendance primary key (CardNo, TapDateTime),
	constraint fk_attendance_card foreign key (CardNo) references Card,
	constraint fk_attendance_location foreign key (ScannerId) references SCANNER
)
