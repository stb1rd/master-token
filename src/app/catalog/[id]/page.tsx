import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import parse from 'html-react-parser';

export default async function Home({ params }) {
  const supabase = createServerComponentClient({ cookies });
  const { data: products } = await supabase.from('products').select().eq('id', params.id);
  const product = products?.[0];

  return (
    <>
      <h1>{product.name}</h1>
      <div className="flex items-start">
        <div>
          <img width={200} heigh={200} src={product.media_urls?.find((x, i) => i === 0)} />
          <div className="flex gap-2">
            {product.tags?.flat().map((x) => (
              <p key={x}>{x}</p>
            ))}
          </div>
        </div>
        <div>
          {Object.entries(product.specs || {}).map(([key, value]) => {
            let valueString = value;
            if (Array.isArray(value)) {
              valueString = value.join(', ');
            }

            return (
              <div key={key}>
                <p>
                  {key}: {valueString}
                </p>
              </div>
            );
          })}
          {!!product.price_details?.total && <p>Price: ${product.price_details.total / 100}</p>}
          {!!product.price_details?.is_priceless && <p>Priceless</p>}
          {!!product.price_details?.evaluated && <p>({product.price_details.evaluated})</p>}
          <button className="border-2 border-blue-500 px-12 py-4">BUY NOW</button>
        </div>
      </div>
      {product.history?.map(({ date, type, verified_by, content }) => (
        <div key={date} className="flex gap-4">
          <p>{date}</p>
          <div>
            <p>{parse(content)}</p>
            {!!verified_by && <p>Verified by {verified_by}</p>}
          </div>
          <p>{type}</p>
        </div>
      ))}
    </>
  );
}
