import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';

export default async function Home({ params }) {
  const supabase = createServerComponentClient({ cookies });
  const { data: products } = await supabase.from('products').select().ilike('name', `%${params.query}%`);

  return (
    <ul className="my-auto text-foreground">
      {products?.map((product) => (
        <li key={product.id}>
          <Link href={`/catalog/${product.id}`}>
            {product.name} , price: {product['price_info.total_price'] / 100}
          </Link>
        </li>
      ))}
    </ul>
  );
}
