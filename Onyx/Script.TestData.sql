/*
Post-Deployment Script Template							
--------------------------------------------------------------------------------------
 This file contains SQL statements that will be appended to the build script.		
 Use SQLCMD syntax to include a file in the post-deployment script.			
 Example:      :r .\myfile.sql								
 Use SQLCMD syntax to reference a variable in the post-deployment script.		
 Example:      :setvar TableName MyTable							
               SELECT * FROM [$(TableName)]					
--------------------------------------------------------------------------------------
*/


if ('$(DeployTestData)' = 'true')
BEGIN

delete from users;

INSERT INTO Users (fname, lname, email, mobile, studentid, staffid) VALUES
('Fred', 'Flintstone', 'fred@gmail.com', '0438 555 123', 's1234567', null),
('Barney', 'Rubble', 'barney@yahoo.com', '0411 555 321', null, '999444222');

END;