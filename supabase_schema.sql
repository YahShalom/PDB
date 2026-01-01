-- Perry D Beauty Studio - Complete Supabase Schema
-- Execute this script in Supabase SQL Editor (Project: daqejgebvsoxujzfahdg)

-- ============================================================================
-- SECTION 1: EXTENSIONS
-- ============================================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable pgcrypto for hashing
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- SECTION 2: ENUMS
-- ============================================================================

-- User roles
CREATE TYPE user_role AS ENUM (
    'owner',
    'admin', 
    'staff',
    'editor',
    'viewer',
    'authenticated',
    'anon'
);

-- Post status
CREATE TYPE post_status AS ENUM (
    'draft',
    'published',
    'archived'
);

-- Booking status
CREATE TYPE booking_status AS ENUM (
    'pending',
    'confirmed',
    'cancelled',
    'completed',
    'no_show'
);

-- Payment status
CREATE TYPE payment_status AS ENUM (
    'pending',
    'paid',
    'refunded',
    'failed'
);

-- Service category
CREATE TYPE service_category AS ENUM (
    'hair',
    'nails',
    'skin',
    'makeup',
    'other'
);

-- ============================================================================
-- SECTION 3: CORE TABLES
-- ============================================================================

-- Business Settings (singleton)
CREATE TABLE IF NOT EXISTS business_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_name TEXT NOT NULL DEFAULT 'Perry D Beauty Studio',
    description TEXT,
    contact_email TEXT,
    contact_phone TEXT,
    address TEXT,
    website TEXT,
    social_links JSONB DEFAULT '{}',
    operating_hours JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT single_business_settings CHECK (id = (SELECT id FROM business_settings LIMIT 1))
);

-- Categories
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT,
    color TEXT DEFAULT '#6366f1',
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Services
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    description TEXT,
    duration_minutes INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Posts (Blog/Content)
CREATE TABLE IF NOT EXISTS posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE,
    excerpt TEXT,
    content TEXT,
    featured_image TEXT,
    status post_status DEFAULT 'draft',
    published_at TIMESTAMPTZ,
    author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- SECTION 4: AUTH, ROLES & PROFILES
-- ============================================================================

-- User Profiles
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    avatar_url TEXT,
    bio TEXT,
    phone TEXT,
    role user_role DEFAULT 'authenticated',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- SECTION 5: BUSINESS CONTENT TABLES
-- ============================================================================

-- Gallery
CREATE TABLE IF NOT EXISTS gallery (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT,
    description TEXT,
    image_url TEXT NOT NULL,
    category TEXT,
    is_featured BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_name TEXT NOT NULL,
    client_avatar TEXT,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    testimonial TEXT NOT NULL,
    service_performed TEXT,
    date_of_service DATE,
    is_featured BOOLEAN DEFAULT false,
    is_approved BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Team Members
CREATE TABLE IF NOT EXISTS team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    role_title TEXT,
    bio TEXT,
    avatar_url TEXT,
    specialties TEXT[],
    social_links JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- SECTION 6: BOOKINGS, CRM, PAYMENTS & REMINDERS
-- ============================================================================

-- Customers
CREATE TABLE IF NOT EXISTS customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    email TEXT UNIQUE,
    phone TEXT,
    date_of_birth DATE,
    notes TEXT,
    preferred_services TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bookings
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
    service_id UUID REFERENCES services(id) ON DELETE RESTRICT,
    staff_id UUID REFERENCES team_members(id) ON DELETE SET NULL,
    booking_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    status booking_status DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payments
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    payment_method TEXT,
    status payment_status DEFAULT 'pending',
    transaction_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reminders
CREATE TABLE IF NOT EXISTS reminders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    reminder_type TEXT NOT NULL, -- 'email', 'sms', 'push'
    scheduled_for TIMESTAMPTZ NOT NULL,
    sent_at TIMESTAMPTZ,
    status TEXT DEFAULT 'pending', -- 'pending', 'sent', 'failed'
    content TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- SECTION 7: AI & AUTOMATION TABLES
-- ============================================================================

-- AI Chat History
CREATE TABLE IF NOT EXISTS ai_chat_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    session_id TEXT NOT NULL,
    message_type TEXT NOT NULL, -- 'user', 'assistant', 'system'
    content TEXT NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI Prompts
CREATE TABLE IF NOT EXISTS ai_prompts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    system_prompt TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Automation Rules
CREATE TABLE IF NOT EXISTS automation_rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    trigger_event TEXT NOT NULL, -- 'booking_created', 'payment_received', etc.
    conditions JSONB DEFAULT '{}',
    actions JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- SECTION 8: TRIGGERS & AUDIT
-- ============================================================================

-- Updated At Trigger Function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers
CREATE TRIGGER update_business_settings_updated_at BEFORE UPDATE ON business_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_gallery_updated_at BEFORE UPDATE ON gallery FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON team_members FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reminders_updated_at BEFORE UPDATE ON reminders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_ai_prompts_updated_at BEFORE UPDATE ON ai_prompts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_automation_rules_updated_at BEFORE UPDATE ON automation_rules FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Audit Log Function
CREATE OR REPLACE FUNCTION audit_trigger()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO audit_logs(table_name, operation, old_data, new_data, user_id, timestamp)
    VALUES (
        TG_TABLE_NAME,
        TG_OP,
        CASE WHEN TG_OP = 'DELETE' THEN row_to_json(OLD) ELSE NULL END,
        CASE WHEN TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN row_to_json(NEW) ELSE NULL END,
        COALESCE(current_setting('app.current_user_id', true)::uuid, NULL),
        NOW()
    );
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- SECTION 9: RLS POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE business_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_chat_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE automation_rules ENABLE ROW LEVEL SECURITY;

-- Helper Functions for RLS
CREATE OR REPLACE FUNCTION is_owner_or_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = user_id 
        AND role IN ('owner', 'admin')
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION is_staff_or_above(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = user_id 
        AND role IN ('owner', 'admin', 'staff', 'editor')
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION is_viewer_or_above(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = user_id 
        AND role IN ('owner', 'admin', 'staff', 'editor', 'viewer')
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Business Settings Policies
CREATE POLICY "Business settings are viewable by authenticated users" ON business_settings FOR SELECT USING (auth.role() IN ('authenticated', 'service_role'));
CREATE POLICY "Business settings are updatable by owners and admins" ON business_settings FOR ALL USING (is_owner_or_admin(auth.uid()));

-- Categories Policies
CREATE POLICY "Categories are viewable by everyone" ON categories FOR SELECT USING (is_active = true);
CREATE POLICY "Categories are manageable by staff and above" ON categories FOR ALL USING (is_staff_or_above(auth.uid()));

-- Services Policies
CREATE POLICY "Services are viewable by everyone" ON services FOR SELECT USING (is_active = true);
CREATE POLICY "Services are manageable by staff and above" ON services FOR ALL USING (is_staff_or_above(auth.uid()));

-- Posts Policies
CREATE POLICY "Published posts are viewable by everyone" ON posts FOR SELECT USING (status = 'published');
CREATE POLICY "All posts are viewable by authenticated users" ON posts FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Posts are manageable by editors and above" ON posts FOR ALL USING (is_staff_or_above(auth.uid()));

-- Profiles Policies
CREATE POLICY "Profiles are viewable by authenticated users" ON profiles FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Users can view their own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Profiles are manageable by owners and admins" ON profiles FOR ALL USING (is_owner_or_admin(auth.uid()));

-- Gallery Policies
CREATE POLICY "Gallery is viewable by everyone" ON gallery FOR SELECT USING (true);
CREATE POLICY "Gallery is manageable by staff and above" ON gallery FOR ALL USING (is_staff_or_above(auth.uid()));

-- Testimonials Policies
CREATE POLICY "Approved testimonials are viewable by everyone" ON testimonials FOR SELECT USING (is_approved = true);
CREATE POLICY "All testimonials are viewable by authenticated users" ON testimonials FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Testimonials are manageable by staff and above" ON testimonials FOR ALL USING (is_staff_or_above(auth.uid()));

-- Team Members Policies
CREATE POLICY "Active team members are viewable by everyone" ON team_members FOR SELECT USING (is_active = true);
CREATE POLICY "Team members are manageable by staff and above" ON team_members FOR ALL USING (is_staff_or_above(auth.uid()));

-- Customers Policies
CREATE POLICY "Customers are viewable by staff and above" ON customers FOR SELECT USING (is_staff_or_above(auth.uid()));
CREATE POLICY "Customers are manageable by staff and above" ON customers FOR ALL USING (is_staff_or_above(auth.uid()));

-- Bookings Policies
CREATE POLICY "Users can view their own bookings" ON bookings FOR SELECT USING (auth.uid() = (SELECT customer_id FROM customers c WHERE c.id = bookings.customer_id AND c.email = (SELECT email FROM auth.users WHERE id = auth.uid())));
CREATE POLICY "Bookings are viewable by staff and above" ON bookings FOR SELECT USING (is_staff_or_above(auth.uid()));
CREATE POLICY "Bookings are manageable by staff and above" ON bookings FOR ALL USING (is_staff_or_above(auth.uid()));

-- Payments Policies
CREATE POLICY "Users can view their own payments" ON payments FOR SELECT USING (auth.uid() = (SELECT customer_id FROM bookings b WHERE b.id = payments.booking_id AND b.customer_id IN (SELECT id FROM customers c WHERE c.email = (SELECT email FROM auth.users WHERE id = auth.uid()))));
CREATE POLICY "Payments are viewable by staff and above" ON payments FOR SELECT USING (is_staff_or_above(auth.uid()));
CREATE POLICY "Payments are manageable by staff and above" ON payments FOR ALL USING (is_staff_or_above(auth.uid()));

-- Reminders Policies
CREATE POLICY "Reminders are manageable by staff and above" ON reminders FOR ALL USING (is_staff_or_above(auth.uid()));

-- AI Chat History Policies
CREATE POLICY "Users can view their own chat history" ON ai_chat_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own chat messages" ON ai_chat_history FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "AI chat history is viewable by staff and above" ON ai_chat_history FOR SELECT USING (is_staff_or_above(auth.uid()));

-- AI Prompts Policies
CREATE POLICY "AI prompts are viewable by authenticated users" ON ai_prompts FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "AI prompts are manageable by staff and above" ON ai_prompts FOR ALL USING (is_staff_or_above(auth.uid()));

-- Automation Rules Policies
CREATE POLICY "Automation rules are viewable by staff and above" ON automation_rules FOR SELECT USING (is_staff_or_above(auth.uid()));
CREATE POLICY "Automation rules are manageable by owners and admins" ON automation_rules FOR ALL USING (is_owner_or_admin(auth.uid()));

-- ============================================================================
-- SECTION 10: ANALYTICS VIEWS
-- ============================================================================

-- Booking Analytics View
CREATE OR REPLACE VIEW booking_analytics AS
SELECT 
    DATE_TRUNC('month', booking_date) as month,
    COUNT(*) as total_bookings,
    COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_bookings,
    COUNT(CASE WHEN status = 'cancelled' THEN 1 END) as cancelled_bookings,
    SUM(s.price) as total_revenue,
    AVG(s.price) as avg_booking_value
FROM bookings b
JOIN services s ON b.service_id = s.id
GROUP BY DATE_TRUNC('month', booking_date)
ORDER BY month DESC;

-- Service Popularity View
CREATE OR REPLACE VIEW service_popularity AS
SELECT 
    s.id,
    s.name,
    s.category_id,
    COUNT(b.id) as booking_count,
    SUM(s.price) as total_revenue,
    AVG(s.price) as avg_price
FROM services s
LEFT JOIN bookings b ON s.id = b.service_id
GROUP BY s.id, s.name, s.category_id
ORDER BY booking_count DESC;

-- Customer Analytics View
CREATE OR REPLACE VIEW customer_analytics AS
SELECT 
    COUNT(*) as total_customers,
    COUNT(CASE WHEN created_at > NOW() - INTERVAL '30 days' THEN 1 END) as new_customers_30d,
    COUNT(CASE WHEN created_at > NOW() - INTERVAL '90 days' THEN 1 END) as new_customers_90d,
    AVG(EXTRACT(DAYS FROM (NOW() - created_at))) as avg_customer_age_days
FROM customers;

-- ============================================================================
-- SECTION 11: STORAGE BUCKETS
-- ============================================================================

-- Create storage buckets (these need to be created via Supabase dashboard or API)
-- For reference, create these buckets in Supabase dashboard:
-- 1. 'avatars' - for user profile pictures
-- 2. 'gallery' - for gallery images  
-- 3. 'services' - for service images
-- 4. 'posts' - for blog post featured images

-- Storage policies will be created after buckets are set up

-- ============================================================================
-- SECTION 12: SEED DATA
-- ============================================================================

-- Insert business settings
INSERT INTO business_settings (id, business_name, description, contact_email, contact_phone, address, website, operating_hours)
VALUES (
    uuid_generate_v4(),
    'Perry D Beauty Studio',
    'Your premier destination for beauty and wellness services. We offer professional hair, nail, skin care, and makeup services in a relaxing and welcoming environment.',
    'info@perrydbeauty.com',
    '(555) 123-4567',
    '123 Beauty Lane, Salon City, SC 12345',
    'https://perrydbeauty.com',
    '{
        "monday": {"open": "09:00", "close": "18:00"},
        "tuesday": {"open": "09:00", "close": "18:00"},
        "wednesday": {"open": "09:00", "close": "18:00"},
        "thursday": {"open": "09:00", "close": "20:00"},
        "friday": {"open": "09:00", "close": "20:00"},
        "saturday": {"open": "08:00", "close": "17:00"},
        "sunday": {"closed": true}
    }'
) ON CONFLICT DO NOTHING;

-- Insert categories
INSERT INTO categories (name, description, icon, color, sort_order) VALUES
('Hair', 'Professional hair styling, cutting, coloring, and treatments', 'scissors', '#8b5cf6', 1),
('Nails', 'Manicures, pedicures, and nail art services', 'sparkles', '#ec4899', 2),
('Skin', 'Facials, waxing, and skincare treatments', 'droplet', '#06b6d4', 3),
('Makeup', 'Professional makeup application and lessons', 'palette', '#f59e0b', 4),
('Other', 'Additional beauty and wellness services', 'star', '#64748b', 5)
ON CONFLICT (name) DO NOTHING;

-- Insert services
INSERT INTO services (category_id, name, description, duration_minutes, price, sort_order) VALUES
-- Hair Services
((SELECT id FROM categories WHERE name = 'Hair'), 'Haircut & Style', 'Professional haircut and blowout styling', 60, 65.00, 1),
((SELECT id FROM categories WHERE name = 'Hair'), 'Full Color', 'Complete hair color service', 120, 120.00, 2),
((SELECT id FROM categories WHERE name = 'Hair'), 'Highlights', 'Partial or full highlights', 150, 150.00, 3),
((SELECT id FROM categories WHERE name = 'Hair'), 'Deep Conditioning', 'Intensive hair treatment', 45, 45.00, 4),
-- Nail Services  
((SELECT id FROM categories WHERE name = 'Nails'), 'Manicure', 'Classic manicure with polish', 45, 35.00, 1),
((SELECT id FROM categories WHERE name = 'Nails'), 'Pedicure', 'Spa pedicure with massage', 60, 50.00, 2),
((SELECT id FROM categories WHERE name = 'Nails'), 'Gel Nails', 'Gel polish application', 60, 45.00, 3),
((SELECT id FROM categories WHERE name = 'Nails'), 'Nail Art', 'Custom nail designs', 90, 65.00, 4),
-- Skin Services
((SELECT id FROM categories WHERE name = 'Skin'), 'Facial', 'Customized facial treatment', 60, 75.00, 1),
((SELECT id FROM categories WHERE name = 'Skin'), 'Waxing - Eyebrows', 'Eyebrow shaping and waxing', 30, 20.00, 2),
((SELECT id FROM categories WHERE name = 'Skin'), 'Waxing - Full Face', 'Full face waxing service', 45, 40.00, 3),
-- Makeup Services
((SELECT id FROM categories WHERE name = 'Makeup'), 'Makeup Application', 'Professional makeup for events', 60, 65.00, 1),
((SELECT id FROM categories WHERE name = 'Makeup'), 'Makeup Lesson', 'Personal makeup instruction', 90, 85.00, 2)
ON CONFLICT DO NOTHING;

-- Insert team members
INSERT INTO team_members (name, role_title, bio, specialties, sort_order) VALUES
('Perry Davis', 'Owner & Lead Stylist', 'With over 15 years of experience in the beauty industry, Perry brings creativity and expertise to every client. Specializing in cutting-edge hair techniques and personalized beauty solutions.', ARRAY['Hair Cutting', 'Color', 'Extensions', 'Bridal'], 1),
('Maria Rodriguez', 'Senior Nail Technician', 'Maria is a certified nail artist with a passion for creating beautiful, long-lasting nail designs. She stays current with the latest trends and techniques.', ARRAY['Manicures', 'Pedicures', 'Gel Nails', 'Nail Art'], 2),
('James Chen', 'Skincare Specialist', 'James is a licensed esthetician focused on helping clients achieve healthy, glowing skin through personalized treatments and education.', ARRAY['Facials', 'Waxing', 'Skincare', 'Chemical Peels'], 3),
('Sophie Williams', 'Makeup Artist', 'Sophie is a professional makeup artist with experience in editorial, bridal, and special event makeup. She believes makeup should enhance natural beauty.', ARRAY['Makeup Application', 'Bridal Makeup', 'Special Events', 'Makeup Lessons'], 4)
ON CONFLICT DO NOTHING;

-- Insert sample testimonials
INSERT INTO testimonials (client_name, rating, testimonial, service_performed, is_featured, is_approved) VALUES
('Sarah Johnson', 5, 'Amazing experience! Perry gave me the best haircut I''ve ever had. The salon is beautiful and the staff is so friendly.', 'Haircut & Style', true, true),
('Emily Brown', 5, 'Maria did an incredible job on my nails for my wedding. They lasted perfectly and I got so many compliments!', 'Gel Nails', true, true),
('Jessica Davis', 5, 'The facial was so relaxing and my skin has never looked better. James really knows his stuff!', 'Facial', false, true),
('Amanda Wilson', 4, 'Great makeup application for my special event. Sophie listened to what I wanted and delivered perfectly.', 'Makeup Application', false, true)
ON CONFLICT DO NOTHING;

-- Insert sample gallery items
INSERT INTO gallery (title, description, category, is_featured, sort_order) VALUES
('Modern Bob Cut', 'Contemporary bob haircut with soft layers', 'Hair', true, 1),
('Gel Nail Art', 'Creative gel nail design with glitter accents', 'Nails', true, 2),
('Bridal Makeup', 'Natural bridal makeup application', 'Makeup', false, 3),
('Luxury Pedicure', 'Spa pedicure with flower design', 'Nails', false, 4),
('Hair Color Transformation', 'Before and after of color correction', 'Hair', true, 5)
ON CONFLICT DO NOTHING;

-- Insert AI prompts
INSERT INTO ai_prompts (name, description, system_prompt) VALUES
('Booking Assistant', 'Helps customers book appointments', 'You are a helpful booking assistant for Perry D Beauty Studio. Help customers schedule appointments, answer questions about services, and provide salon information.'),
('Service Recommendations', 'Recommends services based on customer needs', 'You are a beauty expert at Perry D Beauty Studio. Based on customer preferences and needs, recommend the most suitable services and treatments.'),
('Customer Support', 'Handles customer inquiries and issues', 'You are a customer support specialist for Perry D Beauty Studio. Address customer concerns, answer questions about policies, and ensure customer satisfaction.')
ON CONFLICT (name) DO NOTHING;

-- Create a sample blog post
INSERT INTO posts (title, slug, excerpt, content, status, published_at) VALUES
('Welcome to Perry D Beauty Studio', 'welcome-to-perry-d-beauty-studio', 
 'Discover our premier beauty services and experienced team dedicated to making you look and feel your best.',
 'We are excited to welcome you to Perry D Beauty Studio, your premier destination for professional beauty services. Our experienced team is dedicated to providing exceptional service in a relaxing and welcoming environment.

Whether you''re looking for a fresh new hairstyle, a rejuvenating facial, or the perfect nails for a special occasion, we have the expertise and creativity to bring your vision to life.

Our services include:
- Professional hair cutting, coloring, and styling
- Manicures, pedicures, and custom nail art
- Skincare treatments and waxing services
- Professional makeup application and lessons

Visit us today and let us help you discover your most beautiful self!',
 'published', NOW())
ON CONFLICT (slug) DO NOTHING;

-- ============================================================================
-- VERIFICATION CHECKLIST
-- ============================================================================

-- After running this script, verify:
-- 1. All tables created successfully
-- 2. RLS policies enabled on all tables
-- 3. Sample data inserted correctly
-- 4. Analytics views working
-- 5. Business settings singleton constraint working
-- 6. Storage buckets created manually in Supabase dashboard

-- Run this verification query:
-- SELECT 'schema_deployment_complete' as status, COUNT(*) as tables_created 
-- FROM information_schema.tables 
-- WHERE table_schema = 'public' 
-- AND table_name IN ('business_settings', 'categories', 'services', 'posts', 'profiles', 'gallery', 'testimonials', 'team_members', 'customers', 'bookings', 'payments', 'reminders', 'ai_chat_history', 'ai_prompts', 'automation_rules');
