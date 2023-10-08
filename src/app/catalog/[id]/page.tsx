'use client';
import { ProductPage } from '@/components/ProductPage';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useCallback, useEffect, useState } from 'react';

export default function Home({ params }) {
  const supabase = createClientComponentClient();
  const [product, setProduct] = useState();

  const getProducts = useCallback(async () => {
    try {
      const { data: products } = await supabase.from('products').select().eq('id', params.id);
      setProduct(products?.[0]);
    } catch (e) {
      console.log(e);
    }
  }, [supabase]);

  useEffect(() => {
    getProducts();
  }, []);

  return <ProductPage product={product} />;
}
