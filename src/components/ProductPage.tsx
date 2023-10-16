'use client';
// @ts-nocheck
import parse from 'html-react-parser';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Link from 'next/link';
import { USDollar } from './ProductCard';
import { useState } from 'react';

const parseDate = (targetValue) => new Date(targetValue.replaceAll('-', '.').split('.').reverse().join('-'));

export const ProductPage = ({ product }) => {
  const isHistorySortable = product?.history?.every((x) => !isNaN(parseDate(x.date).getTime()));
  const [sort, setSort] = useState('asc');

  const sortHelper = (a, b) => {
    if (!isHistorySortable) {
      return 0;
    }
    if (sort === 'asc') {
      return parseDate(a.date).getTime() < parseDate(b.date).getTime() ? -1 : 1;
    }
    if (sort === 'desc') {
      return parseDate(b.date).getTime() < parseDate(a.date).getTime() ? -1 : 1;
    }
  };

  if (!product) {
    return null;
  }

  return (
    <>
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/search">Search</Link>
          </li>
        </ul>
      </div>
      <div className="prose w-full max-w-none">
        <h1 className="mb-0">{product.name}</h1>
        <div className="flex flex-row gap-8">
          <div className="flex flex-col items-start w-1/2 ">
            <figure className="rounded-xl w-full">
              <img src={product.media_urls?.[0]} className="w-full h-80 bg-gray-50 object-contain" />
            </figure>
          </div>
          <div className="mt-6 flex flex-col gap-3 w-1/2 ">
            {Object.entries(product.specs || {}).map(([key, value]) => {
              let valueString = value;
              if (Array.isArray(value)) {
                valueString = value.join('; ');
              }

              return (
                <div key={key} className="flex flex-row justify-start w-fit items-baseline gap-1">
                  <p className="text-gray-400 text-sm my-0">{key}</p>
                  <p className="my-0">{valueString}</p>
                </div>
              );
            })}
            <div className="text-xl font-bold flex flex-row w-fit gap-1 flex-wrap">
              {!!product.price_details?.total && <p className="my-0">Price: {USDollar.format(product.price_details.total / 100)}</p>}
              {!!product.price_details?.is_priceless && <p className="my-0">Priceless</p>}
              {!!product.price_details?.evaluated && <p className="my-0">({product.price_details.evaluated})</p>}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            {!!product.tags?.length && (
              <div className="flex flex-col gap-2 items-center">
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
          {!!isHistorySortable && (
            <div className="flex justify-end items-center gap-4">
              <span className="text-gray-400 text-sm">sort by</span>
              <select className="select" onChange={(e) => setSort(e.target.value)}>
                <option value="asc">newest first</option>
                <option value="desc">latest first</option>
              </select>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-8 mt-8">
          {product.history?.sort(sortHelper).map(({ date, type, verified_by, content }) => (
            <div key={date} className="flex gap-4">
              <p className="w-2/12 my-0 text-gray-400">{date}</p>
              <div className="w-7/12 ">
                <p className="my-0">{parse(content)}</p>
                {!!verified_by && (
                  <span className="flex flex-row items-center gap-2">
                    <CheckCircleIcon className="text-green-600" />
                    <p className="my-0">Verified by {verified_by}</p>
                  </span>
                )}
              </div>
              <p className="w-3/12 my-0 text-gray-400">{type}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
