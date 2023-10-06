import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function Home({ params }) {
  const supabase = createServerComponentClient({ cookies });
  const { data: products } = await supabase.from('products').select().eq('id', params.id);
  const product = products?.[0];

  return (
    <p>
      {product.name} , price: {product['price_info.total_price'] / 100}
    </p>
  );
}
