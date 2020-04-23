
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "item" (
    "id" SERIAL PRIMARY KEY,
    "description" VARCHAR (80) NOT NULL,
    "image_url" VARCHAR (2083),
    "user_id" INT REFERENCES "user"
);

-- ONLY RUN AFTER REGISTERING

INSERT INTO "item"
    ("description", "image_url", "user_id")
VALUES
    ('A fruit like substance', 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.idathrasher.com%2Fwp-content%2Fuploads%2Fportraits%2Fchildren%2Fchild-portrait-12.jpg&f=1&nofb=1', 1),
    ('Portabello Marshmellow', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F736x%2F67%2Fe6%2F55%2F67e6558fd784d255b0fedd87a8249cf7--gourmet-marshmallow-party-box.jpg&f=1&nofb=1', 1),
    ('Some kind of meat', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi5.walmartimages.com%2Fasr%2F220b9405-3e45-4410-8996-1db6e5262f3a_1.dcef6a080c598b7fbcd60de1456562cd.jpeg&f=1&nofb=1', 1);