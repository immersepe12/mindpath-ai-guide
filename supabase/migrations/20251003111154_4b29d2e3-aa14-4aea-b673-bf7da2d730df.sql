-- Create leads table to store all form submissions
CREATE TABLE public.leads (
  -- Primary identification
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id text UNIQUE NOT NULL,
  
  -- User contact information
  first_name text NOT NULL,
  email text NOT NULL,
  mobile text NOT NULL,
  
  -- Lead source tracking
  lead_source text NOT NULL,
  current_page text,
  full_url text,
  form_source_custom text,
  
  -- UTM parameters for marketing tracking
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  
  -- Browser and device information
  user_agent text,
  
  -- Freshworks integration tracking
  freshworks_success boolean DEFAULT false,
  freshworks_method text,
  freshworks_error text,
  
  -- Submission status and metadata
  submission_status text DEFAULT 'success',
  error_message text,
  program text DEFAULT 'MindTalk 90-Day Recovery Journey',
  
  -- Timestamps
  created_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX idx_leads_email ON public.leads(email);
CREATE INDEX idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX idx_leads_lead_source ON public.leads(lead_source);
CREATE INDEX idx_leads_submission_id ON public.leads(submission_id);

-- Enable Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Policy 1: Anyone can insert leads (public form submissions)
CREATE POLICY "Anyone can submit leads"
  ON public.leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy 2: Only authenticated users can view leads
CREATE POLICY "Authenticated users can view all leads"
  ON public.leads
  FOR SELECT
  TO authenticated
  USING (true);