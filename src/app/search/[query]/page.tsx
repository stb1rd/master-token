'use client';
import { SearchPage } from '@/components/SearchPage';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useCallback, useEffect, useState } from 'react';

export default function Home({ params }) {
  const supabase = createClientComponentClient();
  const [products, setProducts] = useState();

  const getProducts = useCallback(async () => {
    try {
      const { data: products } = await supabase
        .from('products')
        .select()
        .ilike('name', `%${decodeURIComponent(params.query)}%`);

      setProducts(products);
    } catch (e) {
      console.log(e);
    }
  }, [supabase]);

  useEffect(() => {
    getProducts();
  }, []);

  return <SearchPage defaultQuery={decodeURIComponent(params.query)} defaultProducts={products} />;
}
