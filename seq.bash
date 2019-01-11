sequelize model:generate --name movies --attributes title:string,genre:string 

sequelize model:generate --name users --attributes fname:string,lname:string,email:string,username:string

sequelize model:generate --name movie_users --attributes user_id:integer,movie_id:integer