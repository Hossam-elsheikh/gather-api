users
-----
id (uuid, pk)
username (unique)
firstName
lastName
email (unique)
password
bio
avatar_url
is_verified
created_at
updated_at

user_genres
-----------
user_id (fk)
genre_id (fk)
PRIMARY KEY (user_id, genre_id)

communities
-----------
id (uuid, pk)
name
slug (unique)
description
cover_image
is_private
owner_id (fk -> users.id)
created_at

genres
------
id (uuid, pk)
name (unique) -- Tech, Gaming, Health, Art...
slug (unique)

community_genres
----------------
community_id (fk)
genre_id (fk)
PRIMARY KEY (community_id, genre_id)

community_members
-----------------
id (uuid, pk)
community_id (fk)
user_id (fk)
role ENUM('admin','moderator','member')
joined_at

community_join_requests
-----------------------
id (uuid, pk)
community_id (fk -> communities.id)
user_id (fk -> users.id)
status ENUM('pending', 'approved', 'rejected')
requested_at
reviewed_at
reviewed_by (fk -> users.id) -- admin/moderator

posts
-----
id (uuid, pk)
community_id (fk)
author_id (fk -> users.id)
content (text)
media_url (nullable)
is_pinned
created_at
updated_at

comments
--------
id (uuid, pk)
post_id (fk)
author_id (fk)
parent_id (fk -> comments.id, nullable)
content
created_at

reactions
---------
id (uuid, pk)
user_id (fk)
target_id (uuid)
target_type ENUM('post','comment')
reaction_type ENUM('like','love','laugh')
created_at

notifications
-------------
id (uuid, pk)
user_id (fk)
type
payload (jsonb)
is_read
created_at

media
-----
id (uuid, pk)
user_id (fk)
url
type ENUM('image','video')
created_at
