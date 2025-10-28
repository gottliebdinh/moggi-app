import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../config/supabase';
import { Session, User } from '@supabase/supabase-js';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, firstName: string, lastName: string, birthDate: string) => Promise<{ error: any; userId?: string | null; email?: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  signUp: async () => ({ error: null, userId: null }),
  signIn: async () => ({ error: null }),
  signOut: async () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('AuthContext - Auth state changed:', event);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      
      // Bei SIGNED_OUT: Broadcast, damit Screens reagieren können
      if (event === 'SIGNED_OUT') {
        console.log('AuthContext - User logged out');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, firstName: string, lastName: string, birthDate: string) => {
    try {
      console.log('AuthContext - signUp called with email:', email);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            birth_date: birthDate,
          },
          emailRedirectTo: undefined, // Keine automatische E-Mail von Supabase
        },
      });

      console.log('AuthContext - signUp response:', { data, error });

      if (error) {
        console.log('AuthContext - signUp error:', error.message);
        return { error, userId: null };
      }
      
      // Supabase gibt manchmal keinen Error zurück, aber auch keinen User
      // Das passiert wenn die E-Mail bereits existiert (aus Sicherheitsgründen)
      if (data.user && data.user.identities && data.user.identities.length === 0) {
        console.log('AuthContext - Email already exists (no identities)');
        return { error: { message: 'User already registered' }, userId: null };
      }
      
      // Erfolg - gebe UserID zurück für Verification
      console.log('AuthContext - User created, ID:', data.user?.id);
      console.log('AuthContext - User email:', data.user?.email);
      
      // WICHTIG: Nicht ausloggen! User bleibt in Supabase, aber ohne Session in der App
      // Session wird nur gesetzt wenn user sich nach Verifizierung einloggt
      
      return { error: null, userId: data.user?.id, email: data.user?.email };
    } catch (error) {
      console.log('AuthContext - signUp exception:', error);
      return { error, userId: null };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('AuthContext - signIn called with email:', email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.log('AuthContext - signIn error:', error.message);
        return { error };
      }
      
      // Sofort User und Session setzen
      if (data.session) {
        console.log('AuthContext - Setting user:', data.session.user.email);
        setSession(data.session);
        setUser(data.session.user);
      }
      
      return { error: null };
    } catch (error) {
      console.log('AuthContext - signIn exception:', error);
      return { error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


