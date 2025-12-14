CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    user_session VARCHAR(255) NOT NULL,
    project_name VARCHAR(255) NOT NULL,
    description TEXT,
    poehali_project_id VARCHAR(255),
    poehali_url TEXT,
    status VARCHAR(50) DEFAULT 'creating',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS poehali_accounts (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    api_token TEXT,
    requests_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_projects_session ON projects(user_session);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_accounts_active ON poehali_accounts(is_active);