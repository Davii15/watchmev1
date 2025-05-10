-- Insert sample data for Tucheki Trailers platform

-- Sample trailers
INSERT INTO trailers (title, description, category, thumbnail, video_src, director, cast, duration, release_date, views, likes, comments, trending, featured)
VALUES
  (
    'Savannah Sunrise',
    'Experience the breathtaking beauty of Kenya''s savannah in this emotional journey of a wildlife photographer who discovers more than just amazing shots. A story of conservation, connection, and the circle of life.',
    'Drama',
    '/images/savannah-sunrise.jpg',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    'Wanjiku Mwangi',
    ARRAY['John Kamau', 'Aisha Omar', 'David Ochieng'],
    '2:15',
    '2023-09-15',
    12540,
    3240,
    89,
    TRUE,
    TRUE
  ),
  (
    'Nairobi Nights',
    'A thrilling crime drama set in the bustling streets of Nairobi. Follow detective Malik as he navigates the city''s underworld to solve a series of mysterious disappearances.',
    'Drama',
    '/images/nairobi-nights.jpg',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    'James Mwangi',
    ARRAY['Sarah Wanjiru', 'Michael Otieno', 'Lucy Akinyi'],
    '1:45',
    '2023-08-20',
    8750,
    1890,
    42,
    TRUE,
    TRUE
  ),
  (
    'Mombasa Memories',
    'A heartwarming romance set against the backdrop of Mombasa''s beautiful beaches. Two childhood friends reconnect after years apart and discover feelings they never knew existed.',
    'Romance',
    '/images/mombasa-memories.jpg',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    'Fatima Hassan',
    ARRAY['Omar Salim', 'Amina Yusuf', 'Hassan Juma'],
    '2:30',
    '2023-07-10',
    6320,
    2100,
    63,
    FALSE,
    TRUE
  ),
  (
    'Kilimanjaro Secrets',
    'An adventure film following a group of friends who embark on a journey to climb Mount Kilimanjaro, only to discover an ancient mystery hidden in its slopes.',
    'Adventure',
    '/images/kilimanjaro-secrets.jpg',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    'Thomas Omondi',
    ARRAY['Peter Kamau', 'Elizabeth Njeri', 'Robert Kiprop'],
    '2:10',
    '2023-06-05',
    9120,
    2780,
    71,
    TRUE,
    FALSE
  ),
  (
    'Safari Wildlife',
    'A stunning documentary showcasing the incredible diversity of wildlife in Kenya''s national parks and conservation areas.',
    'Documentary',
    '/images/safari-wildlife.jpg',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    'Jane Mutua',
    ARRAY['Narrator: George Ndirangu'],
    '1:55',
    '2023-05-15',
    7840,
    1560,
    38,
    FALSE,
    TRUE
  ),
  (
    'Kenyan Landscape',
    'A visual journey through Kenya''s diverse landscapes, from the Great Rift Valley to the coastal regions, showcasing the country''s natural beauty.',
    'Documentary',
    '/images/kenyan-landscape.jpg',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    'Samuel Waweru',
    ARRAY['Narrator: Caroline Mutoko'],
    '2:20',
    '2023-04-20',
    5630,
    980,
    25,
    FALSE,
    FALSE
  ),
  (
    'Nairobi Hustle',
    'A gritty drama about young entrepreneurs trying to make it in the competitive business world of Nairobi. Follow their struggles, failures, and triumphs as they chase their dreams.',
    'Drama',
    '/images/nairobi-hustle.jpg',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    'Brian Odhiambo',
    ARRAY['Victor Maina', 'Joyce Wambui', 'Eric Omondi'],
    '2:05',
    '2023-03-10',
    10250,
    3100,
    82,
    TRUE,
    FALSE
  ),
  (
    'Lions Pride',
    'An intimate look at the life of a lion pride in the Maasai Mara, following them through the seasons as they hunt, play, and survive.',
    'Documentary',
    '/images/lions-pride.jpg',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
    'Catherine Wangari',
    ARRAY['Narrator: Jeff Koinange'],
    '1:50',
    '2023-02-15',
    6890,
    1420,
    45,
    FALSE,
    TRUE
  ),
  (
    'Maasai Warriors',
    'A cultural documentary exploring the traditions and changing lifestyle of the Maasai warriors in modern Kenya.',
    'Documentary',
    '/images/maasai-warriors.jpg',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
    'Daniel Lekishon',
    ARRAY['Various Maasai community members'],
    '2:25',
    '2023-01-20',
    5120,
    1050,
    37,
    FALSE,
    FALSE
  ),
  (
    'Coastal Love',
    'A romantic comedy set in the coastal town of Lamu, where a city girl falls in love with a local fisherman, bridging their different worlds.',
    'Romance',
    '/images/coastal-love.jpg',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    'Amina Abdalla',
    ARRAY['Feisal Ahmed', 'Sophia Wanjiku', 'Ali Hassan'],
    '2:00',
    '2022-12-10',
    7350,
    2240,
    58,
    FALSE,
    TRUE
  );

-- Insert sample tags
INSERT INTO tags (name)
VALUES
  ('Action'),
  ('Drama'),
  ('Romance'),
  ('Comedy'),
  ('Documentary'),
  ('Adventure'),
  ('Thriller'),
  ('Family'),
  ('Wildlife'),
  ('Urban'),
  ('Rural'),
  ('Historical'),
  ('Cultural'),
  ('Musical'),
  ('Sports');

-- Create RLS policies for remaining tables
-- Shares policies
CREATE POLICY "Shares are viewable by admins"
  ON shares FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Anyone can insert shares"
  ON shares FOR INSERT
  WITH CHECK (true);

-- Playlists policies
CREATE POLICY "Public playlists are viewable by everyone"
  ON playlists FOR SELECT
  USING (is_public OR auth.uid() = user_id);

CREATE POLICY "Authenticated users can create playlists"
  ON playlists FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own playlists"
  ON playlists FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own playlists"
  ON playlists FOR DELETE
  USING (auth.uid() = user_id);

-- Playlist items policies
CREATE POLICY "Playlist items are viewable if playlist is public or owned by user"
  ON playlist_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM playlists
      WHERE playlists.id = playlist_id
      AND (playlists.is_public OR playlists.user_id = auth.uid())
    )
  );

CREATE POLICY "Users can insert items into their own playlists"
  ON playlist_items FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM playlists
      WHERE playlists.id = playlist_id
      AND playlists.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete items from their own playlists"
  ON playlist_items FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM playlists
      WHERE playlists.id = playlist_id
      AND playlists.user_id = auth.uid()
    )
  );

-- Tags policies
CREATE POLICY "Tags are viewable by everyone"
  ON tags FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage tags"
  ON tags FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Trailer tags policies
CREATE POLICY "Trailer tags are viewable by everyone"
  ON trailer_tags FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage trailer tags"
  ON trailer_tags FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Notifications policies
CREATE POLICY "Users can view their own notifications"
  ON notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "System can insert notifications"
  ON notifications FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update their own notifications"
  ON notifications FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own notifications"
  ON notifications FOR DELETE
  USING (auth.uid() = user_id);

-- Ads policies
CREATE POLICY "Ads are viewable by everyone"
  ON ads FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage ads"
  ON ads FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );
