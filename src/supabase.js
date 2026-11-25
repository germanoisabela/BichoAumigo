import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  'https://zfrhyafzmknbjpnqukcm.supabase.co';
const supabasePublishableKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_gkU1vxMtKcK3biPEnpIM2g_yHV7K9Fd';

export const supabase = createClient(supabaseUrl, supabasePublishableKey);