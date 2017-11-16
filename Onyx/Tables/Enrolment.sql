CREATE TABLE [dbo].[Enrolment]
(
	[UID] INT NOT NULL, 
    [CID] INT NOT NULL,
	constraint fk_enrol_user foreign key (uid) references users,
	constraint fk_enrol_classgroup foreign key (cid) references classgroup,
	constraint pk_enrol primary key (uid, cid)
)
