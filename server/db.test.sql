--  sql query and database testing 
--  recommended : use psql (postgress cli) to execute the query
--  format : psql -U username -d database_name -f db.test.sql location ie :  ./server/db.test.sql

-- check if the index is available
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'faculty'; -- write the table to get the indexs of specific table