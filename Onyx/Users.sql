CREATE TABLE [dbo].[Users]
(
	[uid] INT NOT NULL PRIMARY KEY, 
    [fname] NVARCHAR(50) NULL, 
    [lname] NVARCHAR(50) NULL, 
    [email] NVARCHAR(50) NULL, 
    [mobile] NVARCHAR(50) NULL, 
    [studentid] NVARCHAR(50) NULL, 
    [staffid] NVARCHAR(50) NULL,
	constraint uq_studentid unique (studentid),
	constraint uq_staffid unique (staffid),

)
