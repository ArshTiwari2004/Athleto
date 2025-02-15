"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

// Types for opportunity creation
export interface OpportunityType {
  id: string;
  brand_id: string;
  title: string;
  type: 'sponsorship' | 'training_camp' | 'endorsement_deal' | 'tournament' | 'equipment_grant' | 'scholarship' | 'job_offer' | 'internship' | 'other';
  description: string;
  location: {
    city: string;
    state: string;
    country: string;
    is_remote: boolean;
  };
  deadline: string;
  spots_available: number;
  sport_category: string;
  skill_level: 'beginner' | 'intermediate' | 'advanced' | 'pro';
  eligibility_criteria: string;
  required_documents: string[];
  funding_amount: {
    min: number;
    max: number;
    currency: string;
  };
  selection_process: {
    auto_shortlist: boolean;
    manual_review: boolean;
    physical_trial: boolean;
    interview_required: boolean;
  };
  status: 'draft' | 'published' | 'closed';
  applications_count: number;
  created_at: string;
  updated_at: string;
}

interface OpportunityContextType {
  opportunities: OpportunityType[];
  loading: boolean;
  error: string | null;
  createOpportunity: (opportunity: Partial<OpportunityType>) => Promise<void>;
  updateOpportunity: (id: string, updates: Partial<OpportunityType>) => Promise<void>;
  deleteOpportunity: (id: string) => Promise<void>;
  getOpportunityById: (id: string) => Promise<OpportunityType | null>;
  getOpportunitiesByBrand: (brandId: string) => Promise<OpportunityType[]>;
  getOpenOpportunities: () => Promise<OpportunityType[]>;
}

const OpportunityContext = createContext<OpportunityContextType | undefined>(undefined);

export const OpportunityProvider = ({ children }: { children: React.ReactNode }) => {
  const [opportunities, setOpportunities] = useState<OpportunityType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial opportunities
  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    try {
      const { data, error } = await supabase
        .from('opportunities')
        .select('*');

      if (error) throw error;
      setOpportunities(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createOpportunity = async (opportunity: Partial<OpportunityType>) => {
    try {
      const { data, error } = await supabase
        .from('opportunities')
        .insert([opportunity])
        .select()
        .single();

      if (error) throw error;
      setOpportunities([...opportunities, data]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create opportunity');
      throw err;
    }
  };

  const updateOpportunity = async (id: string, updates: Partial<OpportunityType>) => {
    try {
      const { data, error } = await supabase
        .from('opportunities')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setOpportunities(opportunities.map(opp => opp.id === id ? data : opp));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update opportunity');
      throw err;
    }
  };

  const deleteOpportunity = async (id: string) => {
    try {
      const { error } = await supabase
        .from('opportunities')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setOpportunities(opportunities.filter(opp => opp.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete opportunity');
      throw err;
    }
  };

  const getOpportunityById = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('opportunities')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch opportunity');
      return null;
    }
  };

  const getOpportunitiesByBrand = async (brandId: string) => {
    try {
      const { data, error } = await supabase
        .from('opportunities')
        .select('*')
        .eq('brand_id', brandId);

      if (error) throw error;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch brand opportunities');
      return [];
    }
  };

  const getOpenOpportunities = async () => {
    try {
      const { data, error } = await supabase
        .from('opportunities')
        .select('*')
        .eq('status', 'published');

      if (error) throw error;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch open opportunities');
      return [];
    }
  };

  return (
    <OpportunityContext.Provider value={{
      opportunities,
      loading,
      error,
      createOpportunity,
      updateOpportunity,
      deleteOpportunity,
      getOpportunityById,
      getOpportunitiesByBrand,
      getOpenOpportunities
    }}>
      {children}
    </OpportunityContext.Provider>
  );
};

export const useOpportunity = () => {
  const context = useContext(OpportunityContext);
  if (!context) {
    throw new Error('useOpportunity must be used within an OpportunityProvider');
  }
  return context;
};