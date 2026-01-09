import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types pour la base de données
export type Database = {
  public: {
    Tables: {
      chateaux: {
        Row: {
          id: string;
          nom: string;
          slug: string;
          region: string;
          capacite_min: number;
          capacite_max: number;
          style_architectural: string;
          description: string;
          atouts: string[];
          images: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['chateaux']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['chateaux']['Insert']>;
      };
      evenements: {
        Row: {
          id: string;
          titre: string;
          slug: string;
          description: string;
          icon: string;
          services_inclus: string[];
          image: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['evenements']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['evenements']['Insert']>;
      };
      testimonials: {
        Row: {
          id: string;
          nom: string;
          entreprise: string;
          poste: string;
          contenu: string;
          avatar: string;
          note: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['testimonials']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['testimonials']['Insert']>;
      };
      demandes_devis_chateaux: {
        Row: {
          id: string;
          type_evenement: 'seminaire' | 'journee-etude' | 'soiree-entreprise' | 'team-building' | 'autre';
          dates_souhaitees: string;
          duree: '1-jour' | '2-jours' | '3-jours-plus';
          chateau_id: string;
          entreprise: string;
          nom_prenom: string;
          email: string;
          telephone_mobile: string;
          nombre_participants: number;
          nombre_chambres: number;
          plus_de_500_participants: boolean;
          plus_de_400_chambres: boolean;
          chambres_twin: boolean;
          budget: string;
          commentaire_deroulement: string;
          fichier_url: string | null;
          statut: 'nouveau' | 'en-cours' | 'traite' | 'annule';
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['demandes_devis_chateaux']['Row'], 'id' | 'created_at' | 'updated_at' | 'statut'> & {
          statut?: 'nouveau' | 'en-cours' | 'traite' | 'annule';
        };
        Update: Partial<Database['public']['Tables']['demandes_devis_chateaux']['Insert']>;
      };
    };
  };
};
