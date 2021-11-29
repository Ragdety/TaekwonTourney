DECLARE @idNum INT = 16;

--WHILE @idNum < 25
--BEGIN
--	UPDATE BreakingMatches
--	SET ParticipantFirstName = 
--		(SELECT FirstName 
--		 FROM Participants 
--		 WHERE Id = @idNum)
--	WHERE ParticipantId = @idNum
--   SET @idNum = @idNum + 1;
--END;

WHILE @idNum < 25
BEGIN
	UPDATE BreakingMatches
	SET ParticipantLastName = 
		(SELECT LastName 
		 FROM Participants 
		 WHERE Id = @idNum)
	WHERE ParticipantId = @idNum
   SET @idNum = @idNum + 1;
END;


SELECT p.Id, p.LastName, b.ParticipantId, B.ParticipantLastName FROM Participants p
JOIN BreakingMatches b ON b.ParticipantId = p.Id