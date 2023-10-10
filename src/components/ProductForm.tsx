// @ts-nocheck
'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
import { HistoryForm } from './HistoryForm';
import { nanoid } from 'nanoid';

const mapObjToString = (obj) => (!obj ? '' : JSON.stringify(obj));

export const ProductForm = ({ product, onSuccess }) => {
  const [productId, setProductId] = useState('');
  const [name, setName] = useState('');
  const [specs, setSpecs] = useState('');
  const [priceDetails, setPriceDetails] = useState('');
  const [tags, setTags] = useState('');
  const [history, setHistory] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');

  const supabase = createClientComponentClient();
  const [formMessage, setFormMessage] = useState();

  useEffect(() => {
    if (!product) {
      clearValues();
    }
    if (!!product) {
      setProductId(product.id);
      setName(product.name);
      setSpecs(mapObjToString(product.specs));
      setPriceDetails(mapObjToString(product.price_details));
      setTags(mapObjToString(product.tags));
      setHistory(mapObjToString(product.history?.map((x) => ({ ...x, id: nanoid() }))));
      setMediaUrl(product.media_urls?.[0]);
    }
  }, [product]);

  const clearValues = () => {
    setProductId('');
    setName('');
    setSpecs('');
    setPriceDetails('');
    setTags('');
    setHistory('');
    setMediaUrl('');
  };

  const handleSubmit = async () => {
    if (!name) {
      setFormMessage({ type: 'error', message: 'name is required' });
      return;
    }
    try {
      setFormMessage(null);
      const productBody = {
        name: name,
        specs: !specs ? null : JSON.parse(specs),
        price_details: !priceDetails ? null : JSON.parse(priceDetails),
        tags: !tags ? null : JSON.parse(tags),
        history: !history ? null : JSON.parse(history),
        media_urls: !mediaUrl ? null : [JSON.parse(mediaUrl)],
      };
      if (!productId) {
        const { error } = await supabase.from('products').insert(productBody);
        if (error) {
          setFormMessage({ type: 'error', message: error.message });
        } else {
          clearValues();
          onSuccess();
        }
      }
      if (!!productId) {
        const { error } = await supabase.from('products').update(productBody).eq('id', productId);
        if (error) {
          setFormMessage({ type: 'error', message: error.message });
        } else {
          clearValues();
          onSuccess();
        }
      }
    } catch (e) {
      console.log('e', e);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input type="text" className="input input-bordered w-full" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Specs</span>
        </label>
        <textarea className="input input-bordered w-full" value={specs} onChange={(e) => setSpecs(e.target.value)} />
      </div>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Price details</span>
        </label>
        <textarea className="input input-bordered w-full" value={priceDetails} onChange={(e) => setPriceDetails(e.target.value)} />
      </div>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Tags</span>
        </label>
        <input type="text" className="input input-bordered w-full" value={tags} onChange={(e) => setTags(e.target.value)} />
      </div>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Media urls</span>
        </label>
        <textarea className="input input-bordered w-full" value={mediaUrl} onChange={(e) => setMediaUrl(e.target.value)} />
      </div>

      <HistoryForm history={history} setHistory={setHistory} />

      {!!formMessage && (
        <>
          {formMessage.type === 'error' && (
            <div className="text-red-600">
              <p>{formMessage.message}</p>
            </div>
          )}
          {formMessage.type === 'success' && (
            <div className="text-green-600">
              <p>{formMessage.message}</p>
            </div>
          )}
        </>
      )}

      <div className="flex justify-between">
        <button className="btn" onClick={() => clearValues()}>
          Clear
        </button>
        <button className="btn btn-primary btn-wide" onClick={() => handleSubmit()}>
          {!productId ? 'Add new' : 'Update'}
        </button>
      </div>
    </div>
  );
};
