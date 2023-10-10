// @ts-nocheck
import Link from 'next/link';

export const USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const ProductCard = ({ product }) => {
  return (
    <Link href={`/catalog/${product.id}`}>
      <div className="card bg-base-100 shadow-xl flex-row items-start justify-start w-full">
        <div className="flex flex-col items-center">
          <figure className="rounded-xl">
            <img src={product.media_urls?.[0]} className="w-80 h-80 bg-gray-50 object-contain" />
          </figure>
          {!!product.tags?.length && (
            <div className="flex flex-col gap-2 py-4 items-center">
              {product.tags?.map((x) => (
                <div key={x} className="flex flex-row gap-2">
                  {x.map((y) =>
                    !y ? null : (
                      <span key={y} className="badge badge-primary badge-lg">
                        {y}
                      </span>
                    )
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="card-body">
          <h2 className="card-title">{product.name}</h2>
          {Object.entries(product.specs || {}).map(([key, value]) => {
            let valueString = value;
            if (Array.isArray(value)) {
              valueString = value.join('; ');
            }

            return (
              <div key={key} className="flex flex-row justify-start w-fit items-baseline gap-2">
                <p className="text-gray-400 text-sm">{key}</p>
                <p>{valueString}</p>
              </div>
            );
          })}
          <div className="text-xl font-bold flex flex-row w-fit gap-4">
            {!!product.price_details?.total && <p>Price: {USDollar.format(product.price_details.total / 100)}</p>}
            {!!product.price_details?.is_priceless && <p>Priceless</p>}
            {!!product.price_details?.evaluated && <p>({product.price_details.evaluated})</p>}
          </div>
        </div>
      </div>
    </Link>
  );
};
