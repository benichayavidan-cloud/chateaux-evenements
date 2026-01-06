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
    };
  };
};
