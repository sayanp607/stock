CREATE TABLE IF NOT EXISTS user_profile (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    age_group VARCHAR(32),
    marital_status VARCHAR(32),
    investment_goal VARCHAR(32),
    market_comfort VARCHAR(32),
    market_reaction VARCHAR(32),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);